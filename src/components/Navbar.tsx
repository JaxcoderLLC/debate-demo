"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import Button from "./Button";
import { TToastNotification } from "@/app/types";

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

  if (!ready) {
    return null;
  }

  return (
    <nav className="navbar sm:rounded-b-xl">
      <div className="mx-4 flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div className="md:flex md:items-center md:cursor-pointer">
            <Link href="/">
              <span className="text-3xl">Debate & Donate</span>
            </Link>
          </div>
          {/* <div className="md:flex md:items-center md:space-x-4 ml-2 cursor-pointer rounded-xl hover:bg-gray-100 hover:text-gray-800 my-2">
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
          </div> */}
        </div>

        <div className="flex-shrink-0">
          {/* Add privy connect here */}
          {ready && !authenticated ? (
            <div className="mb-2">
              <p>You are not authenticated with Privy</p>
              <div className="flex items-center gap-4 ">
                <Button
                  className="rounded-xl hover:bg-gray-100 hover:text-gray-800 my-2"
                  onClick_={login}
                  cta={"Login"}
                />
                <span>or</span>
                <Button
                  className="rounded-xl hover:bg-gray-100 hover:text-gray-800 my-2"
                  onClick_={connectWallet}
                  cta={"Connect"}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <span>{"Me"}</span>
              </div>
              <div>
                <Button
                  className="rounded-xl p-2 text-medium hover:bg-gray-100 hover:text-gray-800 my-2"
                  onClick_={logout}
                  cta="Logout"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
