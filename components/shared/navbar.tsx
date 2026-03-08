"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
// import Button from "../custom/button";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navbarLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Patreons", href: "/patreons" },
  { name: "D-A-M", href: "/dam" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex flex-row items-center w-full justify-between bg-white font-mono px-8 max-md:pr-5 max-md:pl-2">
      <Link href={"/"} className="">
        <Image
          src={Logo}
          alt="Inictus Logo"
          width={100}
          height={100}
          className="w-32 h-auto object-cover max-md:w-30"
        />
      </Link>

      <div className="lg:flex flex-row hidden items-center gap-14">
        <ul className="flex flex-row items-center gap-8">
          {navbarLinks.map((link) => (
            <li key={link.href} className="group relative">
              <Link
                href={link.href}
                className={`text-sm font-medium ${pathname === link.href && "font-bold"}`}
              >
                {link.name}
              </Link>

              <span className="absolute w-px group-hover:bg-black/70 left-0 group-hover:duration-500 group-hover:w-full py-px -bottom-[0.5px]" />

              {/* Active Link Underline */}
              {pathname === link.href && (
                <span className="absolute w-full bg-black left-0 py-px -bottom-[0.5px]" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="lg:hidden flex flex-col justify-center items-center w-6 h-5 z-50 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-black transition-all rounded-full duration-300 absolute ${
            isMenuOpen ? "rotate-43" : "-translate-y-1"
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-black transition-all rounded-full duration-300 absolute ${
            isMenuOpen ? "-rotate-43" : "translate-y-1"
          }`}
        ></span>
      </button>

      <div
        className={`lg:hidden fixed inset-0 bg-black/35 transition-opacity duration-300 z-30 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-screen w-72 max-w-[85vw] bg-white shadow-xl px-6 py-20 transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col gap-6">
          {navbarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-2xl font-semibold tracking-tight ${
                  pathname === link.href ? "text-red-700" : "text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
}
