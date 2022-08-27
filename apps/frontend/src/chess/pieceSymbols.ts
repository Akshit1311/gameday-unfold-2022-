import { IChessPieceType } from "./chessTypes";

const pieceSymbols = {
  [IChessPieceType.PAWN]: {
    white: "\u2659",
    black: "\u265F",
  },
  [IChessPieceType.KNIGHT]: {
    white: "\u2658",
    black: "\u265E",
  },
  [IChessPieceType.BISHOP]: {
    white: "\u2657",
    black: "\u265D",
  },
  [IChessPieceType.ROOK]: {
    white: "\u2656",
    black: "\u265C",
  },
  [IChessPieceType.QUEEN]: {
    white: "\u2655",
    black: "\u265B",
  },
  [IChessPieceType.KING]: {
    white: "\u2654",
    black: "\u265A",
  },
};

export default pieceSymbols;
