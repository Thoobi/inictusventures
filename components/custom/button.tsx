interface ButtonProps {
  title?: string;
  className?: string;
  onPress?: () => void;
  nature?: "button" | "submit" | "reset";
  inactive?: boolean;
}

export default function Button({ 
  title, 
  className, 
  onPress,
  nature = "button",
  inactive = false 
}: ButtonProps) {
  const disabledStyles = inactive ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button 
      type={nature}
      onClick={onPress}
      disabled={inactive}
      className={`${className} cursor-pointer ${disabledStyles}`}
    >
      {title}
    </button>
  );
}
