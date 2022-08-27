import React from "react";
import Modal from "./Modal";

export default function ErrorModal({ closeModal }: any) {
  return (
    <Modal>
      <button onClick={closeModal}>Close Modal</button>

      <div className="modal">
        A server error has occured. Please try refreshing the page.
      </div>
    </Modal>
  );
}
