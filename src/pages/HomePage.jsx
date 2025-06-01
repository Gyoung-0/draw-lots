import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, getAllRooms } from "../utils/firebaseStorage";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요!");
    const id = await createRoom(title.trim());
    const updatedRooms = await getAllRooms();   // ✅ 방 목록 갱신
    setRooms(updatedRooms);
    navigate(`/room/${id}`);
  };

  useEffect(() => {
    (async () => {
      const result = await getAllRooms();
      setRooms(result);
    })();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎯 제비뽑기 글 생성</h2>
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
            <a href={`/room/${room.id}`}>{room.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}