import Button from "@components/ui/Button";
import FormField from "@components/ui/FormField";
import React from "react";

const Contact = () => {
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
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>

          {/* Form liên hệ */}
          <div className="contact-form">
            <h3>Contact Us</h3>
            <form>
              <FormField name="name" placeholder="Your Name" required />
              <FormField
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <FormField name="subject" placeholder="Subject" />
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                className="form-input"
                required
              ></textarea>
              <Button hover type="submit">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info 4 cột bằng chữ */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-grid">
            <div className="info-item">
              <strong>Address:</strong> 198 West 21th Street, Suite 721 New York
              NY 10016
            </div>
            <div className="info-item">
              <strong>Phone:</strong>{" "}
              <span className="highlight">+1235 2355 98</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@yoursite.com">info@yoursite.com</a>
            </div>
            <div className="info-item">
              <strong>Website:</strong>{" "}
              <a href="https://yoursite.com">yoursite.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
