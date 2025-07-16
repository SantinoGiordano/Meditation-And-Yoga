import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-blue-400"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-md">
              <span className="text-white text-2xl font-bold">P{num}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              Product {num}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              This is a description for product {num}. It’s designed to help you
              on your wellness journey.
            </p>
            <button className="mt-auto bg-blue-600 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold transition">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
