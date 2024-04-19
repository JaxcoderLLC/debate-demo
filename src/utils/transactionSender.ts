"use client";

import { wagmiConfig } from "@/services/wagmi";
import { useSendTransaction } from "wagmi";

export function SendTransaction () {
  const { data: hash, sendTransaction } = useSendTransaction({
    config: wagmiConfig,
  });

  async function send () {
    const to = "";
    
  }
}