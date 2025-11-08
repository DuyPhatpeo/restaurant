import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Lấy tất cả testimonials (customers)
 */
export const getTestimonials = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    const testimonials = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("💬 Testimonials loaded:", testimonials);
    return testimonials;
  } catch (error) {
    console.error("❌ Lỗi khi lấy testimonials:", error);
    return []; // giữ nguyên logic cũ
  }
};
