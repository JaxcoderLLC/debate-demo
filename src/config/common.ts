import { TNewApplication, TPoolMetadata } from "@/app/types";
import dotenv from "dotenv";
import { Address, Hex } from "viem";
import { optimismSepolia } from "viem/chains";
dotenv.config();

type CommonConfig = {
  chainId: number;
  poolId: number;
  nonce: number;
  rpc: string;
  ownerProfileId: Hex;
  ownerAddress: Address;
  anchorAddress: Address;
  managers: Address[];
  application: TNewApplication;
  recipientId: Address;
  metadata: {
    protocol: bigint;
    pointer: string;
  };
  members: Address[];
  pool: TPoolMetadata;
};

// NOTE: Update this with your own base64 image
export const base64Image = ``;

export const commonConfig: CommonConfig = {
  chainId: optimismSepolia.id,
  poolId: 0,
  nonce: Math.floor(Math.random() * 10000),
  rpc: process.env.NEXT_PUBLIC_RPC_URL as string, // arbitrum-sepolia
  ownerProfileId:
    "0xbd01541de456ae5fc87d555d738da6a83bfbb0ef98c5cfebcaebdff94f1948f4",
  ownerAddress: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
  anchorAddress: "0x6509aca95f0d798b5fcb24f1c78fa2cffa3fea43",
  managers: [],
  application: {
    requestedAmount: BigInt(0),
    recipientAddress: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
    profileId:
      "0xbd01541de456ae5fc87d555d738da6a83bfbb0ef98c5cfebcaebdff94f1948f4",
    name: "Test Application",
    website: "https://docs.allo.gitcoin.co",
    profileName: "Jax Test",
    email: "test@gitcoin.co",
    description: "This is a test application",
    base64Image: base64Image,
  },
  metadata: {
    protocol: BigInt(1), // NOTE: This is the pointer to the metadata on IPFS
    pointer: "bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi",
  },
  recipientId: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
  members: [],
  pool: {
    profileId: "0x",
    name: "Test Debate Pool",
    description: "A pool for debate demo",
    website: "https://allo.gitcoin.co",
    base64Image: base64Image,
  },
};
