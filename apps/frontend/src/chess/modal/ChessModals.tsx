import React from "react";
import CreateGameModal from "./CreateGameModal";
import CreatedGameInfo from "./CreatedGameInfo";
import JoinGameModal from "./JoinGameModal";
import ConfirmResignationModal from "./ConfirmResignationModal";
import ErrorModal from "./ErrorModal";
import GameOverModal from "./GameOverModal";
import { EChessOptionModal, IChessPieceColor } from "../chessTypes";

enum MODALS {
  CREATEGAME = "createGame",
  CREATEDGAMEINFO = "createdGameInfo",
  JOINGAME = "joinGame",
  CONFIRMRESGNATION = "confirmResignation",
  GAMEOVER = "gameOver",
  ERROR = "error",
}

interface IModalFunctions {
  createGame: (colorChoice: IChessPieceColor) => Promise<void>;
  joinGame: (gameID: any) => Promise<void>;
  resign: () => Promise<void>;
  toggleOption: (option: EChessOptionModal) => void;
}

interface IChessModals {
  openModal: EChessOptionModal;
  modalFunctions: IModalFunctions;
  gameID: string | null;
  status: {
    result: string;
    score: string;
  };
  closeModal: (value: React.SetStateAction<EChessOptionModal>) => void;
}

export default function ChessModals({
  openModal,
  modalFunctions,
  gameID,
  status,
  closeModal,
}: IChessModals) {
  const { createGame, joinGame, resign, toggleOption } = modalFunctions;

  return (
    <>
      {EChessOptionModal.CREATE_GAME === openModal && (
        <CreateGameModal createGame={createGame} closeModal={closeModal} />
      )}
      {EChessOptionModal.CREATED_GAME_INFO === openModal && (
        <CreatedGameInfo gameID={gameID} closeModal={closeModal} />
      )}
      {EChessOptionModal.JOIN_GAME === openModal && (
        <JoinGameModal joinGame={joinGame} closeModal={closeModal} />
      )}
      {EChessOptionModal.CONFIRM_RESIGNATION === openModal && (
        <ConfirmResignationModal resign={resign} closeModal={closeModal} />
      )}
      {EChessOptionModal.GAME_OVER === openModal && (
        <GameOverModal
          status={status}
          toggleCreateGame={() => toggleOption(EChessOptionModal.CREATE_GAME)}
          closeModal={closeModal}
        />
      )}
      {EChessOptionModal.ERROR === openModal && (
        <ErrorModal closeModal={closeModal} />
      )}
    </>
  );
}
