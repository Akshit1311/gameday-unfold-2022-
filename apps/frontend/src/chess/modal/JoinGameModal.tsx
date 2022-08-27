import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Modal from "./Modal";

export default function JoinGameModal({ joinGame, closeModal }) {
  const [gameID, setGameID] = useState("");

  const handleSubmit = () => {
    if (gameID !== "") {
      joinGame(gameID);
      closeModal();
      setGameID("");
    }
  };

  return (
    <Modal>
      <form className="modal" onSubmit={handleSubmit}>
        <div className="text-xl">Enter ID of game to join : </div>
        <input
          className="text-xl my-4 border border-slate-900 px-4 py-2 rounded-lg"
          type="text"
          value={gameID}
          placeholder="Enter game ID"
          onChange={(e) => setGameID(e.target.value)}
        />
        <div className="my-2">
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <Button variant="danger" onClick={closeModal}>
          Close Modal
        </Button>
      </form>
    </Modal>
  );
}
