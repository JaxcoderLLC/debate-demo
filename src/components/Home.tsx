"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-48">
        <button
          className="p-6 m-4 w-80 text-4xl border rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-700"
          onClick={() => {
            console.log("Fund Account");
          }}
        >
          Fund Account
        </button>
        <button
          className="p-6 m-4 w-80 text-4xl border rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-700"
          onClick={() => {
            console.log("Verify ID");
          }}
        >
          Verify ID
        </button>
        <Link
          className="p-6 m-4 w-80 text-center text-4xl border rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-700"
          href={"/donate"}
        >
          Donate
        </Link>
      </div>
    </main>
  );
};

export default Home;
