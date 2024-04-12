const Hero = (props: { stats: any }) => {
  return (
    <div className="py-6 sm:py-3">
      <div className="mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
              Trusted by event creators and promoters worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 italic text-gray-600">
              Check out some of the events that have used IncentiVibe to
              incentivize their attendees to promote their events.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {props.stats.map((stat: any) => (
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

export default Hero;
