import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";

export default function ReservationForm() {
  return (
    <section className="reservation-section">
      <div className="reservation-wrapper">
        <div className="reservation-header">
          <SectionHeader subtitle="Book a Table" title="Make a Reservation" />
        </div>

        <form className="reservation-form">
          <FormField
            label="Full Name"
            name="fullName"
            placeholder="Your name"
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
          />
          <FormField
            label="Number of Guests"
            type="select"
            name="guests"
            options={[
              { value: "1", label: "1 Person" },
              { value: "2", label: "2 People" },
              { value: "3", label: "3 People" },
              { value: "4", label: "4 People" },
            ]}
          />
          <FormField label="Reservation Date" type="date" name="date" />
          <FormField label="Reservation Time" type="time" name="time" />

          <div className="reservation-action">
            <Button hover type="submit" className="reservation-button">
              Make a Reservation
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
