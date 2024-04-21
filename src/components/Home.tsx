const Home = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-48">
        <button className="p-6 m-4 w-80 text-4xl border border-blue-500 bg-blue-500 text-white rounded-lg font-medium hover:bg-gray-50 hover:text-gray-900">
          Fund Account
        </button>
        <button className="p-6 m-4 w-80 text-4xl border border-blue-500 bg-blue-500 text-white rounded-lg font-medium hover:bg-gray-50 hover:text-gray-900">
          Verify ID
        </button>
      </div>
    </main>
  );
};

export default Home;
