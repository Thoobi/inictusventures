"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import DamNavbar from "./dam_navbar";

const isInictusPath = (pathname: string) => {
  const inictusPaths = ["/gallery", "/patreons", "/"];
  return inictusPaths.includes(pathname);
};

const isDamPath = (pathname: string) => {
  const damPaths = ["/dam/gallery", "/dam/registration", "/dam/about", "/dam"];
  return damPaths.includes(pathname);
};

export default function NavPathChecker() {
  return (
    <div>
      {isInictusPath(usePathname()) && <Navbar />}
      {isDamPath(usePathname()) && <DamNavbar />}
    </div>
  );
}
