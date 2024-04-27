"use client";

import { privyConfig } from "@/services/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import dotenv from "dotenv";

dotenv.config();

export default function PrivyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      // @ts-ignore
      apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL as string}
      appId={
        (process.env.NEXT_PUBLIC_PRIVY_APP_ID as string) ||
        "clv9s7dbc0e4t112llawlzsbb"
      }
      config={privyConfig}
      onSuccess={(user) => {
        alert(`User logged in with email: ${user.email}`);
      }}
    >
      {children}
    </PrivyProvider>
  );
}
