import { TEvent } from "@/app/types";
import { DatePicker, TimeInput } from "@nextui-org/react";
import Link from "next/link";
import { parseAbsoluteToLocal } from "@internationalized/date";
import moment, { now } from "moment";

// Events are just rounds.
export default function EventList(props: { events: TEvent[] }) {
  console.log("events from EventList component", props.events);

  const isAfterEventEndDate = (event: TEvent) => {
    return (
      now() >
      moment.parseZone(event.applicationsEndTime ?? new Date()).valueOf()
    );
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold leading-6 text-gray-900 my-8">
        Ongoing Events
      </h2>
      <ul role="list" className="divide-y divide-gray-100 mt-2">
        {props.events.map(
          (event) =>
            !isAfterEventEndDate(event) && (
              <li
                key={event.id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                      {event.roundMetadata?.name ?? "Anonymous"}
                    </span>
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
                  {/* <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Edit<span className="sr-only">, {event.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Archive<span className="sr-only">, {event.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
