import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar/Navbar";
import Table from "../components/Table/Table";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight">
        Play to Earn with
        <br />
        {/* <a className="text-blue-600" href="https://nextjs.org"> */}
        <a
          className="bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text"
          href="https://nextjs.org"
        >
          GameDay
          {/* <span className="text-red-500">Game</span>Day */}
        </a>
      </h1>

      {/* <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p> */}

      <div className="my-6">
        <Button onClick={() => router.push("/play")}>Lets Play</Button>
      </div>

      <Table />
    </main>
  );
};

export default Home;
