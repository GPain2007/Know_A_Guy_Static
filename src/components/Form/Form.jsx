import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Input from "./Input";
import { useInput } from "./userInput";
import { isEmail, isNotEmpty, hasMinLength } from "./validation";
import "./Form.css";

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export const Form = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const name = useInput("", (v) => isNotEmpty(v));
  const email = useInput("", (v) => isEmail(v) && isNotEmpty(v));
  const phone = useInput("", (v) => hasMinLength(v.replace(/\D/g, ""), 7));
  const message = useInput("", (v) => hasMinLength(v, 10));

  const isFormValid =
    !name.hasError &&
    !email.hasError &&
    !phone.hasError &&
    !message.hasError &&
    isNotEmpty(name.value) &&
    isNotEmpty(email.value) &&
    isNotEmpty(message.value);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      name.handleValuesChange({ target: { value: "" } });
      email.handleValuesChange({ target: { value: "" } });
      phone.handleValuesChange({ target: { value: "" } });
      message.handleValuesChange({ target: { value: "" } });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="form-section" id="contact">
      <div className="form-container">
        <h2 className="form-heading">Get a Free Estimate</h2>
        <p className="form-subheading">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
          <Input
            label="Full Name"
            id="name"
            name="user_name"
            type="text"
            placeholder="Jane Smith"
            value={name.value}
            onChange={name.handleValuesChange}
            onBlur={name.handleInputBlur}
            error={name.hasError ? "Please enter your name." : ""}
          />

          <Input
            label="Email Address"
            id="email"
            name="user_email"
            type="email"
            placeholder="jane@example.com"
            value={email.value}
            onChange={email.handleValuesChange}
            onBlur={email.handleInputBlur}
            error={email.hasError ? "Please enter a valid email." : ""}
          />

          <Input
            label="Telephone Number"
            id="phone"
            name="user_phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={phone.value}
            onChange={phone.handleValuesChange}
            onBlur={phone.handleInputBlur}
            error={phone.hasError ? "Please enter a valid phone number." : ""}
          />

          <div className="control no-margin">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your project..."
              value={message.value}
              onChange={message.handleValuesChange}
              onBlur={message.handleInputBlur}
            />
            <div className="control-error">
              {message.hasError && (
                <p>Please enter a message (at least 10 characters).</p>
              )}
            </div>
          </div>

          {status === "sent" && (
            <p className="form-success">
              Message sent! We'll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="form-error-msg">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <button
            type="submit"
            className="form-submit"
            disabled={!isFormValid || status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};
