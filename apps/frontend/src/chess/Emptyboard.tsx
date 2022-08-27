import React from "react";
import Chess from "./chess";

export default function Emptyboard({ chess }: { chess: Chess }) {
  return (
    <table id="board" cellSpacing="0">
      <tbody>
        {chess.createEmptyBoard().map((row, index) => (
          <tr className="board-row" key={index}>
            {row.map((square) => (
              <td
                className={`h-16 w-16 bg-slate-${
                  square.color === "light" ? 300 : 700
                }`}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
