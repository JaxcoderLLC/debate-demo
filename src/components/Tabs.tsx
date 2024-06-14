import { classNames } from "@/utils/common";

const tabs = [
  { name: "Profile", current: true },
  { name: "Events", current: false },
  { name: "My Events", current: false },
  { name: "Stats", current: false },
  { name: "Team Members", current: false },
  { name: "Fees & Settings", current: false },
];

export default function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div>
      <nav
        className="isolate flex divide-x divide-gray-200 rounded-t-lg shadow"
        aria-label="Tabs"
      >
        {tabs.map((tab, tabIdx) => (
          <span
            key={tab.name}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tab.name);
            }}
            className={classNames(
              tab.name === activeTab
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
              "group cursor-pointer relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
            )}
            aria-current={tab.name === activeTab ? "page" : undefined}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                tab.name === activeTab ? "bg-blue-500" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </span>
        ))}
      </nav>
    </div>
  );
}
