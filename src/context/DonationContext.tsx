"use client";

import { createContext, useEffect, useState } from "react";
import { IDonationContextProps, TCandidate } from "../app/types";

export const DonationContext = createContext<IDonationContextProps>({
  isLoaded: false,
  candidates: [],
  setCandidates: () => {},
});

export const DonationContextProvider = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [candidates, setCandidates] = useState<TCandidate[]>([]);

  useEffect(() => {
    console.log("fetching candidates...");
    const fetchCandidates = async () => {
      // note: hardcoded candidates for now
      setCandidates([
        {
          id: 1,
          recipientId: "0x8C180840fcBb90CE8464B4eCd12ab0f840c6647C",
          name: "Josh Levitt",
          imageUrl: undefined,
          totalDonations: BigInt(0),
        },
        {
          id: 2,
          recipientId: "0x8C180840fcBb90CE8464B4eCd12ab0f840c6647C",
          name: "Richard McArthur",
          imageUrl: undefined,
          totalDonations: BigInt(0),
        },
        {
          id: 3,
          recipientId: "0x8C180840fcBb90CE8464B4eCd12ab0f840c6647C",
          name: "John Steinck",
          imageUrl: undefined,
          totalDonations: BigInt(0),
        },
      ]);
      setIsLoaded(true);
    };
    fetchCandidates();
  }, []);

  return (
    <DonationContext.Provider
      value={{
        isLoaded,
        candidates,
        setCandidates,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
