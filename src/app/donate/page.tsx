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
    >
      Donate ${props.amount}
    </button>
  );
}
