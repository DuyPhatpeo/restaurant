import { useState } from "react";
import { toast } from "react-toastify";
import { createReservation } from "@api/reservationApi";

export default function useReservationForm() {
  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Cập nhật form data và xóa lỗi tương ứng
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form và trả về object lỗi
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        datetime: new Date(`${formData.date}T${formData.time}`).toISOString(),
      };

      await createReservation(payload);
      toast.success("Reservation created successfully!");

      // Reset form và xóa lỗi
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      console.error("Reservation Error:", err);
      toast.error("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
}
