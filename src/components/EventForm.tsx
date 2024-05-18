"use client";

import { useAllo } from "@/hooks/useAllo";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventForm({
  register,
  handleSubmit,
  errors,
}: {
  register: any;
  handleSubmit: any;
  errors: any;
}) {
  // Privy hooks
  const { ready, authenticated } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  // const wallet = wallets[0]; // Replace this with your desired wallet
  const embeddedWallet =
    walletsReady &&
    wallets.find((wallet) => wallet.walletClientType === "privy");

  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const fetchProvider = async () => {
      if (ready && embeddedWallet && authenticated) {
        const provider = await embeddedWallet.getEthereumProvider();

        console.log("provider ready ser", provider);

        setProvider(provider);
      }
    };

    fetchProvider();
  }, [ready, embeddedWallet, authenticated]);

  if (!ready) {
    console.log("Not ready");
  }

  const { createPool } = useAllo(provider);

  const onSubmit = (data: any) => {
    console.log(data);

    createPool({
      regStartTime: BigInt(Math.floor(new Date().getTime() / 1000) + 300),
      regEndTime: BigInt(Math.floor(new Date().getTime() / 1000) + 10000),
    });
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 mt-2">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Event Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 bg-gray-100 rounded-xl p-2">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

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
                    name="eventName"
                    id="eventName"
                    autoComplete="eventName"
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
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors["email"] && (
                    <p className="text-rose-700 text-sm">
                      * {errors["email"]?.message}
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
                    placeholder="I'm a cool event who likes to host cool people."
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors["about"] && (
                    <p className="text-rose-700 text-sm">
                      * {errors["about"]?.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the event.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <Link
              href="/manage"
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
