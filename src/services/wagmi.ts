import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { base } from "wagmi/chains";

import dotenv from "dotenv";
import { PrivyClientConfig } from "@privy-io/react-auth";

dotenv.config();

const projectId =
  (process.env.PROJECT_ID as string) || "31b0b6255ee5cc68ae76cab5fa96a9a0";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected(), walletConnect({ projectId })],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL as string, {
      batch: true,
    }),
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
  defaultChain: base,
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
