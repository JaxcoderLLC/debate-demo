"use client";

import React, { useEffect } from "react";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
import Hero from "@/components/Hero";
import { Container } from "@/components/Container";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        const provider = initSilk();

        // @ts-ignore
        window.ethereum = provider;
        // provider.login();
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // TODO: fetch the actual stats we want to show
  const stats = [
    { id: 1, name: "Total Donations", value: "40K+" },
    { id: 2, name: "Flat platform fee", value: "3%" },
    { id: 3, name: "Total Events Created", value: "12" },
    { id: 4, name: "Paid out to candidates", value: "$235,957" },
  ];

  return (
    <main>
      <Container>
        <Hero stats={stats} />
        <div className=" text-center">
          <h2 className="text-2xl font-bold text-gray-800">How it works</h2>
          <p className="text-lg text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            suscipit, sapien nec vehicula lacinia, erat odio ultricies nunc, nec
            scelerisque neque nunc at justo. Nunc non nisl vel lorem tincidunt
            suscipit. Nulla facilisi. Nam nec libero ut elit lacinia auctor.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Create an Event</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              suscipit, sapien nec vehicula lacinia, erat odio ultricies nunc,
              nec scelerisque neque nunc at justo. Nunc non nisl vel lorem
              tincidunt suscipit. Nulla facilisi. Nam nec libero ut elit lacinia
              auctor.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Share the Link</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              suscipit, sapien nec vehicula lacinia, erat odio ultricies nunc,
              nec scelerisque neque nunc at justo. Nunc non nisl vel lorem
              tincidunt suscipit. Nulla facilisi. Nam nec libero ut elit lacinia
              auctor.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Collect Donations
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              suscipit, sapien nec vehicula lacinia, erat odio ultricies nunc,
              nec scelerisque neque nunc at justo. Nunc non nisl vel lorem
              tincidunt suscipit. Nulla facilisi. Nam nec libero ut elit lacinia
              auctor.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Withdraw Funds</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              suscipit, sapien nec vehicula lacin
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mb-16 mt-12">
          <button className="p-6 w-1/3 mt-4 text-centerborder rounded-xl text-3xl bg-blue-600 text-white">
            Get Started
          </button>
        </div>
      </Container>
    </main>
  );
};

export default Home;
