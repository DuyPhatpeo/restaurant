import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";
import { BOOKING_STATUS } from "@lib/utils/bookingRules";

export default function ReservationForm() {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    isBookingAllowedNow,
  } = useReservationForm();

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

  // Kiểm tra giờ & ngày có cho phép đặt bàn không
  const bookingAllowed = isBookingAllowedNow();
  const isFull = BOOKING_STATUS === "full";

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
              required={field.name !== "guests"}
              error={errors[field.name]}
              disabled={isFull || !bookingAllowed}
            />
          ))}

          <div className="reservation-action">
            <Button
              hover
              type="submit"
              disabled={loading || !bookingAllowed || isFull}
            >
              {loading
                ? "Processing..."
                : isFull
                ? "Fully Booked"
                : "Make a Reservation"}
            </Button>

            {!bookingAllowed && !isFull && (
              <p className="form-reservation-error-text">
                Booking is unavailable from <b>8:00 AM – 9:00 PM</b> and on
                weekends. Please try again during business hours.
              </p>
            )}

            {isFull && (
              <p className="form-reservation-error-text">
                Sorry, the restaurant is fully booked. Please try another day.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
