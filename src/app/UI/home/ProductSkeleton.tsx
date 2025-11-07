import React from "react";

function ProductSkeleton() {
  return (
    <div className="flex w-11/12 mx-auto sm:w-full sm:mx-0 flex-col shadow-md rounded-xl animate-pulse border-2 border-gray-200">
      <div className="h-96 bg-gray-200 rounded-t-xl"></div>
      <div className="flex flex-col justify-between h-full mx-6 my-4 gap-3">
        <div>
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="mt-2 h-4 w-full bg-gray-200 rounded"></div>
          <div className="mt-1 h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="mt-1 h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
