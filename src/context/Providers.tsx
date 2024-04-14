"use client";

import { wagmiConfig } from "@/services/wagmi";
import { DonationContextProvider } from "./DonationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

const Providers = (props: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DonationContextProvider>{props.children}</DonationContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
