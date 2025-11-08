import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@lib/firebaseConfig";

/** Helper map docs to data */
const mapDocs = (docs) => docs.map((doc) => ({ id: doc.id, ...doc.data() }));

/** Lấy tất cả foods */
export const getFoods = async () => {
  try {
    const snapshot = await getDocs(collection(db, "foods"));
    return mapDocs(snapshot.docs);
  } catch (error) {
    console.error("❌ Error fetching foods:", error);
    throw error;
  }
};

/** Lấy foods theo categoryId */
export const getFoodsByCategory = async (
  categoryId,
  sortBy = null,
  direction = "asc"
) => {
  try {
    let q = query(
      collection(db, "foods"),
      where("categoryId", "==", categoryId) // categoryId kiểu string
    );
    if (sortBy) q = query(q, orderBy(sortBy, direction));

    const snapshot = await getDocs(q);
    return mapDocs(snapshot.docs);
  } catch (error) {
    console.error("❌ Error fetching foods by category:", error);
    throw error;
  }
};

/** Lấy 1 food theo id */
export const getFoodById = async (id) => {
  if (!id) throw new Error("Food ID is required");

  try {
    const docRef = doc(db, "foods", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Food not found");

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error("❌ Error fetching food by id:", error);
    throw error;
  }
};
