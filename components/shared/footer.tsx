import Link from "next/link";

export default function Footer() {
  const navlinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Patreons",
      href: "/patreons",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const socialLinks = [
    {
      name: "Twitter/X",
      href: "https://twitter.com/inisticmedia",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/inisticmedia",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/inisticmedia",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@inisticmedia",
    },
  ];

  return (
    <footer className="w-full bg-red-700 text-white pt-20 max-md:pt-10 max-md:px-5 font-mono">
      <div className="container mx-auto grid grid-cols-3 max-md:grid-cols-2 max-md:justify-between gap-10 max-md:w-full pb-20 max-md:pb-0">
        <div className="flex flex-col gap-3 pr-65 max-md:pr-0">
          <h3 className="text-base max-md:text-sm font-bold tracking-tight">
            Navigation
          </h3>
          <ul className="space-y-2">
            {navlinks.map((link) => (
              <li key={link.href} className="group relative w-fit">
                <Link
                  href={link.href}
                  className={`text-3xl max-md:text-lg font-semibold inline-block`}
                >
                  {link.name}
                </Link>
                <span className="absolute w-px group-hover:bg-white left-0 group-hover:duration-500 py-px bottom-0 group-hover:w-full transition-all" />
              </li>
            ))}
          </ul>
        </div>
        <div className="pr-60 max-md:pr-0">
          <h3 className="text-base max-md:text-sm font-bold tracking-tight mb-4">
            Follow Us
          </h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.href} className="group relative w-fit">
                <Link
                  href={link.href}
                  className={`text-3xl max-md:text-lg font-semibold inline-block`}
                >
                  {link.name}
                </Link>
                <span className="absolute w-px group-hover:bg-white left-0 group-hover:duration-500 py-px bottom-0 group-hover:w-full transition-all" />
              </li>
            ))}
          </ul>
        </div>
        <div className="pr-10 max-md:pr-0 max-md:col-span-2 max-md:w-full">
          <h3 className="text-base max-md:text-sm font-bold tracking-tight mb-4">
            About Us
          </h3>
          <p className="text-base max-md:text-sm font-medium">
            Inistic Multimedia is the premier global ecosystem for the creative
            spirit. From the craft of the hand to the innovation of the screen,
            we provide a platform for diverse voices to tell stories that move
            the world.
          </p>
        </div>
      </div>
      <div>
        <hr className="my-10 border-gray-300" />
        <p className="text-center text-sm mb-5 font-medium">
          &copy; {new Date().getFullYear()} Inistic Multimedia. All rights
          reserved.
        </p>
      </div>
      <div className="relative bottom-0 h-30 sm:h-32 md:h-44 lg:h-56 xl:h-90 overflow-hidden w-full flex justify-center">
        <h1 className="absolute whitespace-nowrap text-[110px]/[120px] sm:text-[140px]/[150px] md:text-[210px]/[220px] lg:text-[300px]/[320px] xl:text-[400px]/[420px] tracking-[-0.05em] text-center font-semibold">
          INISTIC
        </h1>
      </div>
    </footer>
  );
}
