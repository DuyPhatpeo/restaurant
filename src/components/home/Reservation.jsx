import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";

export default function ReservationForm() {
  const { formData, errors, loading, handleChange, handleSubmit } =
    useReservationForm();

  // Các field config
  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "Enter phone number",
    },
    {
      label: "Number of Guests",
      name: "guests",
      type: "select",
      options: [
        { value: "1", label: "1 Person" },
        { value: "2", label: "2 People" },
        { value: "3", label: "3 People" },
        { value: "4", label: "4 People" },
      ],
    },
    { label: "Reservation Date", name: "date", type: "date" },
    { label: "Reservation Time", name: "time", type: "time" },
  ];

  return (
    <section className="reservation-section">
      <div className="reservation-wrapper">
        <div className="reservation-header">
          <SectionHeader subtitle="Book a Table" title="Make a Reservation" />
        </div>

        <form className="reservation-form" onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              options={field.options}
              value={formData[field.name]}
              onChange={handleChange}
              required
              error={errors[field.name]}
            />
          ))}

          <div className="reservation-action">
            <Button hover type="submit" disabled={loading}>
              {loading ? "Processing..." : "Make a Reservation"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
