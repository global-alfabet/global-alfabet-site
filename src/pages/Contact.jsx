import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { company } from "../config.js";
import { products } from "../content/products.js";
import { services } from "../content/company.js";
import { submitNetlifyForm } from "../lib/forms.js";
import { usePageTitle } from "../lib/usePageTitle.js";

const interests = [...products.map((p) => p.name), ...services.map((s) => s.title), "Something else"];

function useForm(name) {
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data["bot-field"]) return; // spam trap
    setState("sending");
    try {
      await submitNetlifyForm(name, data);
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }
  return { state, onSubmit };
}

function Result({ state, email }) {
  if (state === "sent")
    return (
      <p className="form-note ok" role="status">
        Thanks. We've received your message and will reply by email.
      </p>
    );
  if (state === "error")
    return (
      <p className="form-note err" role="alert">
        That didn't send. Please email us at <a href={`mailto:${email}`}>{email}</a> instead.
      </p>
    );
  return null;
}

export default function Contact() {
  usePageTitle("Contact", "Book a demo, start a project or get help with a Global Alfabet product.");
  const [params] = useSearchParams();
  const preset = interests.find((i) => i.toLowerCase() === (params.get("interest") || "").toLowerCase()) || "";
  const enquiry = useForm("enquiry");
  const support = useForm("support");

  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <h1>Contact us</h1>
          <p className="lead">Book a demo, start a project, or get help with a product. We reply by email.</p>
        </div>
      </section>

      <section className="section tight-top">
        <div className="container contact">
          <aside className="contact-ways">
            <a className="way" href={`mailto:${company.email}`}>
              <Icon name="mail" size={22} />
              <span>
                <strong>Email</strong>
                {company.email}
              </span>
            </a>
            <a className="way" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
              <Icon name="chat" size={22} />
              <span>
                <strong>WhatsApp</strong>
                {company.phone}
              </span>
            </a>
            <a className="way" href={`tel:${company.phone.replace(/\s/g, "")}`}>
              <Icon name="phone" size={22} />
              <span>
                <strong>Phone</strong>
                {company.phone}
              </span>
            </a>
            <div className="way">
              <Icon name="pin" size={22} />
              <span>
                <strong>Based in</strong>
                {company.location}
              </span>
            </div>
          </aside>

          <div className="forms">
            <form className="form-card" id="enquiry" name="enquiry" onSubmit={enquiry.onSubmit}>
              <h2>Make an enquiry</h2>
              <input type="hidden" name="form-name" value="enquiry" />
              <p className="hidden-field">
                <label>
                  Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <div className="field-row">
                <label>
                  First name
                  <input name="firstName" autoComplete="given-name" required />
                </label>
                <label>
                  Last name
                  <input name="lastName" autoComplete="family-name" />
                </label>
              </div>
              <div className="field-row">
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  Phone or WhatsApp
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>
              <div className="field-row">
                <label>
                  Company
                  <input name="company" autoComplete="organization" />
                </label>
                <label>
                  I'm interested in
                  <select name="interest" defaultValue={preset}>
                    <option value="">Choose one</option>
                    {interests.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Subject
                <input name="subject" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button className="btn" type="submit" disabled={enquiry.state === "sending"}>
                {enquiry.state === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              <Result state={enquiry.state} email={company.email} />
            </form>

            <form className="form-card" id="support" name="support" onSubmit={support.onSubmit}>
              <h2>Product support</h2>
              <p className="muted">Already using one of our products? Tell us what's wrong and we'll help.</p>
              <input type="hidden" name="form-name" value="support" />
              <p className="hidden-field">
                <label>
                  Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <div className="field-row">
                <label>
                  Name
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required />
                </label>
              </div>
              <label>
                Product
                <select name="product" defaultValue="">
                  <option value="">Choose one</option>
                  {products.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </label>
              <label>
                What's happening?
                <textarea name="message" rows={4} required />
              </label>
              <button className="btn btn-secondary" type="submit" disabled={support.state === "sending"}>
                {support.state === "sending" ? "Sending…" : "Get help"}
              </button>
              <Result state={support.state} email={company.supportEmail} />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
