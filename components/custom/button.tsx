interface ButtonProps {
  title?: string;
  className?: string;
}
export default function Button({ title, className }: ButtonProps) {
  return <button className={`${className} cursor-pointer`}>{title}</button>;
}
