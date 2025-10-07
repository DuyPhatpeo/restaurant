import React from "react";
import Button from "@components/ui/Button";
import FormField from "@components/ui/FormField";
import { useContactForm } from "@hooks/useContactForm";

// Component hiển thị thông tin liên hệ
const ContactInfo = () => {
  const info = [
    {
      label: "Address",
      value: "198 West 21th Street, Suite 721 New York NY 10016",
    },
    { label: "Phone", value: "+1235 2355 98", highlight: true },
    {
      label: "Email",
      value: "info@yoursite.com",
      link: "mailto:info@yoursite.com",
    },
    { label: "Website", value: "yoursite.com", link: "https://yoursite.com" },
  ];

  return (
    <div className="contact-info">
      <h3>Contact Information</h3>
      <div className="contact-grid">
        {info.map(({ label, value, highlight, link }, idx) => (
          <div key={idx} className="info-item">
            <strong>{label}:</strong>{" "}
            {link ? (
              <a href={link} className={highlight ? "highlight" : ""}>
                {value}
              </a>
            ) : (
              <span className={highlight ? "highlight" : ""}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const { formData, errors, loading, handleChange, handleSubmit } =
    useContactForm();

  // Định nghĩa các field để render map
  const fields = [
    { name: "name", placeholder: "Your Name", required: true },
    { name: "email", type: "email", placeholder: "Your Email", required: true },
    { name: "subject", placeholder: "Subject" },
    {
      name: "message",
      type: "textarea",
      placeholder: "Message",
      rows: 5,
      required: true,
    },
  ];

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-wrapper">
          {/* Google Map */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.719067874344!2d105.8411718750777!3d21.003454980635194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab98a8383d29%3A0xb8f2ad0e2bba54ad!2zTmjDoCBWxINuIFbhu41jIFRo4buLIFbDoCBWxINuIFRoxrDhu6NuZw!5e0!3m2!1svi!2s!4v1696310400000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  error={errors[field.name]}
                />
              ))}

              <Button hover type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <ContactInfo />
      </div>
    </section>
  );
};

export default Contact;
