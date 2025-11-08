import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Lấy toàn bộ thư viện (ảnh + video)
 */
export const getLibrary = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "library"));
    const library = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📂 Library loaded:", library);
    return library;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách thư viện:", error);
    throw error;
  }
};

/**
 * 🔹 Lấy một mục trong thư viện theo ID
 * @param {string} id
 */
export const getLibraryById = async (id) => {
  if (!id) throw new Error("❌ Library ID is required");

  try {
    const docRef = doc(db, "library", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`❌ Media với id=${id} không tồn tại`);
    }

    const media = { id: docSnap.id, ...docSnap.data() };
    console.log("🖼️ Media loaded:", media);
    return media;
  } catch (error) {
    console.error(`❌ Lỗi khi lấy chi tiết media (id=${id}):`, error);
    throw error;
  }
};
