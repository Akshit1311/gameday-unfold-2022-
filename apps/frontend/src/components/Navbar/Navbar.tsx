import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import uauth from "../../services/ud";

const Navbar = () => {
  const router = useRouter();

  const loginWithUd = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      console.log(authorization);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" top-0 py-4 px-8 flex w-full justify-between items-center bg-slate-100">
      <div
        className="h-12 w-12 relative rounded-lg border border-slate-500 overflow-hidden cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.webp" layout="fill" alt="chess-sudoku" />
      </div>
      <ConnectButton />
      <button onClick={loginWithUd}>Login With UD</button>
    </div>
  );
};

export default Navbar;
