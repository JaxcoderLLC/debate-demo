"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import Button from "./Button";
import { TToastNotification } from "@/app/types";
import { Address } from "viem";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import ToastNotification from "./ToastNotification";
import DonateLogo from "../assets/DDLogo.webp";
import Image from "next/image";

export default function Navbar() {
  const [toastNotification, setToastNotification] =
    useState<TToastNotification>({
      show: false,
      args: [],
    });
  const [isOnboarded, setIsOnboarded] = useState(false);

  function setToast(...args: any[]) {
    setToastNotification({ show: true, args: args });
  }

  // Privy hooks
  const {
    ready,
    user,
    authenticated,
    login,
    connectWallet,
    logout,
    linkWallet,
  } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  // WAGMI hooks
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setActiveWallet } = useSetActiveWallet();

  console.log("isOnboarded:", isOnboarded, "ready", ready);

  useEffect(() => {
    if (ready && authenticated) {
      setToast("Welcome back, " + user?.email ?? "email not set");
    }
  }, [ready, authenticated, user?.email]);

  if (!ready) {
    return null;
  }

  return (
    <div>
      <nav className="navbar sm:rounded-b-xl pb-2">
        <div className="mx-4 flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <Link
              className="md:flex md:items-center md:cursor-pointer mr-8"
              href="/"
            >
              <span className="text-3xl">Debate & Donate</span>
              {/* <Image
                src={DonateLogo}
                alt="Donate Logo"
                width={50}
                height={50}
              /> */}
            </Link>
            <div className="md:flex md:items-center md:space-x-4 ml-2 my-2">
              <Link
                key="manage"
                href="/manage"
                className="px-2 mt-1 text-md font-medium hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded-xl"
              >
                Manage
              </Link>
              <Link
                key="live"
                href="/live"
                className="px-2 mt-1 text-md font-medium hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded-xl"
              >
                Live
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 mt-2">
            {/* Add privy connect here */}
            {ready && !authenticated ? (
              <div className="mb-0">
                <div className="flex items-center gap-4 ">
                  <Button
                    className="rounded-xl p-2 hover:bg-gray-100 hover:text-gray-800"
                    onClick_={login}
                    cta={"Login"}
                  />
                  {/* <span>or</span>
                <Button
                  className="rounded-xl hover:bg-gray-100 hover:text-gray-800 my-2"
                  onClick_={connectWallet}
                  cta={"Connect"}
                /> */}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center"
                  onClick={() => {
                    copyToClipboard(user?.wallet?.address as Address);
                  }}
                >
                  <ClipboardDocumentIcon className="h-5 w-5 mx-2 text-gray-500 cursor-pointer" />
                  <span>
                    {shortenAddress(user?.wallet?.address as Address)}
                  </span>
                </div>
                <div>
                  <Button
                    className="rounded-xl p-2 text-medium hover:bg-gray-100 hover:text-gray-800"
                    onClick_={logout}
                    cta="Logout"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* todo: set up toast notifs */}
        {/* <div>{toastNotification.args[0]}</div> */}
      </nav>
      {/* <div className="mr-20">
        <ToastNotification {...toastNotification} />
      </div> */}
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function shortenAddress(address: string | Address) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}
