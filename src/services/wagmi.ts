"use client";

import { createConfig, createStorage, http } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { base } from "wagmi/chains";

import dotenv from "dotenv";

dotenv.config();

const connector = injected();

const projectId =
  (process.env.PROJECT_ID as string) || "31b0b6255ee5cc68ae76cab5fa96a9a0";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [connector, walletConnect({ projectId })],
  // storage: createStorage({ storage: window?.localStorage }),
  transports: {
    [base.id]: http(
      (process.env.NEXT_PUBLIC_BASE_RPC_URL as string) ||
        "https://base-sepolia.g.alchemy.com/v2/xFAklZUTuJWw2xfnsDrN73PklwhbZVfh",
      { batch: true }
    ),
  },
});
