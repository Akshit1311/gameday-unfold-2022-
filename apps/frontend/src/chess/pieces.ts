import { IChessPieceColor, IChessPieceType } from "./chessTypes";

const pieces = {
  whitePawn: { type: IChessPieceType.PAWN, color: IChessPieceColor.WHITE },
  whiteKnight: { type: IChessPieceType.KNIGHT, color: IChessPieceColor.WHITE },
  whiteBishop: { type: IChessPieceType.BISHOP, color: IChessPieceColor.WHITE },
  whiteRook: { type: IChessPieceType.ROOK, color: IChessPieceColor.WHITE },
  whiteQueen: { type: IChessPieceType.QUEEN, color: IChessPieceColor.WHITE },
  whiteKing: { type: IChessPieceType.KING, color: IChessPieceColor.WHITE },

  blackPawn: { type: IChessPieceType.PAWN, color: IChessPieceColor.BLACK },
  blackKnight: { type: IChessPieceType.KNIGHT, color: IChessPieceColor.BLACK },
  blackBishop: { type: IChessPieceType.BISHOP, color: IChessPieceColor.BLACK },
  blackRook: { type: IChessPieceType.ROOK, color: IChessPieceColor.BLACK },
  blackQueen: { type: IChessPieceType.QUEEN, color: IChessPieceColor.BLACK },
  blackKing: { type: IChessPieceType.KING, color: IChessPieceColor.BLACK },
};

export default pieces;
