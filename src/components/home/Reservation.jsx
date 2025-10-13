// src/components/section/ReservationForm.jsx
import React, { useEffect } from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";
import { BOOKING_STATUS } from "@lib/utils/bookingRules";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const bookingAllowed = isBookingAllowedNow();
  const isFull = BOOKING_STATUS === "full";

  // ✅ Khởi tạo hiệu ứng AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="reservation-section" data-aos="fade-up">
      <div className="reservation-wrapper">
        <div
          className="reservation-header"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <SectionHeader subtitle="Book a Table" title="Make a Reservation" />
        </div>

        <form
          className="reservation-form"
          onSubmit={handleSubmit}
          noValidate
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {fields.map((field, index) => (
            <div
              key={field.name}
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <FormField
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
            </div>
          ))}

          <div
            className="reservation-action"
            data-aos="fade-up"
            data-aos-delay="900"
          >
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
