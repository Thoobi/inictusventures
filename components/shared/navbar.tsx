"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Button from "../custom/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navbarLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Patreons", href: "/patreons" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <nav className="flex flex-row items-center w-full justify-between font-mono py-3 px-8">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="Inictus Logo"
          width={100}
          height={100}
          className="w-32 h-auto"
        />
      </Link>

      <div className="flex flex-row items-center gap-14">
        <ul className="flex flex-row items-center gap-8">
          {navbarLinks.map((link) => (
            <li key={link.href} className="group relative">
              <Link
                href={link.href}
                className={`text-sm font-medium bg-blend-difference ${activeLink === link.href ? "font-bold" : ""}`}
              >
                {link.name}
              </Link>

              <span className="absolute w-px group-hover:bg-black/70 left-0 group-hover:duration-500 group-hover:w-full py-px bottom-0" />

              {/* Active Link Underline */}
              {activeLink === link.href && (
                <span className="absolute w-full bg-black left-0 py-px bottom-0" />
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-row gap-4 items-center">
          <Button
            className="bg-black hover:bg-black/70 transition duration-200 ease-in-out text-sm font-semibold px-8 py-2 rounded-full text-white"
            title="DAM"
          />
          {/* <Button
            className="bg-black hover:bg-black/70 transition duration-200 ease-in-out text-sm font-semibold rounded-full px-5 py-2 text-white"
            title="Events"
          /> */}
        </div>
      </div>
    </nav>
  );
}
