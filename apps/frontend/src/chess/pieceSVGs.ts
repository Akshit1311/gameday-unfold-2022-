import { IChessPieceColor, IChessPieceType } from "./chessTypes";

const getSVG = (code: string) => {
  if (!code) {
    return "";
  }
  return `https://upload.wikimedia.org/wikipedia/commons/${code}45.svg`;
};

type TPieceSVGs = {
  [key in IChessPieceType]: {
    [key in IChessPieceColor]: string;
  };
};

const pieceSVGs: TPieceSVGs = {
  [IChessPieceType.PAWN]: {
    white: getSVG("4/45/Chess_plt"),
    black: getSVG("c/c7/Chess_pdt"),
  },
  [IChessPieceType.KNIGHT]: {
    white: getSVG("7/70/Chess_nlt"),
    black: getSVG("e/ef/Chess_ndt"),
  },
  [IChessPieceType.BISHOP]: {
    white: getSVG("b/b1/Chess_blt"),
    black: getSVG("9/98/Chess_bdt"),
  },
  [IChessPieceType.ROOK]: {
    white: getSVG("7/72/Chess_rlt"),
    black: getSVG("f/ff/Chess_rdt"),
  },

  [IChessPieceType.QUEEN]: {
    white: getSVG("1/15/Chess_qlt"),
    black: getSVG("4/47/Chess_qdt"),
  },
  [IChessPieceType.KING]: {
    white: getSVG("4/42/Chess_klt"),
    black: getSVG("f/f0/Chess_kdt"),
  },
};

export default pieceSVGs;
