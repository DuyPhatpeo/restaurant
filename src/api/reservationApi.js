import api from "@lib/axios";

export const createReservation = async (reservation) => {
  // Tách riêng date từ datetime
  const dateOnly = reservation.datetime.split("T")[0]; // "2025-10-03"

  const payload = {
    ...reservation,
    date: dateOnly, // thêm date riêng
  };

  const res = await api.post("/reservations", payload);
  return res.data;
};
