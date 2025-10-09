import { useState } from "react";
import { toast } from "react-toastify";
import { createReservation } from "@api/reservationApi";
import { isBookingAllowedNow, isValidTime } from "@lib/utils/bookingRules";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // ---- Basic checks ----
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";

    // ---- Advanced checks ----
    if (formData.date) {
      const today = new Date();
      const selectedDate = new Date(formData.date);

      // Không cho chọn ngày trong quá khứ
      if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
        newErrors.date = "You cannot select a past date.";
      }
    }

    // Kiểm tra thời gian hợp lệ và đặt trước 30 phút
    if (formData.date && formData.time) {
      const bookingDateTime = new Date(`${formData.date}T${formData.time}`);
      const now = new Date();

      // Check thời gian hợp lệ trong ngày (ví dụ trong giờ mở cửa)
      if (!isValidTime(formData.time, formData.date)) {
        newErrors.time = "Invalid booking time for this date.";
      }

      // Kiểm tra phải đặt trước ít nhất 30 phút
      const diffMinutes = (bookingDateTime - now) / (1000 * 60);
      if (diffMinutes < 30) {
        newErrors.time = "Please book at least 30 minutes in advance.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isBookingAllowedNow()) {
      toast.error("Booking not allowed at this time or day.");
      return;
    }

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
    isBookingAllowedNow,
  };
}
