// src/api/commentApi.js
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Lấy danh sách comment theo blogId (mới nhất lên đầu)
 * @param {string} blogId
 */
export const getCommentsByBlogId = async (blogId) => {
  if (!blogId) return [];

  try {
    // Chuyển blogId thành string để consistent
    const blogIdStr = blogId.toString();

    // Query theo blogId, order datetime giảm dần
    const q = query(
      collection(db, "comments"),
      where("blogId", "==", blogIdStr),
      orderBy("datetime", "desc") // ⚠ Cần composite index Firestore
    );

    const snap = await getDocs(q);

    const comments = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // convert Firestore Timestamp -> Date
        datetime:
          data.datetime?.toDate?.() || new Date(data.datetime || Date.now()),
      };
    });

    console.log(`💬 Comments for blogId=${blogIdStr}:`, comments);
    return comments;
  } catch (err) {
    console.error(`❌ Lỗi khi lấy comment blogId=${blogId}:`, err);
    return [];
  }
};

/**
 * 🔹 Thêm comment mới cho blog
 * @param {Object} commentData { blogId, name, content, email? }
 */
export const postComment = async (commentData) => {
  const { blogId, name, content, email } = commentData;

  if (!blogId || !name || !content)
    throw new Error("blogId, name và content là bắt buộc");

  try {
    const blogIdStr = blogId.toString();
    const newComment = {
      blogId: blogIdStr,
      name,
      content,
      email: email || "",
      datetime: serverTimestamp(), // timestamp chuẩn để orderBy
    };

    const docRef = await addDoc(collection(db, "comments"), newComment);

    console.log("📝 Comment added:", { id: docRef.id, ...newComment });

    // Trả về comment với datetime hiện tại (Date) để render ngay
    return {
      id: docRef.id,
      ...newComment,
      datetime: new Date(),
    };
  } catch (err) {
    console.error("❌ Lỗi khi đăng comment:", err);
    throw err;
  }
};
