import { formatEther } from "viem";
import { IPFS_GATEWAY } from "./constants";

export enum TimeInterval {
  DAY = "/day",
  WEEK = "/week",
  MONTH = "/month",
  YEAR = "/year",
}

export const unitOfTime = {
  [TimeInterval.DAY]: "days",
  [TimeInterval.WEEK]: "weeks",
  [TimeInterval.MONTH]: "months",
  [TimeInterval.YEAR]: "years",
};

export function weightedPick(items: any[], weights: number[]) {
  let i;

  for (i = 1; i < weights.length; i++) {
    weights[i] += weights[i - 1];
  }

  const chance = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) {
    if (weights[i] > chance) {
      break;
    }
  }

  return items[i];
}

export function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function perSecondToPerMonth(amount: number) {
  return amount * 2628000;
}

export function fromTimeUnitsToSeconds(units: number, type: string) {
  let result = units;

  switch (type) {
    case "minutes":
      result = units * 60;
      break;
    case "hours":
      result = units * 3600;
      break;
    case "days":
      result = units * 86400;
      break;
    case "weeks":
      result = units * 604800;
      break;
    case "months":
      result = units * 2628000;
      break;
    case "years":
      result = units * 31536000;
      break;
    default:
      break;
  }

  return result;
}

export function isNumber(value: string) {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}

export function truncateStr(str: string, strLen: number) {
  if (str.length <= strLen) {
    return str;
  }

  const separator = "...";

  const sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    str.substr(0, frontChars) + separator + str.substr(str.length - backChars)
  );
}

export function roundWeiAmount(amount: bigint, digits: number) {
  return parseFloat(Number(formatEther(amount)).toFixed(digits)).toString();
}

export function convertStreamValueToInterval(
  amount: bigint,
  from: TimeInterval,
  to: TimeInterval
) {
  return roundWeiAmount(
    (amount / BigInt(fromTimeUnitsToSeconds(1, unitOfTime[from]))) *
      BigInt(fromTimeUnitsToSeconds(1, unitOfTime[to])),
    4
  );
}

/*
 * Division of ints only square root
 * https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division
 */
export function sqrtBigInt(s: bigint) {
  if (s <= BigInt(1)) {
    return s;
  }

  let x0 = s / BigInt(2);
  let x1 = (x0 + s / x0) / BigInt(2);

  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + s / x0) / BigInt(2);
  }

  return x0;
}

export function clampText(str: string, newLength: number) {
  if (str.length <= newLength) {
    return str;
  }

  return `${str.slice(0, newLength - 4)}...`;
}

export function getGatewayUrl(uri: string) {
  return uri.startsWith("ipfs://") ? `${IPFS_GATEWAY}/${uri.slice(7)}` : uri;
}