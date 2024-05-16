import {
  Allo,
  CreatePoolArgs,
  DirectGrantsLiteStrategy,
  NATIVE,
} from "@allo-team/allo-v2-sdk";
import { commonConfig } from "@/config/common";
import { optimismSepolia } from "viem/chains";
import { useWallets } from "@privy-io/react-auth";
import { InitializeData } from "@allo-team/allo-v2-sdk/dist/strategies/DirectGrantsLiteStrategy/types";

export const useAllo = async () => {
  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet
  const provider = await wallet.getEthereumProvider();

  const allo = new Allo({
    chain: optimismSepolia.id,
    rpc: process.env.NEXT_PUBLIC_OP_SEPOLIA_RPC_URL as string,
  });
  const strategy = new DirectGrantsLiteStrategy({
    chain: optimismSepolia.id,
    rpc: process.env.NEXT_PUBLIC_OP_SEPOLIA_RPC_URL as string,
  });
  strategy.setContract("0x11b5B8094F668D870487a62012ed8ffd69E2bbd7");

  // NOTE: Timestamps should be in seconds and start should be a few minutes in the future to account for transaction times.7
  const startDateInSeconds = BigInt(
    Math.floor(new Date().getTime() / 1000) + 300
  );
  const endDateInSeconds = BigInt(
    Math.floor(new Date().getTime() / 1000) + 10000
  );

  const initParams: InitializeData = {
    useRegistryAnchor: false,
    metadataRequired: false,
    registrationStartTime: startDateInSeconds,
    registrationEndTime: endDateInSeconds,
  };

  const initStrategyData = await strategy.getInitializeData(initParams);

  const poolCreationData: CreatePoolArgs = {
    profileId: commonConfig.ownerProfileId, // sender must be a profile member
    strategy: "0x11b5B8094F668D870487a62012ed8ffd69E2bbd7", // approved strategy contract
    initStrategyData: initStrategyData, // unique to the strategy
    token: NATIVE as `0x${string}`, // you need to change this to your token address
    amount: BigInt(1e14),
    metadata: {
      protocol: BigInt(1),
      pointer: "test pointer", //pointer.IpfsHash,
    },
    managers: commonConfig.managers,
  };

  // Prepare the transaction data
  const createPoolData = allo.createPoolWithCustomStrategy(
    poolCreationData
  );

  try {
    const transactionRequest = {
      to: createPoolData.to as string,
      data: createPoolData.data,
      value: BigInt(createPoolData.value),
    };
    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [transactionRequest],
    });

    setTimeout(() => {}, 5000);

    return transactionHash;

    // return {
    //   address: strategyAddress as `0x${string}`,
    //   poolId: poolId,
    // };
  } catch (e) {
    console.error("Creating Pool", e);
  }
};
