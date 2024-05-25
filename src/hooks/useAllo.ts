import {
  Allo,
  CreatePoolArgs,
  DirectGrantsLiteStrategy,
  NATIVE,
} from "@allo-team/allo-v2-sdk";
import { commonConfig } from "@/config/common";
import { base } from "viem/chains";
import { InitializeData } from "@allo-team/allo-v2-sdk/dist/strategies/DirectGrantsLiteStrategy/types";

export const useAllo = () => {
  const allo = new Allo({
    chain: base.id,
    rpc: process.env.NEXT_PUBLIC_BASE_RPC_URL as string,
  });
  const strategy = new DirectGrantsLiteStrategy({
    chain: base.id,
    rpc: process.env.NEXT_PUBLIC_BASE_RPC_URL as string,
    address: "0x79A5EEc2C87Cd2116195E71af7A38647f89C8Ffa",
  });

  // NOTE: Timestamps should be in seconds and start should be a few minutes in the future to account for transaction times
  const createPool = async ({
    provider,
    regStartTime,
    regEndTime,
  }: {
    provider: any;
    regStartTime: bigint;
    regEndTime: bigint;
  }) => {
    const initParams: InitializeData = {
      useRegistryAnchor: false,
      metadataRequired: false,
      registrationStartTime: regStartTime,
      registrationEndTime: regEndTime,
    };

    const initStrategyData = await strategy.getInitializeData(initParams);

    // todo: check if the user has a profile and if not create one so they can donate...

    const poolCreationData: CreatePoolArgs = {
      profileId: commonConfig.ownerProfileId, // sender must be a profile member
      strategy: "0x79A5EEc2C87Cd2116195E71af7A38647f89C8Ffa", // approved strategy contract
      initStrategyData: initStrategyData, // unique to the strategy
      token: NATIVE as `0x${string}`, // you need to change this to your token address
      amount: BigInt(1e14),
      metadata: {
        protocol: BigInt(1),
        // todo: update this with the pointer to the metadata on IPFS
        pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi", //pointer.IpfsHash,
      },
      managers: commonConfig.managers,
    };

    // Prepare the transaction data
    const createPoolData = allo.createPool(poolCreationData);

    let transactionHash = "0x";

    try {
      const transactionRequest = {
        to: createPoolData.to as string,
        data: createPoolData.data,
        value: BigInt(createPoolData.value),
      };

      transactionHash = await provider.request({
        method: "eth_sendTransaction",
        params: [transactionRequest],
      });

      setTimeout(() => {}, 5000);
    } catch (e) {
      console.error("Creating Pool", e);
    }

    return transactionHash;
  };

  return { strategy, createPool };
};
