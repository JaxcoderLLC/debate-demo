"use client";

import {
  Allo,
  Allocation,
  CreateProfileArgs,
  Registry,
  SQFSuperFluidStrategy,
  TransactionData,
} from "@allo-team/allo-v2-sdk";
import { TSetAllocatorData } from "../types";
import { base } from "wagmi/chains";
import { useSendTransaction } from "wagmi";
import { AllocationSuperlfuid } from "@allo-team/allo-v2-sdk/dist/strategies/SuperFluidStrategy/types";

/* eslint-disable @next/next/no-img-element */
const Donate = () => {
  return (
    <div className="">
      <div className="text-xl mx-6">
        <h2 className="text-3xl text-center font-bold mx-8">The Candidates</h2>
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600 my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            suscipit, sapien nec vehicula lacinia, erat odio ultricies nunc, nec
            scelerisque neque nunc at justo. Nunc non nisl vel lorem tincidunt
            suscipit. Nulla facilisi. Nam nec libero ut elit lacinia auctor.
          </p>
        </div>
      </div>
      <Candidates />
    </div>
  );
};

export default Donate;

const candidates = [
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More candidates...
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Senator",
    state: "NV",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
];

function Candidates() {
  return (
    <div className="bg-white py-6">
      <div className="mx-auto max-w-7xl">
        <ul
          role="list"
          className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {candidates.map((person) => (
            <li key={person.name}>
              {/* Candidate Header */}
              <h3 className="mb-2 text-center text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {person.name} |{" "}
                <span className="text-base leading-7 text-gray-600">
                  {person.state}{" "}
                </span>
                <span className="text-base leading-7 text-gray-600">
                  {person.role}
                </span>
              </h3>
              {/* Candidate Avatar */}
              <img
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={person.imageUrl}
                alt="Candidate Avatar"
              />
              {/* Donate Buttons */}
              <ul
                role="list"
                className="mt-2 flex flex-row justify-between gap-1"
              >
                <li>
                  <DonateButton amount={5} />
                </li>
                <li>
                  <DonateButton amount={10} />
                </li>
                <li>
                  <DonateButton amount={25} />
                </li>
                <li>
                  <DonateButton amount={50} />
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DonateButton(props: { amount: number }) {
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
