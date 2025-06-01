// src/utils/storage.js
const STORAGE_KEY = "rooms";

export function getAllRooms() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("❌ JSON 파싱 오류:", e);
    return [];
  }
}

export function saveRoom(newRoom) {
  const rooms = getAllRooms();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...rooms, newRoom]));
}

export function updateRoom(updatedRoom) {
  const rooms = getAllRooms();
  const newRooms = rooms.map(room => (room.id === updatedRoom.id ? updatedRoom : room));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newRooms));
}

export function getRoomById(id) {
  const rooms = getAllRooms();
  return rooms.find(room => room.id === id);
}

export function deleteRoomById(id) {
  const rooms = getAllRooms().filter(room => room.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
}