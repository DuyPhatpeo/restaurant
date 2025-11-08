import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/** Helper map docs to data */
const mapDocs = (docs) => docs.map((doc) => ({ id: doc.id, ...doc.data() }));

/** Lấy tất cả categories */
export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return mapDocs(snapshot.docs);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw error;
  }
};
