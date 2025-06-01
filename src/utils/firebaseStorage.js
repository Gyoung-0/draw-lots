// src/utils/firebaseStorage.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export async function createRoom(title) {
  const newRoom = {
    title,
    participants: [],
    ended: false
  };
  const docRef = await addDoc(collection(db, "rooms"), newRoom);
  return docRef.id;
}


export async function deleteRoomById(id) {
  await deleteDoc(doc(db, "rooms", id));
}

export async function getAllRooms() {
  const snapshot = await getDocs(collection(db, "rooms"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getRoomById(id) {
  const docSnap = await getDoc(doc(db, "rooms", id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

export async function updateRoom(id, data) {
  await updateDoc(doc(db, "rooms", id), data);
}