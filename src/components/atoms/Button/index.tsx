import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large" | "fab" | "outline" | "filter";
  disable?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, onClick, size, disable, type }: ButtonProps) => {
  // handle size
  let sizeClass = "";
  switch (size) {
    case "small":
      sizeClass =
        "px-2 py-3 text-xs rounded-[17px] text-white hover:bg-red-400 ";
      break;

    case "filter":
      sizeClass =
        "px-2 py-3 w-[40px] h-[40px] text-xs rounded-[10px] ite text-white hover:bg-red-400 ";
      break;
    case "medium":
      sizeClass =
        "px-10 py-3 text-sm rounded-[12px] text-white hover:bg-red-400 ";
      break;
    case "outline":
      sizeClass =
        "px-10 py-3 text-sm rounded-[12px] border border-brandColor bg-transparent text-brandColor";
      break;
    case "large":
      sizeClass =
        "px-6 py-4 text-[15px] w-full rounded-[10px] text-white hover:bg-red-400 ";
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
      className={`bg-brandColor flex  items-center justify-center  shadow-2xl shadow-slate-400  font-bold ${sizeClass} disabled:opacity-25`}
      disabled={disable}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
