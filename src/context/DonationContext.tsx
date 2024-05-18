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
    // todo: fetch candidates from the blockchain / they are known as profiles
    const fetchCandidates = async () => {
      // note: hardcoded candidates for now
      setCandidates([
        {
          id: 1,
          recipientId: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
          name: "Josh Levitt",
          imageUrl: undefined,
          totalDonations: BigInt(0),
        },
        {
          id: 2,
          recipientId: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
          name: "Richard McArthur",
          imageUrl: undefined,
          totalDonations: BigInt(0),
        },
        {
          id: 3,
          recipientId: "0x3f15B8c6F9939879Cb030D6dd935348E57109637",
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
