"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const damLinks = [
  { label: "Home", href: "/dam" },
  { label: "Gallery", href: "/dam/gallery" },
  // { label: "About", href: "/dam/about" },
];

export default function DamNavbar() {
  const router = useRouter();
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
      <nav className="fixed top-0 bg-white border-b border-gray-100 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-3 md:mix-blend-difference">
        <Link
          href="/dam"
          className="font-bold text-2xl md:text-3xl font-mono tracking-widest text-dam-white"
        >
          D<span className="text-dam-red">·</span>A
          <span className="text-dam-red">·</span>M
        </Link>

        <ul className="hidden md:flex gap-8 list-none items-center">
          {damLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative font-semibold text-[0.9rem] tracking-[-0.04em] uppercase no-underline transition-opacity ${
                  isActiveLink(link.href)
                    ? "text-red-700"
                    : "text-dam-white hover:opacity-70"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/"
              className="text-[0.9rem] tracking-[-0.05em] font-semibold uppercase no-underline text-dam-white hover:opacity-70 transition-opacity"
            >
              Back to Inistic
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => router.push("/dam/registration")}
              className={`text-sm py-2 px-3 bg-gray-900 text-white tracking-[0.03em] font-semibold uppercase no-underline transition-opacity cursor-pointer ${
                isActiveLink("/dam/registration")
                  ? "text-dam-red"
                  : "text-dam-white hover:opacity-70"
              }`}
            >
              Register
            </button>
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
        className={`md:hidden fixed inset-0 z-40 bg-white/5 backdrop-blur-xs transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-72 max-w-[86vw] bg-white px-6 pt-20 pb-8 flex flex-col transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col gap-6 list-none">
          {damLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-4xl tracking-[-0.06em] uppercase font-semibold ${
                  isActiveLink(link.href) ? "text-red-700" : "text-black"
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
              className={`text-4xl tracking-[-0.05em] uppercase font-semibold ${
                isActiveLink("/dam/registration")
                  ? "text-dam-red"
                  : "text-black"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="text-xl tracking-[-0.05em] uppercase font-semibold text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Back to Inistic
          </Link>
        </div>
      </aside>
    </>
  );
}
