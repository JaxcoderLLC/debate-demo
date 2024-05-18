import { createWalletClient, custom } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const walletClient = createWalletClient({
  account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY as string}`),
  chain: base,
  transport: custom(window.ethereum!),
});
