"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhotoIcon from "@heroicons/react/20/solid/PhotoIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { classNames } from "@/utils/common";
// import { Menu, Transition } from "@headlessui/react";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import ArrowUpIcon from "@heroicons/react/24/outline/ArrowUpIcon";
import ArrowDownIcon from "@heroicons/react/24/outline/ArrowDownIcon";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { EStatus } from "../types";
import Tabs from "@/components/Tabs";
import ProfileForm from "@/components/ProfileForm";
import Team from "@/components/Team";

const schema = yup.object({
  roundName: yup.string().required(),
  roundStart: yup.date().required(),
  roundEnd: yup.date().required(),
});

export default function Manage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [activeTab, setActiveTab] = useState("Profile");
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="mt-8">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Profile" && (
        <ProfileForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
      {activeTab === "Events" && <EventList />}
      {activeTab === "Stats" && <Stats />}
      {activeTab === "Team Members" && <Team />}
    </div>
  );
}



const statuses = {
  InProgress: "text-green-700 bg-green-50 ring-green-600/20",
  Completed: "text-blue-700 bg-blue-50 ring-blue-600/20",
  Pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  Rejected: "text-red-800 bg-red-50 ring-red-600/20",
  Canceled: "text-gray-800 bg-gray-50 ring-gray-600/20",
};

// todo: type this as a round
const events = [
  {
    id: 1,
    name: "GraphQL API",
    status: EStatus.Completed,
    createdBy: "Leslie Alexander",
    dueDate: "March 17, 2023",
    dueDateTime: "2023-03-17T00:00Z",
  },
  {
    id: 2,
    name: "New benefits plan",
    status: EStatus.InProgress,
    createdBy: "Leslie Alexander",
    dueDate: "May 5, 2023",
    dueDateTime: "2023-05-05T00:00Z",
  },
  {
    id: 3,
    name: "Onboarding emails",
    status: EStatus.InProgress,
    createdBy: "Courtney Henry",
    dueDate: "May 25, 2023",
    dueDateTime: "2023-05-25T00:00Z",
  },
  {
    id: 4,
    name: "iOS app",
    status: EStatus.Canceled,
    createdBy: "Leonard Krasner",
    dueDate: "June 7, 2023",
    dueDateTime: "2023-06-07T00:00Z",
  },
  {
    id: 5,
    name: "Marketing site redesign",
    status: EStatus.Pending,
    createdBy: "Courtney Henry",
    dueDate: "June 10, 2023",
    dueDateTime: "2023-06-10T00:00Z",
  },
];

// Events are just rounds.
function EventList() {
  return (
    <div className="my-4">
      <div className="flex flex-row justify-between">
        <h3 className="flex text-2xl font-semibold leading-6 text-gray-900">
          Events
        </h3>
        <Link
          href={"/event/new"}
          className="flex ml-auto p-2 rounded-xl border border-gray-200 bg-transparent hover:bg-gray-100"
        >
          <PlusIcon height={24} width={24} className="mr-1" />
          New Event
        </Link>
      </div>
      <ul role="list" className="divide-y divide-gray-100 mt-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
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
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Due on{" "}
                  <time dateTime={event.dueDateTime}>{event.dueDate}</time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {event.createdBy}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                href={`/event/${event.id.toString()}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View event<span className="sr-only">, {event.name}</span>
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
        ))}
      </ul>
    </div>
  );
}

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function Stats() {
  return (
    <div className="mt-2">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
