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
      href: "https://twitter.com/inictusmedia",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/inictusmedia",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/inictusmedia",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@inictusmedia",
    },
  ];

  return (
    <footer className="w-full bg-red-700 text-white pt-20 font-mono">
      <div className="container mx-auto grid grid-cols-3 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-3 pr-65 ">
          <h3 className="text-base font-bold tracking-tight">Navigation</h3>
          <ul className="space-y-2">
            {navlinks.map((link) => (
              <li key={link.href} className="group relative w-fit">
                <Link
                  href={link.href}
                  className={`text-3xl font-semibold inline-block`}
                >
                  {link.name}
                </Link>
                <span className="absolute w-px group-hover:bg-white left-0 group-hover:duration-500 py-px bottom-0 group-hover:w-full transition-all" />
              </li>
            ))}
          </ul>
        </div>
        <div className=" pr-60">
          <h3 className="text-base font-bold tracking-tight mb-4">Follow Us</h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.href} className="group relative w-fit">
                <Link
                  href={link.href}
                  className={`text-3xl font-semibold inline-block`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </Link>
                <span className="absolute w-px group-hover:bg-white left-0 group-hover:duration-500 py-px bottom-0 group-hover:w-full transition-all" />
              </li>
            ))}
          </ul>
        </div>
        <div className="pr-10">
          <h3 className="text-base font-bold tracking-tight mb-4">About Us</h3>
          <p className="text-base font-medium">
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
      <div className="relative bottom-0 h-80 overflow-hidden flex justify-center">
        <h1 className="text-[400px]/[480px] tracking-[-0.05em] text-center font-semibold absolute">
          INISTIC
        </h1>
      </div>
    </footer>
  );
}
