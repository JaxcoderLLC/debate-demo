"use client";

import { configureChains, createConfig } from "wagmi";
import { arbitrum, arbitrumGoerli, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
// import { InjectedConnector } from "@wagmi/core";

import dotenv from "dotenv";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
dotenv.config();

const availableChains = [arbitrum, arbitrumGoerli, goerli];
const { publicClient, webSocketPublicClient } = configureChains(
  [...availableChains],
  [
    alchemyProvider({
      apiKey:
        (process.env.ALCHEMY_ID as string) ||
        "ajWJk5YwtfTZ5vCAhMg8I8L61XFhyJpa",
    }),
    infuraProvider({
      apiKey:
        (process.env.INFURA_ID as string) || "ae484befdd004b64bfe2059d3526a138",
    }),
    publicProvider(),
  ]
);

// const connector = new InjectedConnector();

export const wagmiConfig = createConfig({
  autoConnect: true,
  // connectors: [connector],
  logger: {
    warn: (message) => {
      console.warn(message);
    },
  },
  publicClient,
  webSocketPublicClient,
});
