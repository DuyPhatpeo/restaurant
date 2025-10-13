import api from "@lib/axios";

/**
 * Lấy toàn bộ thư viện (ảnh + video)
 */
export const getLibrary = async () => {
  try {
    const res = await api.get("/library");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thư viện:", error);
    throw error;
  }
};

/**
 * Lấy một mục trong thư viện theo ID
 * @param {string|number} id - ID của media
 */
export const getLibraryById = async (id) => {
  if (!id) {
    throw new Error("❌ Library ID is required");
  }

  try {
    const res = await api.get(`/library/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết media (id=${id}):`, error);
    throw error;
  }
};
