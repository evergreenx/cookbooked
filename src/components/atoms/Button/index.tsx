import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large" | "fab";
  disable?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  onClick,
  size,
  disable,
  type,
}: ButtonProps) => {
  // handle size
  let sizeClass = "";
  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-xs rounded-[12px]";
      break;
    case "medium":
      sizeClass = "px-4 py-2 text-sm rounded-[12px]";
      break;
    case "large":
      sizeClass = "px-6 py-4 text-[15px] w-full rounded-[10px]";
      break;
    case "fab":
      sizeClass = " w-[42px] h-[42px]  text-[14.06px] rounded-full";
      break;
    default:
      sizeClass = "px-4 py-2 text-sm";
      break;
  }

  return (
    <button
      className={`bg-brandColor  mx-auto hover:bg-red-400 flex items-center justify-center shadow-2xl shadow-slate-400 text-white font-bold ${sizeClass} disabled:opacity-25`}
      disabled={disable}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;