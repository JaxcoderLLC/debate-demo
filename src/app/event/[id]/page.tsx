"use client";

import { TEventWithCandidates } from "@/app/types";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  XMarkIcon,
  ClipboardDocumentIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Address } from "viem";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function EventDetail({ params }: { params: { id: string } }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("params", params);

  const { id } = params;
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState<TEventWithCandidates>(
    {} as TEventWithCandidates
  );
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchEvent = async (roundId: string) => {
      const event = events.find((event) => event.id === roundId);

      console.log("Event fetched", event);

      setEvent(event as TEventWithCandidates);
    };

    fetchEvent(id);
  }, [id, events]);

  const adminAddress: Address = event?.roles?.filter(
    (role) => role.role === "ADMIN"
  )[0].address;

  const onUpdate = async (data: any) => {
    console.log("data", data);

    // update event/round
  };

  return (
    <>
      {event && event.roundMetadata ? (
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="flex flex-row justify-between px-4 sm:px-0">
            <div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Event Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Event details and information.
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              {isAdmin && !editMode && (
                <button
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                  className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-teal-500 hover:bg-teal-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Event name
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editMode ? (
                    <input
                      {...register("eventName")}
                      type="text"
                      name="eventName"
                      id="eventName"
                      autoComplete="eventName"
                      defaultValue={event.roundMetadata?.name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <span className="flex-grow">
                      {event.roundMetadata?.name}
                    </span>
                  )}
                  {errors["eventName"] && (
                    <p className="text-pink-700 text-sm">
                      * {errors["eventName"]?.message as string}
                    </p>
                  )}
                </dd>
              </div>{" "}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editMode ? (
                    <textarea
                      {...register("about")}
                      id="about"
                      name="about"
                      placeholder="I'm a cool event who likes to host cool people."
                      rows={3}
                      defaultValue={
                        event.roundMetadata?.eligibility?.description
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <span className="flex-grow">
                      {event.roundMetadata?.eligibility?.description}
                    </span>
                  )}
                  {errors["about"] && (
                    <p className="text-pink-700 text-sm">
                      * {errors["about"]?.message as string}
                    </p>
                  )}{" "}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Admin address
                </dt>
                <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="mr-2">{adminAddress}</span>
                  <ClipboardDocumentIcon
                    className="hover:cursor-pointer"
                    height={16}
                    width={16}
                    onClick={() => {
                      navigator.clipboard.writeText(adminAddress);
                    }}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Candidates
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {event.candidates ? (
                      event.candidates?.map((candidate) => (
                        <li
                          key={event.id}
                          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <UserCircleIcon
                              className="h-5 w-5 flex-shrink-0 text-yellow-300"
                              aria-hidden="true"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                {event.candidates?.at(0)?.recipientId ??
                                  "Anonymous"}
                              </span>
                            </div>
                          </div>
                          {editMode && (
                            <div className="ml-4 flex flex-shrink-0 space-x-4">
                              <button
                                type="button"
                                className="rounded-md bg-white font-medium text-pink-500 hover:text-pink-800"
                              >
                                <XMarkIcon
                                  className="text-pink-500 border border-pink-500 rounded-full font-bold hover:text-pink-800 hover:cursor-pointer"
                                  height={16}
                                  width={16}
                                />
                              </button>
                              <span
                                className="text-gray-200"
                                aria-hidden="true"
                              >
                                |
                              </span>
                              <button
                                type="button"
                                className="text-sm text-teal-600"
                                onClick={(data) => {
                                  console.log("Add candidate", data);
                                }}
                              >
                                <PlusIcon
                                  className="text-teal-500 border border-teal-500 rounded-full font-bold hover:text-teal-800 hover:cursor-pointer"
                                  height={16}
                                  width={16}
                                />
                              </button>
                            </div>
                          )}
                        </li>
                      ))
                    ) : (
                      <div className="flex flex-row justify-between mx-2 p-2">
                        <span>No Candidates</span>
                        {editMode && (
                          <div className="ml-4 flex flex-shrink-0 space-x-4">
                            <button
                              type="button"
                              className="text-sm text-teal-600"
                              onClick={(data) => {
                                console.log("Add candidate", data);

                                // open modal to add a candidate
                              }}
                            >
                              <PlusIcon
                                className="text-teal-500 border border-teal-500 rounded-full font-bold hover:text-teal-800 hover:cursor-pointer"
                                height={16}
                                width={16}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          {isAdmin && editMode && (
            <div className="flex flex-row justify-end items-center">
              <button
                onClick={() => {
                  setEditMode(!editMode);
                }}
                className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-pink-500 hover:bg-pink-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // update event/round
                }}
                className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-teal-500 hover:bg-teal-700"
              >
                Update
              </button>
            </div>
          )}
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <Card className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
