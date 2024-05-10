"use client";

import { wagmiConfig } from "@/services/wagmi";
import { DonationContextProvider } from "./DonationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();
import PrivyWrapper from "./PrivyWrapper";

const Providers = (props: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <NextUIProvider>
      <PrivyWrapper>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <DonationContextProvider>{props.children}</DonationContextProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyWrapper>
    </NextUIProvider>
  );
};

export default Providers;
