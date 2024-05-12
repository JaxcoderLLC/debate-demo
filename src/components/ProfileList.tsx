import { TProfilesByOwnerResponse } from "@/app/types";
import { getProfilesByOwner } from "@/services/request";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { CogIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Divider } from "@nextui-org/react";
import request from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

// const people = [
//   {
//     name: "Jaxoder",
//     address: "0x1234567890abcdef1234567890abcdef12345678",
//     title: "CTO",
//     role: "Admin",
//     email: "jaxcoder@example.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     name: "Jane Cooper",
//     address: "0x1234567890abcdef1234567890abcdef12345678",
//     title: "Regional Paradigm Technician",
//     role: "Manager",
//     email: "janecooper@example.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];

export default function ProfileList() {
  const [userProfiles, setUserProfiles] = useState<TProfilesByOwnerResponse[]>(
    []
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await getProfilesByOwner({
        chainId: "11155420",
        account: "0xe3f12ef28CCDadaC60daC287395251b5D16cdABA",
      });
      console.log(response);
      setUserProfiles(response);
    };

    fetchProfiles();
  }, []);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl">Profiles</span>
        <Link
          href={`/profile/new`}
          className="flex items-center justify-between bg-blue-500 text-white rounded-xl shadow-xl p-2"
        >
          <PlusIcon className="h-5 w-5 text-white mr-1" aria-hidden="true" />
          <span className="">New Profile</span>
        </Link>
      </div>
      <Divider className="my-4" />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {userProfiles.map((profile) => (
          <li
            key={profile.profileId}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 shadow-xl hover:bg-gray-100 sm:col-span-1"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-4">
              <div className="truncate">
                <div className="flex items-center justify-between space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {profile.name}
                  </h3>
                  <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {profile.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {profile.owner}
                </p>
              </div>
              {/* todo: add image/identicon? */}
              {/* <Image
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={profile.imageUrl}
                alt=""
                width={40}
                height={40}
              /> */}
            </div>
            <div>
              <div className="-mt-px flex divide-x cursor-pointer divide-gray-200">
                <div className="flex w-0 flex-1">
                  <span className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <CogIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </span>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <span className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-rose-500">
                    <XMarkIcon
                      className="h-5 w-5 text-rose-400"
                      aria-hidden="true"
                    />
                    Remove
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
