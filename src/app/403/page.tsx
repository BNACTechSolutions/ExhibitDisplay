export default function Custom403() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-black">403</h1>
          <p className="mt-4 text-lg text-gray-600">
            This exhibit is <span className="font-semibold text-black">pending approval</span>.<br />
            Please check back later!
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }
  