"use server";

import { TProfileResponse, TProfilesByOwnerResponse } from "@/app/types";
import request, { GraphQLClient } from "graphql-request";
import { getProfile, graphqlEndpoint } from "../utils/query";
import { getProfilesByOwnerQuery } from "@/utils/queries";

// mocked for now
const profiles: TProfilesByOwnerResponse[] = [
  {
    profileId:
      "0x1cfa52382f1f47f7e3fd3cd78303d0eb0ae23bff73b11513706563c3cc4b85cd",
    name: "Jaxoder",
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: "2021-06-01T00:00:00Z",
    anchor: "0x6509aca95f0d798b5fcb24f1c78fa2cffa3fea43",
    role: "ADMIN",
  },
  {
    profileId:
      "0x1cfa52382f1f47f7e3fd3cd78303d0eb0ae23bff73b11513706563c3cc4b85cd",
    name: "Jane Cooper",
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: "2021-06-01T00:00:00Z",
    anchor: "0x6509aca95f0d798b5fcb24f1c78fa2cffa3fea43",
    role: "MANAGER",
  },
];

export const getProfilesByOwner = async ({
  chainId,
  account,
}: {
  chainId: string;
  account: string;
}): Promise<TProfilesByOwnerResponse[]> => {
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer YOUR_ACCESS_TOKEN`,
    // Include additional headers as needed
  };

  const client = new GraphQLClient(graphqlEndpoint, { headers });
  const variables = {
    userAddress: account,
  };

  try {
    // fixme: not sure why this is failing?
    // const response = await client.request<{
    //   profilesByOwner: TProfilesByOwnerResponse[];
    // }>(getProfilesByOwnerQuery, variables);

    // console.log("Profiles by owner:", response.profilesByOwner);

    // return response.profilesByOwner;

    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    // Handle errors as appropriate for your application context
    throw error; // Re-throw or handle differently based on your error strategy
  }
};

export const getProfileById = async ({
  chainId,
  profileId,
}: {
  chainId: string;
  profileId: string;
}): Promise<TProfileResponse> => {
  const response: {
    profile: TProfileResponse;
  } = await request(graphqlEndpoint, getProfile, {
    chainId: chainId,
    profileId: profileId,
  });

  return response.profile;
};
