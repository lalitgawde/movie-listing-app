import React from "react";

function SkeletonLoader() {
  return (
    <div
      className="py-4! px-6! h-[40rem] flex flex-col gap-4 bg-[#2b3035] rounded-lg"
      // style={{ padding: "1rem" }}
    >
      <div className="h-7 w-64 rounded bg-linear-to-r from-gray-300 to-gray-400 animate-pulse"></div>
      <div className="flex flex-col gap-4 rounded">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-6 w-full">
            <div className="h-20 w-20 rounded bg-linear-to-r from-gray-300 to-gray-400 animate-pulse"></div>
            <div className="flex flex-col gap-4">
              <div className="h-4 w-36 rounded bg-linear-to-r from-gray-300 to-gray-400 animate-pulse"></div>
              <div className="h-4 w-24 rounded bg-linear-to-r from-gray-300 to-gray-400 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;
