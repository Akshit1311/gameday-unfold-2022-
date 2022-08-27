import {
  IChessCol,
  IChessPiece,
  IChessPieceColor,
  IChessRow,
  IChessSquare,
} from "./chessTypes";

type TGetBoard = (
  board: IChessSquare[][],
  playerColor: IChessPieceColor
) => IChessSquare[][];

const getBoard: TGetBoard = (board, playerColor: IChessPieceColor) => {
  if (playerColor === "white") {
    return board;
  } else {
    const flippedBoard: IChessSquare[][] = [];
    for (let y = 7; y >= 0; y--) {
      const row = [];
      for (let x = 7; x >= 0; x--) {
        row.push(board[y][x]);
      }
      flippedBoard.push(row);
    }
    return flippedBoard;
  }
};

const isMovePromotion = (piece: IChessPiece, targetSquare) => {
  if (piece.type !== "pawn") {
    return false;
  }
  const targetRow = parseInt(targetSquare[1]);
  const pawnColor = piece.color;
  const moveIsPromotion =
    (pawnColor === "white" && targetRow === 8) ||
    (pawnColor === "black" && targetRow === 1);
  return moveIsPromotion;
};

const isBottomRowSquare = (
  playerColor: IChessPieceColor,
  square: IChessSquare
) => {
  return (
    (playerColor === "white" && square.coordinates[1] === IChessRow["1 "]) ||
    (playerColor === "black" && square.coordinates[1] === IChessRow["8 "])
  );
};

const isLeftColumnSquare = (
  playerColor: IChessPieceColor,
  square: IChessSquare
) => {
  return (
    (playerColor === "white" && square.coordinates[0] === IChessCol.A) ||
    (playerColor === "black" && square.coordinates[0] === IChessCol.H)
  );
};

export { getBoard, isMovePromotion, isBottomRowSquare, isLeftColumnSquare };
