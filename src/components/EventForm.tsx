"use client";

import { TEventWithCandidates } from "@/app/types";
import { EventContext } from "@/context/EventContext";
import { EIP1193Provider, usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Address } from "viem";

export default function EventForm({
  register,
  handleSubmit,
  errors,
  editMode,
  setEditMode,
  event,
}: {
  register: any;
  handleSubmit: any;
  errors: any;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  event?: TEventWithCandidates;
}) {
  const { createPool } = useContext(EventContext);
  // Privy hooks
  const { ready, authenticated, user } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  const wallet = wallets[0];
  const [provider, setProvider] = useState<EIP1193Provider>();
  const [isAdmin, setIsAdmin] = useState(true);

  if (!ready) {
    console.log("Not ready");
  }

  useEffect(() => {
    // check if admin
  }, [event]);

  console.log("Event", event);

  // const adminAddress: Address = event?.roles?.filter(
  //   (role) => role.role === "ADMIN"
  // )[0].address;

  const onUpdate = async (data: any) => {
    console.log("data", data);
  };

  useEffect(() => {
    const fetchProvider = async () => {
      if (ready && wallet && authenticated) {
        const provider = await wallet.getEthereumProvider();

        console.log("provider ready ser", provider);

        setProvider(provider);
      }
    };

    fetchProvider();
  }, [ready, wallet, authenticated]);

  const onSubmit = (data: any) => {
    console.log(data);

    createPool({
      provider,
      regStartTime: BigInt(Math.floor(new Date().getTime() / 1000) + 10000),
      regEndTime: BigInt(Math.floor(new Date().getTime() / 1000) + 50000),
    });
  };

  if (event) {
    return (
      <div className="space-y-10 divide-y divide-gray-900/10 mt-2">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-1">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 bg-gray-100 rounded-xl p-2">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          {!editMode && (
            <div>
              <button
                className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-teal-500 hover:bg-teal-700"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                Edit
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="eventName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("eventName")}
                      type="text"
                      disabled={!editMode}
                      name="eventName"
                      id="eventName"
                      autoComplete="eventName"
                      defaultValue={event.roundMetadata.name ?? "todo"}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors["eventName"] && (
                      <p className="text-rose-700 text-sm">
                        * {errors["eventName"]?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="support"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Support
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("support")}
                      id="support"
                      name="support"
                      type="support"
                      disabled={!editMode}
                      autoComplete="support"
                      defaultValue={"todo"}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors["support"] && (
                      <p className="text-rose-700 text-sm">
                        * {errors["support"]?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("about")}
                      id="about"
                      name="about"
                      disabled={!editMode}
                      placeholder="I'm a cool event who likes to host cool people."
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={
                        event.roundMetadata?.eligibility?.description ?? "todo"
                      }
                    />
                    {errors["about"] && (
                      <p className="text-rose-700 text-sm">
                        * {errors["about"]?.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {editMode && "Write a few sentences about the event."}
                  </p>
                </div>
              </div>
            </div>
            {editMode && (
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  className="p-2 w-36 text-center border rounded-lg text-sm text-white bg-pink-500 hover:bg-pink-700"
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                >
                  Cancel
                </button>
                {editMode ? (
                  <button
                    onClick={() => {
                      // update event/round
                      onUpdate({});

                      setEditMode(!editMode);
                    }}
                    className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-teal-500 hover:bg-teal-700"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="p-2 w-36 border rounded-lg text-sm text-white bg-teal-500 hover:bg-teal-700"
                  >
                    Save
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return <div>No Event Found</div>;
}
