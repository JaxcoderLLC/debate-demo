import { StaticImageData } from "next/image";
import { Address, Hex } from "viem";

export enum EStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Canceled = "Canceled",
  Completed = "Completed",
}

export type TStatus =
  | EStatus.Pending
  | EStatus.InProgress
  | EStatus.Canceled
  | EStatus.Completed;

export interface IDonationStatus {
  [EStatus.Pending]: string;
  [EStatus.InProgress]: string;
  [EStatus.Completed]: string;
  [EStatus.Canceled]: string;
}

export type TProfilesByOwnerResponse = {
  profileId: Hex;
  name: string;
  owner: string;
  createdAt: string;
  anchor: Address;
  role: string;
};

export type TProfileResponse = {
  profileId: Hex;
  nonce: number;
  name: string;
  metadataPointer: string;
  owner: Address;
  anchor: Address;
  creator: Address;
  createdAt: string;
};

export type TPoolMetadata = {
  profileId: Hex;
  name: string;
  website: string;
  description: string;
  base64Image?: string;
};

export type TApplicationMetadata = {
  name: string;
  website: string;
  description: string;
  email: string;
  base64Image: string;
};

export type TNewApplication = TApplicationMetadata & {
  requestedAmount: bigint;
  recipientAddress: `0x${string}`;
  profileId?: `0x${string}`;
  profileName?: string;
};

export type TCandidate = {
  id: number;
  recipientId: Address;
  name: string;
  imageUrl?: StaticImageData;
  donations?: TDonation[];
  totalDonations?: bigint;
};

export type TDonation = {
  id: string;
  amount: bigint;
  sender: Address;
  status: TStatus;
};

export type IDonationContextProps = {
  isLoaded: boolean;
  candidates: TCandidate[];
  setCandidates: (candidates: TCandidate[]) => void;
};

export type TSetAllocatorData = {
  allocatorAddress: `0x${string}`;
  flag: boolean;
};

export type TAllocatedData = {
  recipientId: Address;
  recipientAddress: Address;
  sender: Address;
  contractAddress: Address;
  contractName: string;
  chainId: string;
  blockTimestamp: string;
  status: string;
  transactionHash: string;
};

export type TToastNotification = {
  show: boolean;
  args: any[];
};

export type TAbiComponent = {
  name: string;
  type: string;
  internalType?: string;
  components?: Array<TAbiComponent>;
};

export type TAbiItem = {
  type: string; // 'function', 'event', 'constructor', etc.
  name?: string; // Function or event name
  anonymous?: boolean; // true if the function is anonymous
  inputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
    indexed?: boolean;
    components?: Array<TAbiComponent>;
  }>; // Function or event parameters
  outputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
    components?: Array<{
      internalType?: string;
      name?: string;
      type?: string;
      components?: Array<{
        internalType?: string;
        name?: string;
        type?: string;
      }>;
    }>;
  }>; // Function outputs
  stateMutability?: "pure" | "view" | "nonpayable" | "payable"; // Function state mutability
};

export type TContractAbi = Array<TAbiItem>;

export type TModalPlacement =
  | "center"
  | "auto"
  | "top"
  | "top-center"
  | "bottom"
  | "bottom-center";
