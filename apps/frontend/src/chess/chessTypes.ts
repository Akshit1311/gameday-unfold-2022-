export interface IChessGame {
  board: null;
  moveHistory: [];
  notation: [];
  capturedPieces: [];
  playerToMove: null;
  status: { result: "undecided"; score: "undecided" };
}

export enum IChessPieceColor {
  WHITE = "white",
  BLACK = "black",
}
export enum IChessPieceType {
  PAWN = "pawn",
  KNIGHT = "knight",
  BISHOP = "bishop",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export interface IChessPiece {
  type: IChessPieceType;
  color: IChessPieceColor;
}

export interface IChessPromotionMove {
  piece: IChessPiece;
}

export enum IChessCol {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
}

export enum IChessRow {
  "1 " = "1",
  "2 " = "2",
  "3 " = "3",
  "4 " = "4",
  "5 " = "5",
  "6 " = "6",
  "7 " = "7",
  "8 " = "8",
}

export type TChessCoords = [IChessCol, IChessRow];

export interface IChessSquare {
  coordinates: TChessCoords;
  piece: IChessPiece;
  color: IChessPieceColor | "light" | "dark";
  isPossibleMove: boolean;
}

export interface IChessMove {
  from: TChessCoords;
  to: TChessCoords;
}

export enum EChessOptionModal {
  NULL = "",
  CREATE_GAME = "createGame",
  JOIN_GAME = "joinGame",
  CONFIRM_RESIGNATION = "confirmResignation",
  CREATED_GAME_INFO = "createdGameInfo",
  GAME_OVER = "gameOver",
  ERROR = "error",
}

export interface IChessGameData {
  id: null | string;
  color: null | IChessPieceColor;
}
