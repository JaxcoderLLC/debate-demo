import { gql } from "graphql-request";

export const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://grants-stack-indexer-v2.gitcoin.co/graphiql";

export const checkIfRecipientIsIndexedQuery = gql`
  query checkIfRecipientIsIndexedQuery(
    $chainId: String!
    $poolId: String!
    $recipientId: String!
  ) {
    microGrantRecipient(
      chainId: $chainId
      poolId: $poolId
      recipientId: $recipientId
    ) {
      recipientId
    }
  }
`;

export const checkIfPoolIsIndexedQuery = gql`
  query checkIfPoolIsIndexedQuery($chainId: String!, $poolId: String!) {
    microGrant(chainId: $chainId, poolId: $poolId) {
      poolId
    }
  }
`;

export const getMicroGrantsQuery = gql`
  {
    microGrants(orderBy: BLOCK_TIMESTAMP_DESC) {
      poolId
      chainId
      strategy
      allocationStartTime
      allocationEndTime
      approvalThreshold
      maxRequestedAmount
      blockTimestamp
      pool {
        strategy
        strategyName
        tokenMetadata
        token
        amount
        metadataPointer
        profile {
          profileId
          name
        }
      }
    }
  }
`;

export const getMicroGrantQuery = gql`
  query getMicroGrantQuery($chainId: String!, $poolId: String!) {
    microGrant(chainId: $chainId, poolId: $poolId) {
      poolId
      chainId
      strategy
      allocationStartTime
      allocationEndTime
      approvalThreshold
      maxRequestedAmount
      blockTimestamp
      pool {
        tokenMetadata
        token
        amount
      }
    }
  }
`;

export const getMicroGrantsRecipientsQuery = gql`
  query getMicroGrantsRecipientsQuery($chainId: String!, $poolId: String!) {
    microGrant(chainId: $chainId, poolId: $poolId) {
      poolId
      chainId
      strategy
      allocationStartTime
      allocationEndTime
      approvalThreshold
      maxRequestedAmount
      blockTimestamp
      useRegistryAnchor
      pool {
        strategy
        strategyName
        tokenMetadata
        token
        amount
        metadataPointer
        profile {
          profileId
          name
        }
      }
      allocateds {
        recipientId
        sender
        contractAddress
        contractName
        chainId
        status
        blockTimestamp
        transactionHash
      }
      distributeds {
        recipientId
        recipientAddress
        amount
        sender
        contractName
        contractAddress
        transactionHash
        blockNumber
        blockTimestamp
        chainId
      }
      microGrantRecipients {
        recipientId
        recipientAddress
        requestedAmount
        metadataPointer
        blockTimestamp
        isUsingRegistryAnchor
        status
      }
    }
  }
`;

export const getMicroGrantRecipientQuery = gql`
  query getMicroGrantRecipientQuery(
    $chainId: String!
    $poolId: String!
    $recipientId: String!
  ) {
    microGrantRecipient(
      chainId: $chainId
      poolId: $poolId
      recipientId: $recipientId
    ) {
      microGrant {
        poolId
        chainId
        allocationStartTime
        allocationEndTime
        maxRequestedAmount
        blockTimestamp
        pool {
          strategy
          tokenMetadata
          token
          amount
        }
        allocateds {
          recipientId
          sender
          contractAddress
          contractName
          chainId
          status
          blockTimestamp
          transactionHash
        }
        distributeds {
          recipientId
          recipientAddress
          amount
          sender
          contractName
          contractAddress
          transactionHash
          blockTimestamp
          chainId
        }
      }
      sender
      recipientId
      recipientAddress
      requestedAmount
      metadataPointer
      blockTimestamp
      isUsingRegistryAnchor
      status
    }
  }
`;

// export const getProfilesByOwnerQuery = gql`
//   query getProfilesByOwnerQuery($chainId: String!, $owner: String!) {
//     profilesByOwner(chainId: $chainId, owner: $owner) {
//       profileId
//       name
//       owner
//       createdAt
//       anchor
//     }
//   }
// `;

export const getProfile = gql`
  query getProfile($chainId: String!, $profileId: String!) {
    profile(chainId: $chainId, profileId: $profileId) {
      profileId
      nonce
      name
      metadataPointer
      owner
      anchor
      creator
      createdAt
    }
  }
`;
