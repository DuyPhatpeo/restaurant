import { useState } from "react";
import { createContact } from "@api/contactApi";
import { toast } from "react-toastify";

export const useContactForm = (
  initialState = { name: "", email: "", subject: "", message: "" }
) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ========= REGEX CONSTANTS =========
  const namePattern = /^[\p{L}\s'-]+$/u;
  const emailPattern = /\S+@\S+\.\S+/;

  // ========= VALIDATION =========
  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!namePattern.test(formData.name)) {
      newErrors.name =
        "Name can only contain letters and spaces (no special characters).";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    return newErrors;
  };

  // ========= HANDLE INPUT =========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ========= HANDLE SUBMIT =========
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    // Chuẩn hóa dữ liệu trước khi gửi
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    setSubmitting(true);
    try {
      await createContact(payload);
      toast.success("Message sent successfully!");
      setFormData(initialState);
      setErrors({});
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
};
