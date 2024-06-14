"use client";

import { useContext } from "react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { EventContext } from "@/context/EventContext";

export default function Events() {
  const { events } = useContext(EventContext);

  return (
    <div className="w-full">
      <EventCalendar events={events} />
      <EventList events={events} />
    </div>
  );
}
