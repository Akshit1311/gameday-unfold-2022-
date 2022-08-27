import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { IChessPieceColor } from "../chessTypes";
import Modal from "./Modal";

export default function CreateGameModal({ createGame, closeModal }) {
  const [colorChoice, setColorChoice] = useState<IChessPieceColor>(
    IChessPieceColor.WHITE
  );

  return (
    <Modal>
      <div className="text-xl font-bold">Choose your color : </div>
      <div className="flex gap-2 my-2">
        <Button
          variant="outlined"
          onClick={() => setColorChoice(IChessPieceColor.WHITE)}
          isSelected={colorChoice === IChessPieceColor.WHITE}
        >
          White
        </Button>
        <Button
          onClick={() => setColorChoice(IChessPieceColor.BLACK)}
          variant="outlined"
          isSelected={colorChoice === IChessPieceColor.BLACK}
        >
          Black
        </Button>
      </div>

      <div className="my-2">
        <Button onClick={() => createGame(colorChoice)}>Create Game!</Button>
      </div>

      <Button variant="danger" onClick={closeModal}>
        Close Modal
      </Button>
    </Modal>
  );
}
