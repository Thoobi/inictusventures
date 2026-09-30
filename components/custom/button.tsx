import Link from "next/link";

interface ButtonProps {
  title?: string;
  className?: string;
  href?: string;
}
export default function Button({ title, className, href }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${className} cursor-pointer`}>
        {title}
      </Link>
    );
  }
  return <button className={`${className} cursor-pointer`}>{title}</button>;
}
