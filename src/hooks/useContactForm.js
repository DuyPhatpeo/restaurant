import { useState } from "react";
import { createContact } from "@api/contactApi";
import { toast } from "react-toastify";

export const useContactForm = (
  initialState = { name: "", email: "", subject: "", message: "" }
) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createContact(formData);
      setFormData(initialState);
      toast.success("Message sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleChange, handleSubmit };
};
