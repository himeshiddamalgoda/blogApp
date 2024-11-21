import React from "react";

const FetchingError = ({ error }: { error: string }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-md font-bold text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default FetchingError;
