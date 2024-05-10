"use client";

import { Fragment, useState } from "react";
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames, statuses } from "@/utils/common";
import Image from "next/image";
import { EStatus } from "@/app/types";
import { Calendar } from "@nextui-org/calendar";
import { parseDate } from "@internationalized/date";
import Link from "next/link";

const events = [
  {
    id: 5,
    name: "Marketing site redesign",
    status: EStatus.Pending,
    createdBy: "Courtney Henry",
    dueDate: "June 10, 2023",
    dueDateTime: "2023-06-10T00:00Z",
  },
];

export default function EventCalendar() {
  const [value, setValue] = useState(parseDate("2024-05-10"));

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold leading-6 text-gray-900">
        Upcoming Events
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {events.map((event) => (
            <li
              key={event.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <Image
                src={
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt=""
                className="h-14 w-14 flex-none rounded-full"
                width={56}
                height={56}
              />
              <div className="flex-auto">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {event.name}
                  </p>
                  <p
                    className={classNames(
                      statuses[event.status as keyof typeof statuses],
                      "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {EStatus[event.status]}
                  </p>
                </div>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={event.dueDate}>
                        {event.dueDate} at {event.dueDateTime}
                      </time>
                    </dd>
                  </div>
                </dl>
              </div>
              <Menu
                as="div"
                className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
              >
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ol>
        <div className="lg:col-span-5 xl:col-span-4">
          <Calendar
            className="mt-4 lg:col-span-5 xl:col-span-4"
            aria-label="Date (Controlled)"
            value={value}
            onChange={setValue}
          />
          <Link
            href={"/event/new"}
            className="flex justify-center p-2 shadow-xl lg:col-span-5 xl:col-span-4 rounded-xl border text-white border-gray-200 bg-blue-500 hover:bg-blue-700"
          >
            <PlusIcon height={24} width={24} className="mr-1" />
            <span className="mt-[1px] mr-2">New Event</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
