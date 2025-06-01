// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, getAllRooms } from "../utils/firebaseStorage";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) return;
    const id = await createRoom(title);
    navigate(`/room/${id}`);
  };

  const fetchRooms = async () => {
    const result = await getAllRooms();
    setRooms(result);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎯 제비뽑기 방 만들기</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>방 만들기</button>

      <h3>📄 기존 글 목록</h3>
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