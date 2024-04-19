"use client";

import { wagmiConfig } from "@/services/wagmi";
import { DonationContextProvider } from "./DonationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();
import { ChakraProvider } from "@chakra-ui/react";

const Providers = (props: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <DonationContextProvider>{props.children}</DonationContextProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
