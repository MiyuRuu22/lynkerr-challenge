"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900 transition hover:text-black"
        >
          Lynkerr
        </Link>

        <div className="flex items-center gap-4 text-sm sm:text-base">
          <Link href="/feed" className="font-medium text-gray-700 hover:text-black">
            Feed
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/create" className="font-medium text-gray-700 hover:text-black">
                Create
              </Link>

              <Link href="/saved" className="font-medium text-gray-700 hover:text-black">
                Saved
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