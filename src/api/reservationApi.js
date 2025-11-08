import { collection, addDoc } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Tạo reservation mới
 * @param {Object} reservation - { name, email, phone, datetime, guests, ... }
 */
export const createReservation = async (reservation) => {
  if (
    !reservation ||
    !reservation.name ||
    !reservation.email ||
    !reservation.datetime
  ) {
    throw new Error("name, email và datetime là bắt buộc");
  }

  try {
    // Tách riêng ngày từ datetime
    const dateOnly = reservation.datetime.split("T")[0]; // "YYYY-MM-DD"

    const payload = {
      ...reservation,
      date: dateOnly,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "reservations"), payload);

    console.log("📅 Reservation created:", { id: docRef.id, ...payload });
    return { id: docRef.id, ...payload };
  } catch (error) {
    console.error("❌ Lỗi khi tạo reservation:", error);
    throw error;
  }
};
