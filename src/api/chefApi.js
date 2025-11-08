// src/api/chefApi.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * Lấy danh sách chefs từ Firestore
 */
export const getChefs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "chefs"));

    const chefs = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // 🔍 Log ra để kiểm tra dữ liệu raw từ Firestore
      console.log("🔥 Chef raw data:", data);

      return {
        id: data.id || doc.id, // dùng id trong doc hoặc Firestore ID
        name: data.name || "",
        image: data.image || "",
        role: data.role || "",
        social: data.social || {},
      };
    });

    console.log("✅ Chefs loaded:", chefs);
    return chefs;
  } catch (error) {
    console.error("❌ Error fetching chefs:", error);
    throw error;
  }
};
