// src/api/blogApi.js
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔥 Lấy danh sách tất cả blogs
 */
export const getBlogs = async () => {
  try {
    const snap = await getDocs(collection(db, "blogs"));

    const blogs = snap.docs.map((d) => ({
      docId: d.id, // lưu luôn ID thật để sau xài nếu cần
      ...d.data(),
    }));

    // Sort theo date nếu có
    const sorted = blogs.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date) - new Date(a.date);
    });

    return sorted;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách blogs:", error);
    return [];
  }
};

/**
 * 🔍 Lấy blog theo ID FIELD (ví dụ: id = "12")
 */
export const getBlogById = async (id) => {
  if (!id) return null;

  try {
    // 🔥 Query theo field id
    const q = query(collection(db, "blogs"), where("id", "==", id));
    const snap = await getDocs(q);

    if (snap.empty) {
      console.warn(`⚠️ Không tìm thấy blog với id="${id}"`);
      return null;
    }

    // Lấy document đầu tiên
    const docSnap = snap.docs[0];
    const blog = {
      docId: docSnap.id, // id thật của Firestore
      ...docSnap.data(),
    };

    console.log("🧾 Loaded blog:", blog.id);
    return blog;
  } catch (error) {
    console.error("❌ Lỗi khi lấy chi tiết blog:", error);
    return null;
  }
};
