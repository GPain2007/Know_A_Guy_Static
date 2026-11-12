import { render, screen, fireEvent } from "@testing-library/react";
import emailjs from "emailjs-com";
import { Form } from "../components/Form/Form";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualsToOtherValue,
} from "../components/Form/validation";

jest.mock("emailjs-com", () => ({
  __esModule: true,
  default: { send: jest.fn() },
}));

const fill = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const fillValidForm = () => {
  fill("Full Name", "Jane Smith");
  fill("Email Address", "jane@example.com");
  fill("Telephone Number", "(512) 555-0100");
  fill("Project Details", "Weekly mowing and edging for a front yard.");
};

describe("validation helpers", () => {
  test("isEmail", () => {
    expect(isEmail("jane@example.com")).toBe(true);
    expect(isEmail("jane.example.com")).toBe(false);
  });

  test("isNotEmpty", () => {
    expect(isNotEmpty("hi")).toBe(true);
    expect(isNotEmpty("   ")).toBe(false);
  });

  test("hasMinLength", () => {
    expect(hasMinLength("1234567", 7)).toBe(true);
    expect(hasMinLength("123", 7)).toBe(false);
  });

  test("isEqualsToOtherValue", () => {
    expect(isEqualsToOtherValue("a", "a")).toBe(true);
    expect(isEqualsToOtherValue("a", "b")).toBe(false);
  });
});

describe("Estimate form", () => {
  beforeEach(() => {
    emailjs.send.mockReset();
    emailjs.send.mockResolvedValue({ status: 200, text: "OK" });
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test("Send is disabled until the required fields are filled", () => {
    render(<Form />);
    const send = screen.getByRole("button", { name: "Send Message" });
    expect(send).toBeDisabled();
    fillValidForm();
    expect(send).toBeEnabled();
  });

  test("shows an error for an invalid email after leaving the field", () => {
    render(<Form />);
    fill("Email Address", "not-an-email");
    fireEvent.blur(screen.getByLabelText("Email Address"));
    expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
  });

  test("shows an error for a too-short message after leaving the field", () => {
    render(<Form />);
    fill("Project Details", "short");
    fireEvent.blur(screen.getByLabelText("Project Details"));
    expect(
      screen.getByText(/at least 10 characters/i)
    ).toBeInTheDocument();
  });

  test("only shows the frequency picker for long-term service", () => {
    render(<Form />);
    expect(screen.queryByLabelText("Frequency")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Long-Term"));
    expect(screen.getByLabelText("Frequency")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("One-Time Service"));
    expect(screen.queryByLabelText("Frequency")).not.toBeInTheDocument();
  });

  test("sends the request through EmailJS and confirms it", async () => {
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByLabelText("Long-Term"));
    fireEvent.change(screen.getByLabelText("Frequency"), {
      target: { value: "bi-weekly" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    const [serviceId, templateId, params, publicKey] =
      emailjs.send.mock.calls[0];
    expect(serviceId).toEqual(expect.any(String));
    expect(templateId).toEqual(expect.any(String));
    expect(publicKey).toEqual(expect.any(String));
    expect(params).toEqual(
      expect.objectContaining({
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "(512) 555-0100",
        message: "Weekly mowing and edging for a front yard.",
        serviceType: "Longterm",
        Frequency: "bi-weekly",
        time: expect.any(String),
      })
    );

    expect(await screen.findByText(/Message sent!/)).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveValue("");
  });
});
