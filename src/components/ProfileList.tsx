import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const people = [
  {
    name: "Jaxoder",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    title: "CTO",
    role: "Admin",
    email: "jaxcoder@example.com",
    imageUrl: "",
  },
  {
    name: "Jane Cooper",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    title: "Regional Paradigm Technician",
    role: "Manager",
    email: "janecooper@example.com",
    imageUrl: "",
  },
];

export default function ProfileList() {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl">Profiles</span>
        <Link
          href={`/profile/new`}
          className="flex items-center justify-between bg-blue-500 text-white rounded-xl p-2"
        >
          <PlusIcon className="h-5 w-5 text-white mr-1" aria-hidden="true" />
          <span className="">New Profile</span>
        </Link>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person) => (
          <li
            key={person.email}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-50 sm:col-span-1"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {person.name}
                  </h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {person.title}
                </p>
              </div>
              <Image
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={person.imageUrl}
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${person.address}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <PhoneIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
