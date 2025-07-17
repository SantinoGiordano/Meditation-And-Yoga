"use client";

import React, { useState } from "react";
import Cart from "./cart";


const CartModal = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <button
        onClick={openModal}
        className="hidden md:block text-black text-2xl hover:text-gray-300"
      >
        🛒
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeModal}
        >
          {/* Modal content */}
          <div
            className="bg-white max-w-2xl w-full mx-4 rounded-lg shadow-lg p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
