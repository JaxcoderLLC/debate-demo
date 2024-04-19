import { IDonationStatus, TStatus } from "@/app/types";

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const statusesStyle = {
  ["Pending" as TStatus]: "text-yellow-700 bg-yellow-50 ring-yellow-600/20",
  ["InProgress" as TStatus]: "text-blue-600 bg-blue-50 ring-blue-500/10",
  ["Completed" as TStatus]: "text-green-800 bg-green-50 ring-green-600/20",
  ["Canceled" as TStatus]: "text-gray-800 bg-gray-50 ring-gray-600/20",
  ["Rejected" as TStatus]: "text-red-800 bg-red-50 ring-red-600/20",
};

// start kyc
// https://silksecure.net/holonym/silk