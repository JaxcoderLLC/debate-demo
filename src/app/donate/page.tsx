"use client";

import {
  Allo,
  Registry,
  SQFSuperFluidStrategy,
  TransactionData,
} from "@allo-team/allo-v2-sdk";
import { base } from "wagmi/chains";
import { AllocationSuperlfuid } from "@allo-team/allo-v2-sdk/dist/strategies/SuperFluidStrategy/types";
import JoshLImage from "../../assets/candidates/JoshL.png";
import RichardMImage from "../../assets/candidates/RichardM.png";
import JohnSImage from "../../assets/candidates/JohnS.png";
import Image from "next/image";
import { useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

/* eslint-disable @next/next/no-img-element */
const Donate = () => {
  return (
    <div className="px-4">
      <div className="text-xl mx-6">
        <h2 className="text-3xl text-center font-bold mt-20 mx-8">
          The Candidates
        </h2>
      </div>
      <Candidates />
    </div>
  );
};

export default Donate;

const candidates = [
  {
    id: 1,
    name: "Josh Levitt",
    imageUrl: JoshLImage,
  },
  // More candidates...
  {
    id: 2,
    name: "Richard McArthur",
    imageUrl: RichardMImage,
  },
  {
    id: 3,
    name: "John Steinck",
    imageUrl: JohnSImage,
  },
];

type Amounts = {
  [key: string]: { amount: number };
};
function Candidates() {
  const [customAmount, setCustomAmount] = useState<Amounts>({
    "0": { amount: 0 },
    "1": { amount: 0 },
    "2": { amount: 0 },
  });

  return (
    <div className="flex flex-col bg-white py-6">
      <div className="mx-auto max-w-screen">
        <ul
          role="list"
          className="mx-auto mt-4 grid max-w-screen grid-cols-1 gap-x-8 gap-y-10 lg:mx-0"
        >
          {candidates.map((person) => (
            <li key={person.name} className="flex flex-row ">
              <div className="flex flex-row">
                <div className="relative w-40 md:h-56 h-40">
                  <Image
                    src={person.imageUrl}
                    alt={`${person.name} image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 md:ml-12 mr-6">
                  <ul className="flex flex-row md:mt-10 mt-6 gap-4">
                    <li key={person.id}>
                      <DonateButton amount={5} index={person.id} />
                    </li>
                    <li key={person.id}>
                      <DonateButton amount={10} index={person.id} />
                    </li>
                    <li key={person.id}>
                      <DonateButton amount={20} index={person.id} />
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
                          setCustomAmount({
                            ...customAmount,
                            [person.id]: { amount: parseInt(e.target.value) },
                          });
                        }}
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <DonateButton
                    amount={customAmount[person.id]?.amount}
                    index={person.id}
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

function DonateButton(props: { amount: number; index: number }) {
  return (
    <button
      type="button"
      className="p-2 px-3 mt-4 text-center border rounded-lg text-sm text-white shimmer-gradient"
      onClick={() => {
        console.log(`Donating $${props.amount}`);

        // todo: set up donation call - allocate() function on Allo
      }}
    >
      Donate ${props.amount}
    </button>
  );
}

const allo = new Allo({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

const registry = new Registry({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

const strategy = new SQFSuperFluidStrategy({
  chain: base.id,
  rpc: process.env.RPC_URL as string,
});

// Note: admin function
export const batchSetAllocator = async (
  data: AllocationSuperlfuid[],
  poolId: number
) => {
  if (strategy) {
    // todo: set the strategy ID from the one you deployed/created
    const strategyAddress = await allo.getStrategy(BigInt(poolId));
    console.log("strategyAddress", strategyAddress);

    // Set the contract address -> docs:
    strategy.setContract(strategyAddress as `0x${string}`);
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
export const allocate = async (data: AllocationSuperlfuid, poolId: number) => {
  // Set some allocators for demo
  // NOTE: move this
  // const allocatorData: AllocationSuperlfuid[] = [
  //   {
  //     recipientId: "0x8C180840fcBb90CE8464B4eCd12ab0f840c6647C",
  //     flowRate: BigInt(0),
  //   },
  // ];

  // // todo: set the allocators defined above
  // await batchSetAllocator(allocatorData, poolId);
  // console.log("Allocators set");

  if (strategy) {
    // todo: set your poolId here
    strategy.setPoolId(BigInt(poolId));

    console.log(data);

    // Get the allocation data from the SDK
    // todo: snippet => getAllocationData
    const txData: TransactionData = strategy.getAllocationData(
      data.recipientId,
      data.flowRate
    );

    // try {
    //   const tx = await sendTransaction({
    //     to: txData.to as string,
    //     data: txData.data,
    //     value: BigInt(txData.value),
    //   });

    //   await wagmiConfigData.publicClient.waitForTransactionReceipt({
    //     hash: tx.hash,
    //   });

    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    // } catch (e) {
    //   console.log("Allocating", e);
    // }
  }
};
