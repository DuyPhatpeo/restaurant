// src/api/blogApi.js
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔥 Lấy danh sách tất cả blogs
 */
export const getBlogs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📰 Blogs loaded:", blogs);
    return blogs;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách blogs:", error);
    throw error;
  }
};

/**
 * 🔍 Lấy chi tiết blog theo ID
 * @param {string} id - ID của bài viết
 */
export const getBlogById = async (id) => {
  if (!id) throw new Error("❌ Blog ID is required");

  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const blog = { id: docSnap.id, ...docSnap.data() };
      console.log("🧾 Blog detail:", blog);
      return blog;
    } else {
      throw new Error(`Không tìm thấy blog với ID: ${id}`);
    }
  } catch (error) {
    console.error(`❌ Lỗi khi lấy chi tiết blog (id=${id}):`, error);
    throw error;
  }
};
