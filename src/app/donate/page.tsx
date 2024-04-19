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
          className="mx-auto mt-4 grid max-w-screen grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:grid-cols-1"
        >
          {candidates.map((person) => (
            <li key={person.name} className="flex flex-row">
              <div className="flex">
                {/* Candidate Avatar */}
                <Image
                  className="aspect-[3/2] w-full object-cover"
                  src={person.imageUrl}
                  alt="Candidate Avatar"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex">
                <h3 className="mb-2 text-center text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
              </div>

              <input
                className="mt-4 p-2 px-3 border rounded-lg text-sm text-gray-700"
                placeholder="Enter amount to donate"
                onChange={(e) =>
                  setCustomAmount({
                    ...customAmount,
                    [person.id]: { amount: Number(e.target.value) },
                  })
                }
                type="number"
              />
              <div className="flex">
                {/* Donate Buttons */}
                <ul
                  role="row"
                  className="mt-2 flex flex-row justify-between gap-1"
                >
                  <li>
                    <DonateButton amount={5} index={person.id} />
                  </li>
                  <li>
                    <DonateButton amount={25} index={person.id} />
                  </li>
                  <li>
                    <DonateButton amount={50} index={person.id} />
                  </li>
                  <li>
                    <DonateButton
                      amount={customAmount[person.id].amount}
                      index={person.id}
                    />
                  </li>
                </ul>
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
