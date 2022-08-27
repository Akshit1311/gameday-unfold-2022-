import React from "react";
import pieces from "./pieces";
import pieceSymbols from "./pieceSymbols";
import { IChessPiece, IChessPromotionMove } from "./chessTypes";

interface IProps {
  promotionMove: IChessPromotionMove;
  promote: (piece: IChessPiece) => void;
}
export default function PromotionModal({ promotionMove, promote }: IProps) {
  const promotablePieces = [
    pieces.whiteQueen,
    pieces.whiteRook,
    pieces.whiteBishop,
    pieces.whiteKnight,
    pieces.blackQueen,
    pieces.blackRook,
    pieces.blackBishop,
    pieces.blackKnight,
  ];

  const piecesToRender = promotablePieces.filter(
    (piece) => piece.color === promotionMove.piece.color
  );

  return (
    <div id="promotion-modal">
      <div className="promotion-pieces">
        {piecesToRender.map((piece, index) => (
          <div
            key={index}
            onClick={(e) => {
              promote(piece);
            }}
          >
            {pieceSymbols[piece.type][piece.color]}
          </div>
        ))}
      </div>
    </div>
  );
}
