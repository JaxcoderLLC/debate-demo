import { Badge, DatePicker, Menu } from "@nextui-org/react";
import Link from "next/link";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { EventContext } from "@/context/EventContext";
import { Fragment, useContext } from "react";
import { classNames } from "@/utils/common";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

// Events are just rounds.
export default function MyEvents() {
  const { events } = useContext(EventContext);
  console.log("events from MyEvents component", events);

  // filter if user has a role in the event
  const filteredEvents = events.filter(
    (event) =>
      event.roles &&
      event.roles.some(
        (role) =>
          role.address ===
          "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA".toLowerCase()
      )
  );

  console.log("filtered events", filteredEvents);

  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold leading-6 text-gray-900 my-8">
        My Events
      </h2>
      <ul role="list" className="divide-y divide-gray-100 mt-2">
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-x-3">
                <span className="text-sm font-semibold leading-6 text-gray-900">
                  {event.roundMetadata?.name ?? "Anonymous"}
                </span>
                <div>
                  <span className="text-sm">Role:</span>
                  <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {event.roles.at(0)?.role}
                  </span>
                </div>
                {/* <p
                  className={classNames(
                    statuses[event.status as keyof typeof statuses],
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {EStatus[event.status]}
                </p> */}
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                Start
                <div className="whitespace-nowrap">
                  <DatePicker
                    aria-label="Start date"
                    className="max-w-md"
                    granularity="minute"
                    variant="bordered"
                    hideTimeZone={false}
                    isReadOnly={true}
                    defaultValue={parseAbsoluteToLocal(
                      event.applicationsStartTime ?? new Date()
                    )}
                  />
                </div>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                {/* todo: we don't have the creator yet */}
                {/* <p className="truncate">Created by {event.???}</p> */}
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                href={`/event/${event.id.toString()}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View event
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
