import {
  Allo,
  CreatePoolArgs,
  DirectGrantsLiteStrategy,
  NATIVE,
} from "@allo-team/allo-v2-sdk";
import { commonConfig } from "@/config/common";
import { base } from "viem/chains";
import { InitializeData } from "@allo-team/allo-v2-sdk/dist/strategies/DirectGrantsLiteStrategy/types";
import { Address, createWalletClient, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const useAllo = () => {
  const allo = new Allo({
    chain: base.id,
    rpc: process.env.NEXT_PUBLIC_BASE_RPC_URL as string,
  });
  const strategy = new DirectGrantsLiteStrategy({
    chain: base.id,
    rpc: process.env.NEXT_PUBLIC_BASE_RPC_URL as string,
  });
  strategy.setContract("0x79A5EEc2C87Cd2116195E71af7A38647f89C8Ffa");

  // NOTE: Timestamps should be in seconds and start should be a few minutes in the future to account for transaction times.7
  const createPool = async ({
    owner,
    regStartTime,
    regEndTime,
  }: {
    owner: Address;
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
        pointer: "test pointer", //pointer.IpfsHash,
      },
      managers: commonConfig.managers,
    };

    // Prepare the transaction data
    const createPoolData = allo.createPoolWithCustomStrategy(poolCreationData);

    let transactionHash = "0x";

    try {
      // const transactionRequest = {
      //   to: createPoolData.to as string,
      //   data: createPoolData.data,
      //   value: BigInt(createPoolData.value),
      // };
      const walletClient = createWalletClient({
        account: owner,
        chain: base,
        transport: custom(window.ethereum!),
      });
      
      transactionHash = await walletClient.sendTransaction({
        account: owner,
        data: createPoolData.data,
        to: createPoolData.to,
        value: BigInt(createPoolData.value),
      });

      setTimeout(() => {}, 5000);
    } catch (e) {
      console.error("Creating Pool", e);
    }

    return transactionHash;
  };

  return { strategy, createPool };
};

// const transactionRequest = {
//   to: '0xTheRecipientAddress',
//   value: 100000,
// };
// const transactionHash = await provider.request({
//   method: 'eth_sendTransaction',
//   params: [transactionRequest],
// });
