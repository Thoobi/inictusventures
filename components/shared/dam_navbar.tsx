"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const damLinks = [
  { label: "Home", href: "/dam" },
  { label: "Gallery", href: "/dam/gallery" },
  { label: "About", href: "/dam/about" },
];

export default function DamNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/dam") {
      return pathname === "/dam";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-6 md:mix-blend-difference">
        <Link
          href="/dam"
          className="font-bold text-2xl md:text-3xl tracking-widest text-dam-white"
        >
          D<span className="text-dam-red">·</span>A
          <span className="text-dam-red">·</span>M
        </Link>

        <ul className="hidden md:flex gap-10 list-none">
          {damLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative font-semibold text-[0.8rem] tracking-[0.25em] uppercase no-underline transition-opacity ${
                  isActiveLink(link.href)
                    ? "text-dam-red"
                    : "text-dam-white hover:opacity-70"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/dam/registration"
              className={`text-[0.8rem] tracking-[0.25em] font-semibold uppercase no-underline transition-opacity ${
                isActiveLink("/dam/registration")
                  ? "text-dam-red"
                  : "text-dam-white hover:opacity-70"
              }`}
            >
              Register →
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-[0.8rem] tracking-[0.25em] font-semibold uppercase no-underline text-dam-white hover:opacity-70 transition-opacity"
            >
              ← Back to Inistic
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-7 h-5 relative z-60"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle DAM menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`w-7 h-0.5 bg-black rounded-full transition-all duration-300 absolute ${
              isMenuOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-black rounded-full transition-all duration-300 absolute ${
              isMenuOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-72 max-w-[86vw] bg-white px-6 pt-24 pb-8 transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col gap-6 list-none">
          {damLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-[0.22em] uppercase font-semibold ${
                  isActiveLink(link.href) ? "text-dam-red" : "text-black"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/dam/registration"
              className={`text-sm tracking-[0.22em] uppercase font-semibold ${
                isActiveLink("/dam/registration")
                  ? "text-dam-red"
                  : "text-black"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Register →
            </Link>
          </li>
          <li className="pt-4 mt-4 border-t border-gray-200">
            <Link
              href="/"
              className="text-sm tracking-[0.22em] uppercase font-semibold text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              ← Back to Inistic
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
