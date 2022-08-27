import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className=" top-0 py-4 px-8 flex w-full justify-between items-center bg-slate-100">
      <div
        className="h-12 w-12 relative rounded-lg border border-slate-500 overflow-hidden cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.webp" layout="fill" alt="chess-sudoku" />
      </div>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
