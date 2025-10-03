import api from "@lib/axios";

export const createContact = async (contact) => {
  // Nếu muốn, có thể tách ngày gửi hoặc timestamp riêng
  const payload = {
    ...contact,
    createdAt: new Date().toISOString(),
  };

  const res = await api.post("/contacts", payload);
  return res.data;
};
