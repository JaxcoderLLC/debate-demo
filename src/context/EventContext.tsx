"use client";

import { IEventContextProps, TEventWithCandidates } from "@/app/types";
import { createContext, useEffect, useState } from "react";
import fetch from "graphql-request";
import {
  getEventsByChainId,
  getProjectsAndRolesByAddress,
} from "@/utils/queries";
import { useAllo } from "@/hooks/useAllo";

export const EventContext = createContext<IEventContextProps>({
  isLoaded: false,
  events: [],
  setEvents: () => {},
  createPool: () => 0,
  userEvents: [],
});

export const EventContextProvider = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [events, setEvents] = useState<TEventWithCandidates[]>([]);
  const [userEvents, setUserEvents] = useState<TEventWithCandidates[]>([]);
  const { createPool } = useAllo();

  useEffect(() => {
    console.log("fetching events...");

    const fetchEvents = async () => {
      try {
        const response = await fetch<any>({
          url: "https://indexer-v2.fly.dev/graphql",
          document: getEventsByChainId,
          variables: {
            chainId: 8453,
          },
        });

        console.log("response from event context", response);

        setEvents(response.rounds);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    // fixme: fetch user events is not returning anything/update query
    const fetchUserEvents = async () => {
      try {
        const response = await fetch<any>({
          url: "https://indexer-v2.fly.dev/graphql",
          document: getProjectsAndRolesByAddress,
          variables: {
            address: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA".toLowerCase(), // replace with the actual address you are querying for
            chainIds: [8453],
          },
        });

        console.log("response from user events context", response);

        setUserEvents(response.userEvents); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchEvents();
    fetchUserEvents();
  }, []); // No need to include events in the dependency array as we are not using it inside the effect

  return (
    <EventContext.Provider
      value={{
        isLoaded,
        events,
        setEvents,
        createPool,
        userEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
