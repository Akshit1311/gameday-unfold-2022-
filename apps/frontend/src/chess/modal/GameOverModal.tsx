import React from "react";
import Button from "../../components/Button/Button";
import Modal from "./Modal";

export default function GameOverModal({
  status,
  toggleCreateGame,
  closeModal,
}: any) {
  const result = status.result.charAt(0).toUpperCase() + status.result.slice(1);

  return (
    <Modal>
      <div className="text-lg">
        {result}! {status.score}
      </div>
      <Button variant="danger" onClick={closeModal}>
        Close Modal
      </Button>
    </Modal>
  );
}
