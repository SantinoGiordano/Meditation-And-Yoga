import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="w-full min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="flex flex-col items-center justify-center text-center p-8 bg-gradient-to-r from-blue-400 to-purple-400 text-white h-screen">
        Hello
      </div>
    </>
  );
}
