import { useState } from "react";
import { toast } from "react-toastify";
import { createReservation } from "@api/reservationApi";

export default function useReservationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Combine date + time
      const dateTimeString = `${formData.date}T${formData.time}`;
      const payload = {
        ...formData,
        datetime: new Date(dateTimeString).toISOString(),
      };

      await createReservation(payload);
      toast.success("Reservation created successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        guests: "1",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
}
