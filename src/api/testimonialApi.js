// api/personApi.js
import api from "@lib/axios";

// Lấy tất cả testimonial (ở đây mình gọi là persons hoặc customers)
export const getTestimonials = async () => {
  try {
    const res = await api.get("/testimonials");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy testimonials:", error);
    return [];
  }
};
