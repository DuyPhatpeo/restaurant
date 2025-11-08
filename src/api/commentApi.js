import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/**
 * 🔹 Lấy danh sách comment theo blogId (mới nhất lên đầu)
 * @param {string} blogId
 */
export const getCommentsByBlogId = async (blogId) => {
  if (!blogId) throw new Error("Blog ID is required");

  try {
    // Query comments theo blogId và order theo datetime giảm dần
    const q = query(
      collection(db, "comments"),
      where("blogId", "==", blogId),
      orderBy("datetime", "desc")
    );

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`💬 Comments for blogId=${blogId}:`, comments);
    return comments;
  } catch (error) {
    console.error(`❌ Lỗi khi lấy comment của blogId=${blogId}:`, error);
    throw error;
  }
};

/**
 * 🔹 Thêm comment mới cho blog
 * @param {Object} commentData { blogId, name, content, datetime? }
 */
export const postComment = async (commentData) => {
  const { blogId, name, content } = commentData;
  if (!blogId || !name || !content) {
    throw new Error("blogId, name và content là bắt buộc");
  }

  try {
    // Nếu không có datetime, set thời gian hiện tại
    const newComment = {
      ...commentData,
      datetime: commentData.datetime || new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "comments"), newComment);
    console.log("📝 Comment added:", { id: docRef.id, ...newComment });

    return { id: docRef.id, ...newComment };
  } catch (error) {
    console.error("❌ Lỗi khi đăng comment:", error);
    throw error;
  }
};
