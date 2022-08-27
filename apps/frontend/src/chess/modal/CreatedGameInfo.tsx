import React from "react";
import Button from "../../components/Button/Button";
import Modal from "./Modal";

export default function CreatedGameInfo({ gameID, closeModal }) {
  return (
    <Modal>
      {gameID && (
        <>
          <div className="text-xl">
            Send the game ID to a friend for them to join
          </div>
          <div className="my-4">
            <div className="text-2xl text-center border-4 font-bold text-slate-700 border-slate-700 py-2 px-4 rounded-lg my-4 w-fit mx-auto  ">
              {gameID}
            </div>
            <Button
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(gameID);
                alert("Game ID Copied!");
              }}
            >
              Copy
            </Button>
          </div>
        </>
      )}

      {!gameID && <div>No current game. Try creating or joining a game.</div>}
      <Button variant="danger" onClick={closeModal}>
        Close Modal
      </Button>
    </Modal>
  );
}
