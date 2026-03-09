"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmed = search.trim();

    if (!trimmed) {
      router.push("/feed");
      return;
    }

    router.push(`/feed?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="flex w-full items-center px-6 py-4">

        {/* LEFT */}
        <div className="flex-1">
          <Link href="/feed" className="text-2xl font-bold tracking-tight text-gray-900 hover:text-black transition">
            Lynkerr
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex w-full max-w-xl justify-center">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="flex h-10 items-center rounded-xl border border-gray-300 bg-gray-50 px-3 shadow-sm transition focus-within:border-black focus-within:bg-white focus-within:shadow">
              <svg
                className="mr-2 h-[18px] w-[18px] text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

                  if (!value.trim()) {
                    router.push("/feed");
                  } else {
                    router.push(`/feed?q=${encodeURIComponent(value)}`);
                  }
                }}
                placeholder="Search experiences or locations"
                className="w-full bg-transparent text-sm leading-none text-gray-900 outline-none placeholder:text-gray-400"
              />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  router.push("/feed");
                }}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-end gap-4 text-sm sm:text-base">
          <Link href="/feed" className="font-medium text-gray-700 hover:text-black">
            Feed
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/create" className="font-medium text-gray-700 hover:text-black">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-medium text-gray-700 hover:text-black">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}