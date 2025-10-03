import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";

export default function Reservation() {
  const { formData, loading, handleChange, handleSubmit } =
    useReservationForm();

  return (
    <section className="reservation">
      {/* Map */}
      <div id="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

      {/* Form */}
      <div className="reservation-form">
        <div className="section-header">
          <SectionHeader subtitle="Book a table" title="Make Reservation" />
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Name"
            name="fullName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormField
            label="Person"
            type="select"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            options={[
              { value: "1", label: "1 Person" },
              { value: "2", label: "2 Persons" },
              { value: "3", label: "3 Persons" },
              { value: "4", label: "4 Persons" },
            ]}
          />
          <FormField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <FormField
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <Button hover type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Make a Reservation"}
          </Button>
        </form>
      </div>
    </section>
  );
}
