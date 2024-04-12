"use client";

import { createContext, useEffect, useState } from "react";
import { TStatus, IDonationContextProps, Donation } from "../app/types";

export const DonationContext = createContext<IDonationContextProps>({
  isLoaded: false,
  donations: [],
  donationStatus: "Pending" as TStatus,
  setDonationStatus: () => {},
});

export const DonationContextProvider = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationStatus, setDonationStatus] = useState<TStatus>(
    "Pending" as TStatus
  );

  useEffect(() => {
    console.log("fetching donations");
    const fetchEvents = async () => {
      // TODO: fetch donations
      // const donations = await getDonations();
      setDonations([]);
      setIsLoaded(true);
    };
    fetchEvents();
  }, []);

  return (
    <DonationContext.Provider
      value={{
        isLoaded,
        donations,
        donationStatus,
        setDonationStatus,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
