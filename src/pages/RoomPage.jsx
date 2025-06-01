// src/pages/RoomPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRoomById,
  updateRoom,
  deleteRoomById,
} from "../utils/firebaseStorage"; // ✅ 변경된 경로

export default function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [name, setName] = useState("");
  const [damage, setDamage] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [winner, setWinner] = useState("");

  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

  useEffect(() => {
    (async () => {
      const found = await getRoomById(roomId);
      if (!found) return alert("방을 찾을 수 없습니다.");
      setRoom(found);
    })();
  }, [roomId]);

  const handleAdd = async () => {
    if (!name || !damage || isNaN(damage)) return;
    const newParticipant = { name, damage: parseFloat(damage) };
    const updated = {
      ...room,
      participants: [...room.participants, newParticipant],
    };
    await updateRoom(updated);
    setRoom(updated);
    setName("");
    setDamage("");
  };

  const total = room?.participants.reduce((sum, p) => sum + p.damage, 0) || 0;

  const handleDraw = () => {
    if (inputKey !== ADMIN_KEY) return alert("🔐 관리자 키를 입력해야 추첨할 수 있습니다!");
    const pool = room.participants.flatMap((p) =>
      Array(Math.round(p.damage * 10)).fill(p.name)
    );
    if (pool.length === 0) return;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setWinner(chosen);
  };

  const handleDelete = async () => {
    if (inputKey !== ADMIN_KEY) return alert("❌ 관리자 키가 틀렸습니다!");
    await deleteRoomById(room.id);
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎯 방 제목: {room?.title}</h2>

      {!room && <p>방을 불러오는 중입니다...</p>}

      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="딜량"
          type="number"
          step="0.1"
          value={damage}
          onChange={(e) => setDamage(e.target.value)}
        />
        <button onClick={handleAdd}>참여</button>
      </div>

      <h4>📋 참가자 목록</h4>
      <ul>
        {room?.participants.map((p, i) => (
          <li key={i}>
            {p.name} - {p.damage} ({((p.damage / total) * 100).toFixed(2)}%)
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <input
          placeholder="🔐 관리자 키 입력"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button onClick={handleDraw}>🎁 제비뽑기</button>
        <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
          ❌ 글 삭제
        </button>
      </div>

      {winner && (
        <div style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
          🎉 당첨자: <strong>{winner}</strong>
        </div>
      )}
    </div>
  );
}