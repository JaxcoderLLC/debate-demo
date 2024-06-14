import {
  Allo,
  CreatePoolArgs,
  DirectGrantsLiteStrategy,
  NATIVE,
} from "@allo-team/allo-v2-sdk";
import { base64Image, commonConfig } from "@/config/common";
import { base } from "viem/chains";
import { InitializeData } from "@allo-team/allo-v2-sdk/dist/strategies/DirectGrantsLiteStrategy/types";
import PinataClient from "@/services/pinata";
import { TEvent } from "@/app/types";

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
    event,
  }: {
    provider: any;
    regStartTime: bigint;
    regEndTime: bigint;
    event: TEvent;
  }) => {
    const initParams: InitializeData = {
      useRegistryAnchor: false,
      metadataRequired: false,
      registrationStartTime: regStartTime,
      registrationEndTime: regEndTime,
    };

    const initStrategyData = await strategy.getInitializeData(initParams);

    // Save metadata to IPFS -> returns a pointer we save on chain for the metadata
    const pinataClient = new PinataClient();

    console.log("Saving metadata to IPFS...", { event });

    const metadata = {
      profileId: commonConfig.ownerProfileId,
      name: event.roundMetadata.name,
      website: event.roundMetadata.support.info,
      description: event.roundMetadata.eligibility.description,
      base64Image: event.roundMetadata.image,
    };

    // NOTE: Use this to pin your base64 image to IPFS
    let imagePointer;
    if (metadata.base64Image && metadata.base64Image.includes("base64")) {
      imagePointer = await pinataClient.pinJSON({
        data: metadata.base64Image,
      });
      metadata.base64Image = imagePointer;
    }

    const pointer = await pinataClient.pinJSON(metadata);
    console.log("Metadata saved to IPFS with pointer: ", pointer);

    // todo: check if the user has a profile and if not create one so they can donate...

    const poolCreationData: CreatePoolArgs = {
      profileId: commonConfig.ownerProfileId, // sender must be a profile member
      strategy: "0x79A5EEc2C87Cd2116195E71af7A38647f89C8Ffa", // approved strategy contract
      initStrategyData: initStrategyData, // unique to the strategy
      token: NATIVE as `0x${string}`, // you need to change this to your token address
      amount: BigInt(0),
      metadata: {
        protocol: BigInt(1),
        pointer: pointer.IPFSHash,
      },
      // todo: setup managers
      managers: [],
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

    // todo: get the pool Id
    const poolId = 0;

    return poolId;
  };

  return { strategy, createPool };
};
