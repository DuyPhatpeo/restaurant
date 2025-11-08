import { collection, addDoc } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Tạo contact mới
 * @param {Object} contact - { name, email, message, ... }
 */
export const createContact = async (contact) => {
  if (!contact || !contact.name || !contact.email || !contact.message) {
    throw new Error("name, email và message là bắt buộc");
  }

  try {
    const payload = {
      ...contact,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "contacts"), payload);

    console.log("📩 Contact created:", { id: docRef.id, ...payload });
    return { id: docRef.id, ...payload };
  } catch (error) {
    console.error("❌ Lỗi khi tạo contact:", error);
    throw error;
  }
};
