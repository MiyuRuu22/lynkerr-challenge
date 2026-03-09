"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white text-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/feed" className="text-2xl font-bold">
          Lynkerr
        </Link>

        <div className="flex items-center gap-4 text-sm sm:text-base">
          <Link href="/feed" className="hover:text-gray-600">
            Feed
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/create" className="hover:text-gray-600">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-600">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
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