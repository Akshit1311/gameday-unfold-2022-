import React, { useState } from "react";
import {
  getBoard,
  isMovePromotion,
  isBottomRowSquare,
  isLeftColumnSquare,
} from "./boardutils";
import pieceSymbols from "./pieceSymbols";
import pieceSVGs from "./pieceSVGs";
import PromotionModal from "./PromotionModal";
import Image from "next/image";
import { IChessCol } from "./chessTypes";

export default function Board({
  game,
  move,
  findPossibleMoves,
  highlightMovesForPiece,
  playerColor,
}: any) {
  const { board, playerToMove, status } = game;

  const [pieceToMove, setPieceToMove] = useState<any>(null);
  const [promotionMove, setPromotionMove] = useState<any>(null);

  const lastMove = game.moveHistory[game.moveHistory.length - 1];
  const lastPlayedMoveSquares = lastMove ? [lastMove.from, lastMove.to] : [];

  const movePiece = (targetSquare: any) => {
    highlightMovesForPiece([]);
    const moveToPlay = {
      piece: pieceToMove.piece,
      from: pieceToMove.square,
      to: targetSquare,
    };
    if (isMovePromotion(moveToPlay.piece, targetSquare)) {
      return setPromotionMove({
        piece: pieceToMove.piece,
        from: pieceToMove.square,
        to: targetSquare,
      });
    }
    move(moveToPlay);
    setPieceToMove(null);
  };

  const selectPiece = (coordinates: any, piece: any) => {
    const wrongColor =
      playerColor !== playerToMove || piece.color !== playerColor;
    if (wrongColor || status.result !== "undecided") return;
    const possibleMoves = findPossibleMoves(coordinates);
    const selectedPiece = {
      piece,
      square: coordinates,
      possibleMoves: possibleMoves,
    };
    setPieceToMove(selectedPiece);
    highlightMovesForPiece(selectedPiece.possibleMoves);
  };

  const handleClick = ({ coordinates, piece }: any) => {
    const squareHasPiece = piece;
    if (!pieceToMove && squareHasPiece) selectPiece(coordinates, piece);
    if (pieceToMove) movePiece(coordinates);
  };

  const promote = (promotionChoice: any) => {
    if (!promotionMove) return;

    const moveToPlay = {
      piece: promotionMove.piece,
      from: promotionMove.from,
      to: promotionMove.to,
      promotion: promotionChoice,
    };
    move(moveToPlay);
    setPromotionMove(null);
    setPieceToMove(null);
  };

  return (
    <>
      {promotionMove && (
        <PromotionModal promotionMove={promotionMove} promote={promote} />
      )}

      <table id="board" cellSpacing="0">
        <tbody>
          {getBoard(board, playerColor).map((row, index) => (
            <tr className="grid grid-cols-8 bg-slate-600" key={index}>
              {row.map((square, j) => {
                console.log({
                  square,
                  isBottomRowSquare: isBottomRowSquare(playerColor, square),
                  letter:
                    square.coordinates[0] === IChessCol.A &&
                    playerColor === "white",
                  playerColor,
                });

                return (
                  <td
                    className={`relative h-[4.25rem] w-[4.25rem]  ${
                      (index + j) % 2 == 0 ? "bg-slate-300" : "bg-slate-600"
                    } grid place-items-center`}
                    key={square.coordinates[0]}
                    onClick={() =>
                      handleClick({
                        coordinates: square.coordinates,
                        piece: square.piece,
                      })
                    }
                    style={{
                      opacity: lastPlayedMoveSquares.includes(
                        square.coordinates
                      )
                        ? "70%"
                        : "100%",
                      cursor: square.piece ? "pointer" : "",
                    }}
                  >
                    {square.isPossibleMove && (
                      <span className="bg-cyan-200 h-[4.25rem] w-[4.25rem] absolute "></span>
                    )}
                    {isBottomRowSquare(playerColor, square) && (
                      <span
                        id="x-coords"
                        className={`absolute bottom-1 right-1  ${
                          square.color === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {square.coordinates[0]}
                      </span>
                    )}
                    {isLeftColumnSquare(playerColor, square) && (
                      <span
                        id="y-coords"
                        className={`absolute top-1 left-1  ${
                          square.color === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {square.coordinates[1]}
                      </span>
                    )}
                    {square.piece ? (
                      <Image
                        height={50}
                        width={50}
                        className="piece-icon"
                        src={pieceSVGs[square.piece.type][square.piece.color]}
                        alt={
                          pieceSymbols[square.piece.type][square.piece.color]
                        }
                      ></Image>
                    ) : (
                      " "
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
