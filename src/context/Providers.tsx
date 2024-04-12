import { wagmiConfig } from "@/services/wagmi";
import { DonationContextProvider } from "./DonationContext";
import { WagmiConfig } from "wagmi";

const Providers = (props: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <DonationContextProvider>{props.children}</DonationContextProvider>
    </WagmiConfig>
  );
};

export default Providers;
