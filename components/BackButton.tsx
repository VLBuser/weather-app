"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="md:absolute flex items-center gap-2 px-4 py-2 bg-[#222222] rounded-full hover:bg-gray-800 transition w-fit h-fit mt-6 cursor-pointer"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
