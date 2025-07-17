'use client';

import { sampleData } from "@/data/data";
import { useRef, useState } from "react";
import { useCartStore } from "../store/store";

const Page = () => {
  return (
    <div className="min-h-screen bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {sampleData.map((item) => (
          <AudioCard link={item.file} key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;

type Props = {
  id: number;
  title: string;
  description: string;
  file: string;
  price: number;
  link: string;
};

const AudioCard = ({ id, title, description, price, link }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { inCart, toggleInCart } = useCartStore();

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleAddToCart = () => {
    toggleInCart(id.toString()); // use string key
    console.log(
      `Item ${id} is ${inCart[id] ? "removed from" : "added to"} cart`
    );
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-blue-400">
      <div className="w-20 h-20 bg-purple-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-md">
        <span className="text-white text-2xl font-bold">P{id}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-blue-700">{title}</h2>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <p className="text-gray-800 font-medium mb-4">${price.toFixed(2)}</p>

      <button
        onClick={toggleAudio}
        className="bg-blue-400 shadow-md hover:shadow-lg text-black p-4 rounded-full transition"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio
        ref={audioRef}
        src={link}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <button
        onClick={handleAddToCart}
        className="bg-blue-400 text-black p-3 mt-4 rounded-lg hover:bg-blue-500 transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        {inCart[id] ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};
