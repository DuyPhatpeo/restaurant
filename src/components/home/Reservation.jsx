import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";

export default function ReservationForm() {
  const { formData, loading, handleChange, handleSubmit } =
    useReservationForm();

  return (
    <section className="reservation-section">
      <div className="reservation-wrapper">
        <div className="reservation-header">
          <SectionHeader subtitle="Book a Table" title="Make a Reservation" />
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormField
            label="Number of Guests"
            type="select"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            options={[
              { value: "1", label: "1 Person" },
              { value: "2", label: "2 People" },
              { value: "3", label: "3 People" },
              { value: "4", label: "4 People" },
            ]}
          />
          <FormField
            label="Reservation Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <FormField
            label="Reservation Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <div className="reservation-action" style={{ textAlign: "center" }}>
            <Button hover type="submit" disabled={loading}>
              {loading ? "Processing..." : "Make a Reservation"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
