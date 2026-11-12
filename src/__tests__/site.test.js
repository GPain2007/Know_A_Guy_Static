import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "../App";
import { Header } from "../components/Header/Header";
import { Services } from "../components/Service/Services";
import { Splash } from "../components/Splash/Splash";
import { SERVICES } from "../components/Service/serviceData";
import { CAROUSEL_RIGHT } from "../components/Service/carouselData";

describe("App", () => {
  test("renders the header, services and estimate form", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /I KNOW A GUY/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What We Do" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get a Free Estimate" })
    ).toBeInTheDocument();
  });
});

describe("Header", () => {
  test("has tap-to-call, email and estimate links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "(737) 259-5124" })).toHaveAttribute(
      "href",
      "tel:7372595124"
    );
    expect(
      screen.getByRole("link", { name: "oiknowaguy@gmail.com" })
    ).toHaveAttribute("href", "mailto:oiknowaguy@gmail.com");
    expect(
      screen.getByRole("link", { name: "Get a Free Estimate" })
    ).toHaveAttribute("href", "#contact");
    expect(screen.getByAltText("Oh I Know A Guy logo")).toBeInTheDocument();
  });
});

describe("Services", () => {
  test("shows a card for every service", () => {
    render(<Services />);
    for (const service of SERVICES) {
      expect(
        screen.getByRole("heading", { name: service.title })
      ).toBeInTheDocument();
    }
  });

  test("shows every customer review", () => {
    render(<Services />);
    for (const review of CAROUSEL_RIGHT) {
      expect(
        screen.getAllByText(review.name.trim(), { exact: false }).length
      ).toBeGreaterThan(0);
    }
  });
});

describe("Splash intro", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("Skip closes the intro", () => {
    render(<Splash />);
    expect(screen.getByRole("dialog", { name: "Intro" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Skip" }));
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(screen.queryByRole("dialog", { name: "Intro" })).not.toBeInTheDocument();
  });

  test("closes on its own if the video never finishes", () => {
    render(<Splash />);
    act(() => {
      jest.advanceTimersByTime(6000 + 600);
    });
    expect(screen.queryByRole("dialog", { name: "Intro" })).not.toBeInTheDocument();
  });

  test("restores page scrolling after closing", () => {
    render(<Splash />);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Skip" }));
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
