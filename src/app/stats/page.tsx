const Stats = () => {
  // TODO: fetch the actual stats we want to show
  const stats = [
    { id: 1, name: "Total Donations", value: "40K+" },
    { id: 2, name: "Flat platform fee", value: "3%" },
    { id: 3, name: "Total Events Created", value: "12" },
    { id: 4, name: "Paid out to candidates", value: "$235,957" },
  ];

  return (
    <div className="">
      <div className="text-3xl text-center font-bold mx-8">
        Stats
        <div>
          <dl className="mt-10 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat: any) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/25 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Stats;
