"use client";

import { IEventContextProps, TEvent } from "@/app/types";
import { createContext, useEffect, useState } from "react";
import fetch from "graphql-request";
import {
  getEventsByChainId,
  getEventsByChainIdAndRoundId,
} from "@/utils/queries";
import { useAllo } from "@/hooks/useAllo";

export const EventContext = createContext<IEventContextProps>({
  isLoaded: false,
  events: [],
  setEvents: () => {},
  createPool: () => {},
});

export const EventContextProvider = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [events, setEvents] = useState<TEvent[]>([]);
  
  const { createPool } = useAllo();

  useEffect(() => {
    console.log("fetching events...");

    const fetchEvents = async () => {
      const response = await fetch<any>({
        url: "https://indexer-v2.fly.dev/graphql",
        document: getEventsByChainId,
        variables: {
          chainId: 8453,
        },
      });

      console.log("response from event context biatch", response);

      setEvents([...events, ...response.rounds]);
      setIsLoaded(true);
    };

    fetchEvents();
  }, []);



  return (
    <EventContext.Provider
      value={{
        isLoaded: isLoaded,
        events: events,
        setEvents: setEvents,
        createPool,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
