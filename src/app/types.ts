export enum EStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Canceled = "Canceled",
  Rejected = "Rejected",
  Completed = "Completed",
}

export type TStatus =
  | EStatus.Pending
  | EStatus.InProgress
  | EStatus.Canceled
  | EStatus.Rejected
  | EStatus.Completed;

export interface IDonationStatus {
  [EStatus.Pending]: string;
  [EStatus.InProgress]: string;
  [EStatus.Completed]: string;
  [EStatus.Canceled]: string;
  [EStatus.Rejected]: string;
}

export type TProfilesByOwnerResponse = {
  profileId: `0x${string}`;
  name: string;
  owner: string;
  createdAt: string;
  anchor: `0x${string}`;
};

export type TProfileResponse = {
  profileId: `0x${string}`;
  nonce: number;
  name: string;
  metadataPointer: string;
  owner: `0x${string}`;
  anchor: `0x${string}`;
  creator: `0x${string}`;
  createdAt: string;
};

export type Donation = {
  id: string;
  amount: number;
  owner: string;
  status: TStatus;
};

export type IDonationContextProps = {
  isLoaded: boolean;
  donations: Donation[];
  donationStatus: TStatus;
  setDonationStatus: (status: TStatus) => void;
};

export type TSetAllocatorData = {
  allocatorAddress: `0x${string}`;
  flag: boolean;
};

export type TAllocatedData = {
  recipientId: `0x${string}`;
  recipientAddress: `0x${string}`;
  sender: `0x${string}`;
  contractAddress: `0x${string}`;
  contractName: string;
  chainId: string;
  blockTimestamp: string;
  status: string;
  transactionHash: string;
};