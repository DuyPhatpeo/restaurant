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

  // ========= REGEX CONSTANTS =========
  const namePattern = /^[\p{L}\s'-]+$/u;
  const emailPattern = /\S+@\S+\.\S+/;
  const phonePattern = /^(\+?\d{9,11})$/;

  // ========= VALIDATION HELPERS =========
  const validateName = (name) => {
    if (!name.trim()) return "Full name is required.";
    if (!namePattern.test(name))
      return "Full name can only contain letters and spaces (no special characters).";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required.";
    if (!emailPattern.test(email)) return "Invalid email format.";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required.";
    if (!phonePattern.test(phone))
      return "Invalid phone number. Please enter a valid 9–11 digit number.";
    return "";
  };

  const validateDate = (date) => {
    if (!date) return "Date is required.";
    const today = new Date();
    const selected = new Date(date);
    if (selected.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0))
      return "You cannot select a past date.";
    return "";
  };

  const validateTime = (date, time) => {
    if (!time) return "Time is required.";
    if (!isValidTime(time, date)) return "Invalid booking time for this date.";

    const bookingDateTime = new Date(`${date}T${time}`);
    const diffMinutes = (bookingDateTime - new Date()) / (1000 * 60);
    if (diffMinutes < 30) return "Please book at least 30 minutes in advance.";
    return "";
  };

  // ========= MAIN VALIDATION =========
  const validate = () => {
    const newErrors = {};

    const nameError = validateName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;

    if (formData.date && formData.time) {
      const timeError = validateTime(formData.date, formData.time);
      if (timeError) newErrors.time = timeError;
    } else if (!formData.time) {
      newErrors.time = "Time is required.";
    }

    return newErrors;
  };

  // ========= EVENT HANDLERS =========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isBookingAllowedNow()) {
      toast.error("Booking not allowed at this time or day.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
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
