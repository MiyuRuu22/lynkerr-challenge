"use client";

import { useRouter } from "next/navigation";

export default function RegisterCTAButton() {
  const router = useRouter();

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/feed");
    } else {
      router.push("/register");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
    >
      Register
    </button>
  );
}