"use client";

import { FetchProfilesResponse, TProfile } from "@/app/types";
import { createContext, useEffect, useState } from "react";
import fetch from "graphql-request";
import { getProfilesByOwnerQuery } from "@/utils/queries";

export const ProfileContext = createContext<{
  isLoaded: boolean;
  profiles: TProfile[];
  setProfiles: (profiles: TProfile[]) => void;
}>({
  isLoaded: false,
  profiles: [],
  setProfiles: () => {},
});

export const ProfileContextProvider = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [profiles, setProfiles] = useState<TProfile[]>([]);

  useEffect(() => {
    console.log("fetching profiles...");
    const fetchProfiles = async () => {
      // todo: get the user address from the wallet
      const userAddress =
        "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA".toLowerCase();
      // call graphql endpoint to fetch profiles
      const response = await fetch<FetchProfilesResponse>({
        url: "https://indexer-v2.fly.dev/graphql",
        document: getProfilesByOwnerQuery,
        variables: {
          userAddress,
          chainId: 8453,
        },
      });

      console.log("response shit", response);

      setProfiles(response.projects);
      setIsLoaded(true);
    };

    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        isLoaded,
        profiles,
        setProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
