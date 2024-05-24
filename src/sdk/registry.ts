import { RegistryABI } from "../app/abi/Registry";
import { commonConfig } from "@/config/common";
import { privyConfig, wagmiConfig } from "@/services/wagmi";
import { getEventValues } from "@/utils/common";
import { Registry } from "@allo-team/allo-v2-sdk";
import { TransactionData } from "@allo-team/allo-v2-sdk/dist/Common/types";
import { CreateProfileArgs } from "@allo-team/allo-v2-sdk/dist/Registry/types";
import { Address } from "viem";

// create a registry instance
// todo: snippet => createRegistryInstance
export const registry = new Registry({
  chain: commonConfig.chainId,
  rpc: commonConfig.rpc,
});

// NOTE: Update this function to use your own data.
export const createProfile = async (props: {provider: any, name: string, owner: Address }) => {
  
  // prepare the arguments -> type comes from the SDK
  const createProfileArgs: CreateProfileArgs = {
    nonce: BigInt(commonConfig.nonce),
    name: props.name,
    metadata: commonConfig.metadata,
    owner: props.owner,
    members: commonConfig.members,
  };

  console.log("Creating profile with args: ", createProfileArgs);

  // create the transaction with the arguments -> type comes from SDK
  // todo: snippet => createProfileTx
  const txData: TransactionData = await registry.createProfile(
    createProfileArgs
  );

  const transactionRequest = {
    to: txData.to,
    data: txData.data,
    value: BigInt(txData.value), // Only necessary for payable methods
  };
  const transactionHash = await props.provider.request({
    method: 'eth_sendTransaction',
    params: [transactionRequest],
  });

  // const profileId =
  //   getEventValues(transactionHash, RegistryABI, "ProfileCreated").profileId || "0x";

  // if (profileId === "0x") {
  //   throw new Error("Profile creation failed");
  // }

  return "0x"; // profileId;
};
