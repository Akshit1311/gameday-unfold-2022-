import React from "react";
import { EChessOptionModal } from "../chessTypes";

interface IGameOptionsBar {
  toggleOption: (option: EChessOptionModal) => void;
}

const options = [
  {
    name: EChessOptionModal.CREATE_GAME,
    label: "Create Game",
  },
  {
    name: EChessOptionModal.JOIN_GAME,
    label: "Join Game",
  },
  {
    name: EChessOptionModal.CONFIRM_RESIGNATION,
    label: "Resign",
  },
  {
    name: EChessOptionModal.CREATED_GAME_INFO,
    label: "Show Game ID",
  },
];

const GameOptionsBar: React.FC<IGameOptionsBar> = ({ toggleOption }) => {
  return (
    <div className="flex gap-2">
      {options.map(({ label, name }) => (
        <button
          className="px-4  rounded-lg py-2 bg-blue-500 text-white"
          onClick={() => toggleOption(name)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default GameOptionsBar;
