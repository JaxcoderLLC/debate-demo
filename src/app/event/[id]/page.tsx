"use client";

import { TEventWithCandidates } from "@/app/types";
import { EventContext } from "@/context/EventContext";
import { useContext, useEffect, useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import EventForm from "@/components/EventForm";

export default function EventDetail({ params }: { params: { id: string } }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("params", params);

  const { id } = params;
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState<TEventWithCandidates>(
    {} as TEventWithCandidates
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchEvent = async (roundId: string) => {
      const event = events.find((event) => event.id === roundId);

      console.log("Event fetched", event);

      setEvent(event as TEventWithCandidates);
    };

    fetchEvent(id);
  }, [id, events]);

  return (
    <>
      {event && event.roundMetadata ? (
        <EventForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          editMode={editMode}
          setEditMode={setEditMode}
          event={event}
        />
      ) : (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //   <div className="flex flex-row justify-between px-4 sm:px-0">
        //     <div>
        //       <h3 className="text-base font-semibold leading-7 text-gray-900">
        //         Event Information
        //       </h3>
        //       <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        //         Event details and information.
        //       </p>
        //     </div>
        //     <div className="flex flex-row justify-between items-center">
        //       {isAdmin && !editMode && (
        //         <button
        //           onClick={() => {
        //             setEditMode(!editMode);
        //           }}
        //           className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-700"
        //         >
        //           Edit
        //         </button>
        //       )}
        //       <XMarkIcon
        //         className="text-rose-500 font-bold hover:text-rose-800 hover:cursor-pointer"
        //         height={32}
        //         width={32}
        //       />
        //     </div>
        //   </div>
        //   <div className="mt-6 border-t border-gray-100">
        //     <dl className="">
        //       <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        //         <dt className="text-sm font-medium leading-6 text-gray-900">
        //           Event name
        //         </dt>
        //         <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        //           <span className="flex-grow">{event.roundMetadata?.name}</span>
        //         </dd>
        //       </div>{" "}
        //       <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        //         <dt className="text-sm font-medium leading-6 text-gray-900">
        //           About
        //         </dt>
        //         <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        //           <span className="flex-grow">
        //             {event.roundMetadata?.eligibility?.description}
        //           </span>
        //         </dd>
        //       </div>
        //       <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        //         <dt className="text-sm font-medium leading-6 text-gray-900">
        //           Admin address
        //         </dt>
        //         <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        //           <span className="mr-2">{adminAddress}</span>
        //           <ClipboardDocumentIcon
        //             className="hover:cursor-pointer"
        //             height={16}
        //             width={16}
        //             onClick={() => {
        //               navigator.clipboard.writeText(adminAddress);
        //             }}
        //           />
        //         </dd>
        //       </div>
        //       <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        //         <dt className="text-sm font-medium leading-6 text-gray-900">
        //           Candidates
        //         </dt>
        //         <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        //           <ul
        //             role="list"
        //             className="divide-y divide-gray-100 rounded-md border border-gray-200"
        //           >
        //             <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
        //               <div className="flex w-0 flex-1 items-center">
        //                 <UserCircleIcon
        //                   className="h-5 w-5 flex-shrink-0 text-gray-400"
        //                   aria-hidden="true"
        //                 />
        //                 <div className="ml-4 flex min-w-0 flex-1 gap-2">
        //                   <span className="truncate font-medium">
        //                     0xe3f12ef28CCDadaC60daC287395251b5D16cdABA
        //                   </span>
        //                 </div>
        //               </div>
        //               <div className="ml-4 flex flex-shrink-0 space-x-4">
        //                 <button
        //                   type="button"
        //                   className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
        //                 >
        //                   Edit
        //                 </button>
        //                 <span className="text-gray-200" aria-hidden="true">
        //                   |
        //                 </span>
        //                 <button
        //                   type="button"
        //                   className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
        //                 >
        //                   <XMarkIcon
        //                     className="text-rose-500 font-bold hover:text-rose-800 hover:cursor-pointer"
        //                     height={32}
        //                     width={32}
        //                   />
        //                 </button>
        //               </div>
        //             </li>
        //             <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
        //               <div className="flex w-0 flex-1 items-center">
        //                 <UserCircleIcon
        //                   className="h-5 w-5 flex-shrink-0 text-gray-400"
        //                   aria-hidden="true"
        //                 />
        //                 <div className="ml-4 flex min-w-0 flex-1 gap-2">
        //                   <span className="truncate font-medium">
        //                     0xe3f12ef28CCDadaC60daC287395251b5D16cdABA
        //                   </span>
        //                 </div>
        //               </div>
        //               <div className="ml-4 flex flex-shrink-0 space-x-4">
        //                 <button
        //                   type="button"
        //                   className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
        //                 >
        //                   Edit
        //                 </button>
        //                 <span className="text-gray-200" aria-hidden="true">
        //                   |
        //                 </span>
        //                 <button
        //                   type="button"
        //                   className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
        //                 >
        //                   <XMarkIcon
        //                     className="text-rose-500 font-bold hover:text-rose-800 hover:cursor-pointer"
        //                     height={32}
        //                     width={32}
        //                   />
        //                 </button>
        //               </div>
        //             </li>
        //           </ul>
        //         </dd>
        //       </div>
        //     </dl>
        //   </div>
        //   {isAdmin && editMode && (
        //     <div className="flex flex-row justify-end items-center">
        //       <button
        //         onClick={() => {
        //           setEditMode(!editMode);
        //         }}
        //         className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-rose-500 hover:bg-rose-700"
        //       >
        //         Cancel
        //       </button>
        // <button
        //   onClick={() => {
        //     // update event/round

        //     setEditMode(!editMode);
        //   }}
        //   className="p-2 m-4 w-36 border rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-700"
        // >
        //   Save
        // </button>
        //     </div>
        //   )}
        // </form>
        <div className="flex flex-col items-center justify-center p-4">
          <Card className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
