"use client";

import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/IV_Logo_1.png";
import ToastNotification from "./ToastNotification";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { injected } from "wagmi/connectors";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
import { base, baseSepolia } from "wagmi/chains";
import { wagmiConfig } from "@/services/wagmi";

const navigation: any[] = [
  // { name: "Donate", href: "/donate", current: false },
  // { name: "Stats", href: "/stats", current: false },
];

export type TToastNotification = {
  show: boolean;
  args: any[];
};

export default function Navbar() {
  const [toastNotification, setToastNotification] =
    useState<TToastNotification>({
      show: false,
      args: [],
    });
  const { address, isConnected } = useAccount();
  // const { connect } = useConnect({ config: wagmiConfig });
  const { connectors, connect } = useConnect();
  const { data: ensName } = useEnsName({ address });
  const [isOnboarded, setIsOnboarded] = useState(false);

  const userNavigation = [
    { name: "Donate", href: "/donate", current: false },
    // { name: "Stats", href: "/stats", current: false },
  ];

  useEffect(() => {
    try {
      setTimeout(() => {
        const provider = initSilk();

        // setIsOnboarded(true);

        // @ts-ignore
        //window?.ethereum = provider;
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  function setToast(...args: any[]) {
    setToastNotification({ show: true, args: args });
  }

  console.log("isOnboarded:", isOnboarded);

  return (
    <Disclosure
      as="nav"
      className="fixed w-full h-20 shadow-2xl text-2xl text-white bg-blue-500 z-10"
    >
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {toastNotification.show ? (
              <ToastNotification args={toastNotification.args} />
            ) : (
              <></>
            )}
            <div className="flex h-20 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-row items-center">
                  <div className="hidden md:flex md:items-center md:cursor-pointer">
                    <Link href="/">
                      <span className="uppercase">Debate Match</span>
                    </Link>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-4 cursor-pointer">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 text-md font-medium"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 cursor-pointer">
                  <ProfileDropdown profileId={profileId} />
                </div> */}
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Add wallet connect here */}
                  {!isConnected ? (
                    <button
                      className="border-2 m-2 border-white rounded-lg p-2 text-xl text-white font-medium hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                      onClick={() => {
                        // @ts-ignore
                        // window.ethereum.login();
                        connect({ chainId: baseSepolia.id, connector: injected() });
                      }}
                    >
                      login
                    </button>
                  ) : (
                    <div>Connected</div>
                  )}
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Notifications icon/button */}
                  {/* <button
                    type="button"
                    className="p-2 relative rounded-full text-sm font-medium border-neutral-700 text-gray-200 hover:bg-neutral-800/30"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  <Menu as="div" className="relative ml-3">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }: { active: boolean }) => {
                              console.log("active:", active);
                              return <Link href={item.href}>{item.name}</Link>;
                            }}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="hidden md:flex space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {isOnboarded &&
                navigation.map((item) => {
                  console.log("item:", item);
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                <Disclosure.Button
                  key={"home"}
                  as="a"
                  href="/"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-200"
                >
                  Home
                </Disclosure.Button>
                {isOnboarded &&
                  navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-200"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
