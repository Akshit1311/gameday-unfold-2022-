import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Play = () => {
  const router = useRouter();

  const playGame = (game: "chess" | "sudoku") => router.push(`/play/${game}`);

  return (
    <div className="grid grid-cols-2 gap-16 w-full place-items-center flex-1 items-center px-64">
      <div
        className="bg-slate-200 rounded-lg p-16 text-center cursor-pointer hover:opacity-75"
        onClick={() => playGame("chess")}
      >
        <Image src="/icons/chess.png" height="200" width="200" alt="chess" />
      </div>
      <div
        className="bg-slate-200 rounded-lg p-16 text-center cursor-pointer hover:opacity-75"
        onClick={() => playGame("sudoku")}
      >
        <Image src="/icons/sudoku.png" height="200" width="200" alt="sudoku" />
      </div>
    </div>
  );
};

export default Play;
