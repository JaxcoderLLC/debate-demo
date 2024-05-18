"use client";

import {
  Allo,
  Registry,
  DirectGrantsLiteStrategy,
  DirectGrantsLiteStrategyAbi,
  TransactionData,
} from "@allo-team/allo-v2-sdk";
import { base } from "wagmi/chains";
import JoshLImage from "../../assets/candidates/JoshStanding.png";
import RichardMImage from "../../assets/candidates/RichardM.png";
import JohnSImage from "../../assets/candidates/SteinbeckCutOut.png";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Address, parseEther } from "viem";
import { TCandidate } from "../types";
import { useSendTransaction } from "@privy-io/react-auth";
import {
  TimeInterval,
  fromTimeUnitsToSeconds,
  roundWeiAmount,
  unitOfTime,
} from "@/utils/utils";
import { usePrice } from "@/hooks/usePrice";
import { Allocation } from "@allo-team/allo-v2-sdk/dist/strategies/DirectGrantsLiteStrategy/types";

/* eslint-disable @next/next/no-img-element */
export default function Donate() {
  return (
    <div className="px-4">
      <div className="text-xl mx-6">
        <h2 className="text-3xl text-center font-bold mt-10 mx-8">
          The Candidates
        </h2>
      </div>
      <Candidates />
    </div>
  );
}

const candidates: TCandidate[] = [
  {
    id: 1,
    recipientId: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
    name: "Josh Levitt",
    imageUrl: JoshLImage,
    totalDonations: BigInt(0),
  },
  {
    id: 2,
    recipientId: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
    name: "Richard McArthur",
    imageUrl: RichardMImage,
    totalDonations: BigInt(0),
  },
  {
    id: 3,
    recipientId: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
    name: "John Steinck",
    imageUrl: JohnSImage,
    totalDonations: BigInt(0),
  },
];

type TAmounts = {
  [key: string]: { amount: bigint };
};

function Candidates() {
  const [customAmount, setCustomAmount] = useState<TAmounts>({
    1: { amount: BigInt(0) },
    2: { amount: BigInt(0) },
    3: { amount: BigInt(0) },
  });
  const [newFlowRate, setNewFlowRate] = useState("");
  const [amountPerTimeInterval, setAmountPerTimeInterval] = useState("");
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(
    TimeInterval.MONTH
  );

  const { fetchPrice, usdValues } = usePrice("ethereum");

  useEffect(() => {
    console.log(customAmount);

    setNewFlowRate(
      (
        parseEther(amountPerTimeInterval) /
        BigInt(fromTimeUnitsToSeconds(1, unitOfTime[timeInterval]))
      ).toString()
    );
  }, [amountPerTimeInterval, customAmount, timeInterval]);

  useEffect(() => {
    (async () => {
      const currentStreamValue = roundWeiAmount(
        BigInt(0) * BigInt(fromTimeUnitsToSeconds(1, unitOfTime[timeInterval])),
        4
      );

      setAmountPerTimeInterval(currentStreamValue);
    })();
  }, [timeInterval]);

  useLayoutEffect(() => {
    console.log("Fetching price...");

    fetchPrice("ethereum");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col bg-white py-4 mb-6">
      <div className="mx-auto max-w-screen">
        <ul
          role="list"
          className="mx-auto mt-4 grid max-w-screen grid-cols-1 gap-x-8 gap-y-10 lg:mx-0"
        >
          {candidates.map((person) => (
            <li
              key={person.id + "_" + person.name}
              className="flex flex-row border rounded-xl p-2 bg-gray-50 shadow-xl"
            >
              <div className="flex flex-row">
                <div className="flex items-center justify-center relative w-40 h-48">
                  <Image
                    src={person.imageUrl!}
                    alt={`${person.name} image`}
                    layout="fill"
                    className="rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 md:ml-12 mr-6">
                  <ul className="flex flex-row md:mt-10 mt-6 gap-4">
                    <li key={person.id + `_5`}>
                      <DonateButton
                        amount={parseEther("0.0016")}
                        recipientId={person.recipientId}
                        index={person.id}
                        usdValue={usdValues[0].amount}
                      />
                    </li>
                    <li key={person.id + `_10`}>
                      <DonateButton
                        amount={parseEther("0.0032")}
                        recipientId={person.recipientId}
                        index={person.id}
                        usdValue={usdValues[1].amount}
                      />
                    </li>
                    <li key={person.id + `_20`}>
                      <DonateButton
                        amount={parseEther("0.0064")}
                        recipientId={person.recipientId}
                        index={person.id}
                        usdValue={usdValues[2].amount}
                      />
                    </li>
                  </ul>
                  <h3 className="text-2xl font-bold md:mb-14 mb:8 text-center">
                    {person.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 md:mt-12 mt-8 mr-4">
                  <div>
                    <div className="relative mt-2 rounded-md shadow-sm mb-4">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CurrencyDollarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) => {
                          const newAmount =
                            e.target.value !== ""
                              ? BigInt(e.target.value)
                              : BigInt(0);
                          setCustomAmount((prevAmounts) => ({
                            ...prevAmounts,
                            [person.id]: { amount: newAmount },
                          }));
                        }}
                        className="block w-full shadow-xl rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <DonateButton
                    amount={customAmount[person.id]?.amount ?? 0}
                    recipientId={person.recipientId}
                    index={person.id}
                    disabled={customAmount[person.id]?.amount === BigInt(0)}
                    // todo: convert the custom amount to USD
                    usdValue={0}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DonateButton(props: {
  amount: bigint;
  recipientId: Address;
  index: number;
  disabled?: boolean;
  usdValue: number;
}) {
  const { sendTransaction } = useSendTransaction();

  // parseEther(amountPerTimeInterval) /
  //       BigInt(fromTimeUnitsToSeconds(1, unitOfTime[timeInterval]))
  //     ).toString()

  return (
    <button
      key={props.index}
      type="button"
      className={
        props.disabled
          ? `cursor-not-allowed p-2 px-3 mt-4 text-center shadow-xl border rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-700`
          : `p-2 px-3 mt-4 shadow-xl text-center border rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-700`
      }
      onClick={async () => {
        console.log(`Donating $${props.amount}`);

        // todo: set up donation call - allocate() function on Allo
        const allocationData: Allocation[] = [];

        await allocate(allocationData, 1, sendTransaction);
      }}
      disabled={props.disabled}
    >
      {/* todo: convert to USD */}
      Donate ${props.usdValue}{" "}
    </button>
  );
}

const allo = new Allo({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

const strategy = new DirectGrantsLiteStrategy({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

// Note: This is called when donate button is clicked
const allocate = async (
  data: Allocation[],
  poolId: number,
  sendTransaction: any
) => {
  console.log("Allocating...", { data, poolId });

  if (strategy) {
    strategy.setPoolId(BigInt(poolId));

    // Get the allocation data from the SDK
    const allocationData: TransactionData = strategy.getAllocateData(data);

    console.log("allocationData", allocationData);

    try {
      const tx = await sendTransaction({
        data: allocationData.data,
        to: allocationData.to as Address,
        value: BigInt(allocationData.value),
        gas: BigInt(1000000),
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (e) {
      console.log("Allocating", e);
    }
  }
};
