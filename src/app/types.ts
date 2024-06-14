import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
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

export type TRole = {
  address: Address;
  projectId: Hex;
  role: string;
};

export type TProfile = {
  id: Hex;
  name: string;
  nonce: number;
  metadata: {
    name: string;
    type: string;
  };
  metadataCid: string;
  owner: Address;
  anchorAddress: Address;
  applications: any[];
  roles: TRole[];
  creator: Address;
  createdAt: string;
  projectNumber: number | null;
  projectType: string; // "CANONICAL"
  registryAddress: Address;
  tags: string[];
};

export type TProfilesByOwnerResponse = TProfile[] & {
  // overrides...
};

export type TProfileResponse = TProfile & {
  // overrides...
};

export type FetchProfilesResponse = {
  projects: TProfile[];
};

export type TEventMetadata = {
  profileId: Hex;
  name: string;
  website: string;
  description: string;
  base64Image?: string;
};

// round metadata example ^^^ fix above
// {
//   "name": "Jax v2 Test Round 1",
//   "support": {
//       "info": "your.email+fakedata98557@gmail.com",
//       "type": "Email"
//   },
//   "roundType": "private",
//   "eligibility": {
//       "description": "Possimus architecto quasi sapiente. Numquam doloremque modi rem eaque quam inventore doloribus. Dolorem amet quos minima voluptate.\nVoluptatum laborum assumenda dignissimos ab. Totam dolorum vitae totam ex tempore voluptas. Itaque delectus itaque doloremque quidem quibusdam repellat.\nPlaceat nam error. Laborum eligendi aliquid culpa beatae vel inventore. Quis impedit esse nihil quod ducimus adipisci molestias culpa.",
//       "requirements": [
//           {
//               "requirement": "Recusandae omnis inventore mollitia ex."
//           }
//       ]
//   },
//   "feesAddress": "",
//   "feesPercentage": 0,
//   "programContractAddress": "0x11e116d66f8cabbd96bcf2b025095a491939684d2863c3e2af7a44df39e7bd4c"
// }

export type TCandidate = {
  id: number;
  recipientId: Address;
  name: string;
  imageUrl?: StaticImageData;
  donations?: TDonation[];
  totalDonations?: bigint;
  anchorAddress?: Address;
  status: TStatus;
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

export type TEvent = {
  id: string; // roundId
  chainId: number;
  strategyName: string;
  strategyAddress: Address;
  applicationsStartTime: string;
  applicationsEndTime: string;
  donationsStartTime: string;
  donationsEndTime: string;
  matchAmount?: bigint;
  matchAmountInUsd?: bigint;
  roles: TRole[];
  roundMetadata: {
    name: string;
    image?: string;
    support: {
      info: string;
      type: string;
    };
    roundType: string;
    eligibility: {
      description: string;
      requirements?: [
        {
          requirement: string;
        }
      ];
    };
    feesAddress?: Address;
    feesPercentage?: number;
    programContractAddress?: Address;
    quadraticFundingConfig?: {
      matchingCap: boolean;
      sybilDefense: boolean;
      minDonationThreshold: boolean;
      matchingFundsAvailable: bigint;
    };
  };
  applicationMetadata?: {
    version: string;
    lastUpdatedOn: number;
    applicationSchema: {
      questions: [
        {
          id: number;
          info: string;
          type: string;
          title: string;
          hidden: boolean;
          required: boolean;
          encrypted: boolean;
        }
      ];
      requirements?: {
        github: {
          required: boolean;
          verification: boolean;
        };
        twitter: {
          required: boolean;
          verification: boolean;
        };
      };
    };
  };
  applications: {
    projectId: Hex;
    metadata: any;
    anchorAddress: Address;
  }[];
  tags: string[];
};

export type TEventWithCandidates = TEvent & {
  candidates: TCandidate[];
};

export type TCreatePoolData = {
  provider: any;
  regStartTime: bigint;
  regEndTime: bigint;
  event: TEvent;
};
export interface IEventContextProps {
  isLoaded: boolean;
  events: TEventWithCandidates[];
  setEvents: Dispatch<SetStateAction<TEventWithCandidates[]>>;
  createPool: (data: TCreatePoolData) => number;
  userEvents: TEventWithCandidates[];
}

export type Config = {
  jwt: string;
  readGateway: string;
  writeGateway: string;
};
