import React from "react";
import Button from "../../components/Button/Button";
import Modal from "./Modal";

export default function ConfirmResignationModal({ resign, closeModal }: any) {
  return (
    <Modal>
      <div className="text-xl">Are you sure you would like to resign?</div>

      <div className="my-3">
        <Button variant="primary" onClick={resign}>
          Confirm
        </Button>
      </div>
      <Button variant="danger" onClick={closeModal}>
        Close Modal
      </Button>
    </Modal>
  );
}
