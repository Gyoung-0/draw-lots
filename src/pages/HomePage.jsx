// src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRoom, getAllRooms } from "../utils/storage";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    const id = Date.now().toString();
    const newRoom = { id, title, participants: [], ended: false }; // 🔥 key 제거
    saveRoom(newRoom);
    navigate(`/room/${id}`);
  };

  const rooms = getAllRooms();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎯 제비뽑기 방 만들기</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>방 만들기</button>

      <h3>📄 기존 방 목록</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`/room/${room.id}`}>{room.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}