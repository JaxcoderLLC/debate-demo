import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/common";
import Link from "next/link";

export default function NavbarDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left ml-4">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-transparent text-gray-600">
          Events
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 mt-1 text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/event/new"
                  className={classNames(
                    active ? "text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Create Event
                </Link>
              )}
            </Menu.Item>
            {/* if use has events show this */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/event/user/${0xdbaed869fa387e43fc26a42928c1cf398bc60ba1}`}
                  className={classNames(
                    active ? "text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  My Events
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}