"use client";

import { createConfig, createStorage, http, usePublicClient } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { base, baseSepolia, optimismSepolia } from "wagmi/chains";

import dotenv from "dotenv";
import { PrivyClientConfig } from "@privy-io/react-auth";
import { createPublicClient, createWalletClient, custom } from "viem";

dotenv.config();

const connector = injected();

const projectId =
  (process.env.PROJECT_ID as string) || "31b0b6255ee5cc68ae76cab5fa96a9a0";

export const wagmiConfig = createConfig({
  chains: [optimismSepolia],
  connectors: [connector, walletConnect({ projectId })],
  // storage: createStorage({ storage: window?.localStorage }),
  transports: {
    // [baseSepolia.id]: http(
    //   (process.env.NEXT_PUBLIC_BASE_RPC_URL as string) ||
    //     "https://base-sepolia.g.alchemy.com/v2/xFAklZUTuJWw2xfnsDrN73PklwhbZVfh",
    //   { batch: true }
    // ),
    [optimismSepolia.id]: http(
      process.env.NEXT_PUBLIC_OP_SEPOLIA_RPC_URL as string,
      {
        batch: true,
      }
    ),
  },
});

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ["email", "sms"],
  appearance: {
    showWalletLoginFirst: false,
  },
  defaultChain: optimismSepolia,
  legal: {
    privacyPolicyUrl: "https://privy.io/privacy",
    termsAndConditionsUrl: "https://privy.io/terms",
  },
  fiatOnRamp: {
    useSandbox: true,
  },
  loginMethodsAndOrder: {
    primary: ["email", "sms"],
    overflow: ["google"],
  },
};

export const walletClient = createWalletClient({
  chain: optimismSepolia,
  transport: custom(window ? window.ethereum! : http()),
});

export const publicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http(),
});
