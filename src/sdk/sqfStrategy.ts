export type Metadata = {
    protocol: bigint;
    pointer: string;
};

export declare enum Status {
  None = 0,
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  Appealed = 4,
  InReview = 5,
  Canceled = 6,
}

export type Recipient = {
  useRegistryAnchor: boolean;
  recipientAddress: string;
  requestedAmount: string;
  recipientStatus: Status;
  metadata: Metadata;
};


