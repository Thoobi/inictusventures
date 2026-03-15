"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import DamNavbar from "./dam_navbar";

const isinisticPath = (pathname: string) => {
  const inisticPaths = ["/gallery", "/patreons", "/"];
  return inisticPaths.includes(pathname);
};

const isDamPath = (pathname: string) => {
  const damPaths = ["/dam/gallery", "/dam/registration", "/dam/about", "/dam"];
  return damPaths.includes(pathname);
};

export default function NavPathChecker() {
  return (
    <div>
      {isinisticPath(usePathname()) && <Navbar />}
      {isDamPath(usePathname()) && <DamNavbar />}
    </div>
  );
}
