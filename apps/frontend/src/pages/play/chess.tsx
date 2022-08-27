import React, { useEffect, useState } from "react";
import Board from "../../chess/Board";
import Chess from "../../chess/chess";
import {
  EChessOptionModal,
  IChessGameData,
  IChessPieceColor,
} from "../../chess/chessTypes";
import Emptyboard from "../../chess/Emptyboard";
import GameOptionsBar from "../../chess/gameOptions/GameOptionsBar";
import ChessModals from "../../chess/modal/ChessModals";
import { socket } from "../../connection/socket";
import gameService from "../../services/game";
import { useRouter } from "next/router";

const ChessGame = () => {
  const router = useRouter();

  const [game, setGame] = useState({
    board: null,
    moveHistory: [],
    notation: [],
    capturedPieces: [],
    playerToMove: null,
    status: { result: "undecided", score: "undecided" },
  });
  const chess = new Chess();
  const [openModal, setOpenModal] = useState<EChessOptionModal>(
    EChessOptionModal.NULL
  );

  const [gameData, setGameData] = useState<IChessGameData>({
    id: null,
    color: null,
  });

  // Takes in a game state to update React state
  const updateLocalGameState = async (updatedGame: IChessGameData) => {
    const updatedBoard = chess.createBoardFromMoveHistory(
      updatedGame.moveHistory
    );
    const notation = chess.getMoveNotation(updatedGame.moveHistory);
    const capturedPieces = chess.getCapturedPieces(updatedBoard);
    const playerToMove = chess.getWhoseTurn(updatedGame.moveHistory);
    const gameIsOver =
      chess.isGameOver(updatedBoard) ||
      updatedGame.status.result !== "undecided";

    const needToUpdateGameResult =
      gameIsOver && updatedGame.status.result === "undecided";
    if (needToUpdateGameResult) {
      const gameResult = chess.isGameOver(updatedBoard);
      await gameService.setGameResult(gameData.id, gameResult);
    }

    setGame({
      board: updatedBoard,
      moveHistory: updatedGame.moveHistory,
      notation: notation,
      capturedPieces: capturedPieces,
      playerToMove: playerToMove,
      status: updatedGame.status,
    });

    if (updatedGame.status.result !== "undecided") {
      setOpenModal("gameOver");
    }
  };

  // Upon loading, if a current game is stored, get game from db
  useEffect(() => {
    const isCurrentGame = localStorage.getItem("CURRENT_GAME_DATA");

    if (router.query.gameId) {
      joinGame(router.query.gameId.toString());
    } else if (isCurrentGame) {
      const currentGameData = JSON.parse(
        localStorage.getItem("CURRENT_GAME_DATA")
      );
      setGameData(currentGameData);
      socket.emit("joinGame", currentGameData.id);
    }
  }, [router.query.gameId]);

  // if the local gameID state is changed, retrieves new game from database
  useEffect(() => {
    if (gameData.id === null) return;
    const getCurrentGame = async () => {
      const updatedGame = await gameService.getGame(gameData.id);
      if (updatedGame.error) return setOpenModal("error");
      updateLocalGameState(updatedGame);
    };
    getCurrentGame();
    socket.on("gameUpdate", async () => getCurrentGame());
    return () => {
      socket.off("gameUpdate");
    };
  }, [gameData]);

  useEffect(() => {
    socket.on("opponentResigned", () => {
      const resigningColor = gameData.color === "white" ? "black" : "white";
      handleResignation(resigningColor);
    });
    return () => {
      socket.off("opponentResigned");
    };
  });

  useEffect(() => {
    socket.on("requestColor", (joiningPlayerID) => {
      const opponentsColor = gameData.color === "white" ? "black" : "white";
      const joiningPlayerData = {
        playerID: joiningPlayerID,
        gameID: gameData.id,
        color: opponentsColor,
      };
      socket.emit("assignColor", joiningPlayerData);
    });
    return () => {
      socket.off("requestColor");
    };
  });

  useEffect(() => {
    socket.on("joinGame", (gameData) => {
      localStorage.setItem("CURRENT_GAME_DATA", JSON.stringify(gameData));
      setGameData(gameData);
    });
    return () => {
      socket.off("joinGame");
    };
  });

  const move = async (moveToPlay) => {
    updateGameOptimistically(moveToPlay);
    await gameService.playMove(gameData.id, moveToPlay);
    const updatedGame = await gameService.getGame(gameData.id);
    //const updatedGame = await gameService.playMove(gameData.id, moveToPlay)
    if (updatedGame.error) {
      console.log(updatedGame);
      return setOpenModal("error");
    }
    updateLocalGameState(updatedGame);
    socket.emit("update", gameData.id);
  };

  // Updates react state using chess logic without waiting for server response
  const updateGameOptimistically = (move) => {
    const isPlayableMove = chess.isPlayableMove(game.board, move);
    if (!isPlayableMove) return;
    const fullMove = chess.getFullMove(game.board, move);
    const updatedGame = {
      status: game.status,
      moveHistory: [...game.moveHistory, fullMove],
    };
    updateLocalGameState(updatedGame);
  };

  const createGame = async (colorChoice: IChessPieceColor) => {
    if (!colorChoice) return console.log("select color");
    setOpenModal(EChessOptionModal.NULL);
    const newGame = await gameService.createGame();
    const newGameData = { id: newGame.id, color: colorChoice };
    if (gameData.id) {
      const gameToLeave = gameData.id;
      socket.emit("leftGame", gameToLeave);
    }
    socket.emit("createdGame", newGameData);
    localStorage.setItem("CURRENT_GAME_DATA", JSON.stringify(newGameData));
    setGameData(newGameData);
    setOpenModal(EChessOptionModal.CREATED_GAME_INFO);
  };

  const joinGame = async (gameID: string) => {
    if (gameData) {
      socket.emit("leftGame", gameData.id);
    }
    socket.emit("requestJoinGame", gameID);
  };

  const resign = async () => {
    if (!gameData.id || game.status.result !== "undecided") return;
    socket.emit("resign", gameData.id);
    const score = gameData.color === "white" ? "0-1" : "1-0";
    const status = { result: `${gameData.color} resigned`, score };
    await gameService.setGameResult(gameData.id, status);
    handleResignation(gameData.color);
  };

  const handleResignation = (resigningColor: IChessPieceColor) => {
    const result = `${resigningColor} resigned`;
    const score = resigningColor === "white" ? "0-1" : "1-0";
    setGame({ ...game, status: { result, score } });
    setOpenModal(EChessOptionModal.GAME_OVER);
  };

  const findPossibleMoves = (square) => {
    return chess.findSquaresForPiece(game.board, square, "possibleMoves");
  };

  const highlightMovesForPiece = (possibleMoves) => {
    const highlightedBoard = chess.markPossibleMoves(game.board, possibleMoves);
    setGame((game) => ({ ...game, board: highlightedBoard }));
  };

  const gameInProgress = game.board !== null;

  const toggleOption = (option: EChessOptionModal) => {
    if (openModal === option) return setOpenModal(null);
    setOpenModal(option);
  };

  const modalFunctions = { createGame, joinGame, resign, toggleOption };

  return (
    <div className="flex-1 grid grid-cols-2 place-items-center">
      {gameInProgress && (
        <Board
          game={game}
          move={move}
          findPossibleMoves={findPossibleMoves}
          highlightMovesForPiece={highlightMovesForPiece}
          playerColor={gameData ? gameData.color : null}
        />
      )}
      {!gameInProgress && <Emptyboard chess={chess} />}

      <div className="h-full py-8">
        <GameOptionsBar toggleOption={toggleOption} />
        <ChessModals
          openModal={openModal}
          modalFunctions={modalFunctions}
          gameID={gameData.id}
          status={game.status}
          closeModal={() => setOpenModal(EChessOptionModal.NULL)}
        />
      </div>
    </div>
  );
};

export default ChessGame;
