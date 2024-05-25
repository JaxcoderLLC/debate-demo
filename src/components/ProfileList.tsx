import { ProfileContext } from "@/context/ProfileContext";
import { CogIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { useContext } from "react";

export default function ProfileList() {
  const { profiles } = useContext(ProfileContext);

  console.log("profiles from component", profiles);

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
        {profiles.map((profile) => (
          <li
            key={profile.profileId}
            className="col-span-1 rounded-lg bg-gray-50 shadow-xl hover:bg-gray-100 sm:col-span-1"
          >
            <div className="flex w-full items-center justify-between space-x-2 p-4">
              <div className="truncate">
                <div className="flex items-center justify-between space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {profile.name}
                  </h3>
                  <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {profile.roles.at(0)?.role}
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
            <div className="flex w-full items-center justify-between space-x-2 p-4">
              Tags: {profile.tags.at(0)}
            </div>
            <div>
              <div className="-mt-px flex divide-x cursor-pointer divide-gray-200">
                <div className="flex w-0 flex-1">
                  <Link
                    href={`/profile/${profile.profileId}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <CogIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </Link>
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
