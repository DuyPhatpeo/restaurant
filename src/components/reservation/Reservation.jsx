import React from "react";
import FormField from "@components/ui/FormField";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/Button";
import useReservationForm from "@hooks/useReservationForm";

const formFields = [
  { label: "Name", name: "fullName", type: "text", placeholder: "Your name" },
  { label: "Email", name: "email", type: "email", placeholder: "Your email" },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    placeholder: "Enter phone number",
  },
  {
    label: "Person",
    name: "guests",
    type: "select",
    options: [
      { value: "1", label: "1 Person" },
      { value: "2", label: "2 Persons" },
      { value: "3", label: "3 Persons" },
      { value: "4", label: "4 Persons" },
    ],
  },
  { label: "Date", name: "date", type: "date" },
  { label: "Time", name: "time", type: "time" },
];

export default function Reservation() {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    isBookingAllowedNow,
  } = useReservationForm();

  const bookingAllowed = isBookingAllowedNow();

  return (
    <section className="reservation">
      {/* Map */}
      <div id="map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.719067874344!2d105.8411718750777!3d21.003454980635194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab98a8383d29%3A0xb8f2ad0e2bba54ad!2zTmjDoCBWxINuIFbhu41jIFRo4buLIFbDoCBWxINuIFRoxrDhu6NuZw!5e0!3m2!1svi!2s!4v1696310400000!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Form */}
      <div className="reservation-form">
        <SectionHeader subtitle="Book a Table" title="Make Reservation" />

        <form onSubmit={handleSubmit} noValidate>
          {formFields.map(({ name, ...props }) => (
            <FormField
              key={name}
              {...props}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={name !== "guests"}
              error={errors[name]}
            />
          ))}

          <div className="reservation-action">
            <Button hover type="submit" disabled={loading || !bookingAllowed}>
              {loading ? "Processing..." : "Make a Reservation"}
            </Button>

            {!bookingAllowed && (
              <p className="error-text">
                Booking is unavailable from <b>8:00 PM to 9:00 AM</b> and on
                weekends. Please try again during our operating hours.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
