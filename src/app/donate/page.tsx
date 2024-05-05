"use client";

import {
  Allo,
  Registry,
  SQFSuperFluidStrategy,
  TransactionData,
} from "@allo-team/allo-v2-sdk";
import { optimismSepolia } from "wagmi/chains";
import { AllocationSuperlfuid } from "@allo-team/allo-v2-sdk/dist/strategies/SuperFluidStrategy/types";
import JoshLImage from "../../assets/candidates/JoshL.png";
import RichardMImage from "../../assets/candidates/RichardM.png";
import JohnSImage from "../../assets/candidates/JohnS.png";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Address, formatEther, parseEther } from "viem";
import { Candidate } from "../types";
import { useSendTransaction } from "@privy-io/react-auth";
import {
  TimeInterval,
  fromTimeUnitsToSeconds,
  roundWeiAmount,
  unitOfTime,
} from "@/utils/utils";
import { usePrice } from "@/hooks/usePrice";

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

const candidates: Candidate[] = [
  {
    id: 1,
    recipientId: "0x08e350796d1ffc87837072d3a92975fdf7a7b11c",
    name: "Josh Levitt",
    imageUrl: JoshLImage,
    totalDonations: BigInt(0),
  },
  {
    id: 2,
    recipientId: "0x433237e7c33834e250d63d3a6a066dce1f5c0a4b",
    name: "Richard McArthur",
    imageUrl: RichardMImage,
    totalDonations: BigInt(0),
  },
  {
    id: 3,
    recipientId: "0x9f56fa49af3b3e6fdebe64763bd34ae4aa1c4106",
    name: "John Steinck",
    imageUrl: JohnSImage,
    totalDonations: BigInt(0),
  },
];

type Amounts = {
  [key: string]: { amount: bigint };
};
function Candidates() {
  const [customAmount, setCustomAmount] = useState<Amounts>({
    1: { amount: BigInt(0) },
    2: { amount: BigInt(0) },
    3: { amount: BigInt(0) },
  });
  const [newFlowRate, setNewFlowRate] = useState("");
  const [amountPerTimeInterval, setAmountPerTimeInterval] = useState("");
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(
    TimeInterval.MONTH
  );

  const { fetchPrice, ethValues, usdValues } = usePrice("ethereum");

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
  }, []);

  return (
    <div className="flex flex-col bg-white py-4 mb-6">
      <div className="mx-auto max-w-screen">
        <ul
          role="list"
          className="mx-auto mt-4 grid max-w-screen grid-cols-1 gap-x-8 gap-y-10 lg:mx-0"
        >
          {candidates.map((person) => (
            <li key={person.id + "_" + person.name} className="flex flex-row">
              <div className="flex flex-row">
                <div className="relative w-40 md:h-56 h-40">
                  <Image
                    src={person.imageUrl!}
                    alt={`${person.name} image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
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
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          ? `cursor-not-allowed p-2 px-3 mt-4 text-center border rounded-lg text-sm text-white shimmer-gradient-blue`
          : `p-2 px-3 mt-4 text-center border rounded-lg text-sm text-white shimmer-gradient-blue`
      }
      onClick={async () => {
        console.log(`Donating $${props.amount}`);

        // todo: set up donation call - allocate() function on Allo
        await allocate(
          {
            recipientId: props.recipientId,
            flowRate: parseEther(
              (
                props.amount /
                BigInt(
                  fromTimeUnitsToSeconds(1, unitOfTime[TimeInterval.MONTH])
                )
              ).toString()
            ),
          },
          22,
          sendTransaction
        );
      }}
      disabled={props.disabled}
    >
      {/* todo: convert to USD */}
      Donate ${props.usdValue}{" "}
    </button>
  );
}

const allo = new Allo({
  chain: optimismSepolia.id,
  rpc: process.env.RPC_URL as string,
});

const registry = new Registry({
  chain: optimismSepolia.id,
  rpc: process.env.RPC_URL as string,
});

const strategy = new SQFSuperFluidStrategy({
  chain: optimismSepolia.id,
  rpc: process.env.RPC_URL as string,
});

// Note: admin function
const batchSetAllocator = async (
  data: AllocationSuperlfuid[],
  poolId: number
) => {
  if (strategy) {
    // todo: set the strategy ID from the one you deployed/created
    const strategyAddress = await allo.getStrategy(BigInt(poolId));
    console.log("strategyAddress", strategyAddress);

    // Set the contract address -> docs:
    strategy.setContract(strategyAddress as `0x${string}`);
    strategy.setPoolId(BigInt(poolId));
    const txData: TransactionData = strategy.getBatchAllocationData(data);

    console.log("txData", txData);

    // try {
    //   const tx = await sendTransaction({
    //     to: txData.to as string,
    //     data: txData.data,
    //     value: BigInt(txData.value),
    //   });

    //   await publicClient.waitForTransactionReceipt({
    //     hash: tx.hash,
    //   });

    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    // } catch (e) {
    //   console.log("Updating Allocators", e);
    // }
  }
};

// Note: This is called when donate button is clicked
const allocate = async (
  data: AllocationSuperlfuid,
  poolId: number,
  sendTransaction: any
) => {
  console.log("Allocating...", { data, poolId });

  // Set some allocators for demo
  // NOTE: move this
  // const allocatorData: AllocationSuperlfuid[] = [
  //   {
  //     recipientId: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
  //     flowRate: BigInt(0),
  //   },
  // ];

  // todo: set the allocators defined above
  // await batchSetAllocator(allocatorData, poolId);
  // console.log("Allocators set");

  if (strategy) {
    // todo: set your poolId here
    strategy.setPoolId(BigInt(poolId));

    // console.log(data);

    // Get the allocation data from the SDK
    // todo: snippet => getAllocationData
    const allocationData: TransactionData = strategy.getAllocationData(
      data.recipientId,
      BigInt(parseEther("0.0016"))
    );

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
