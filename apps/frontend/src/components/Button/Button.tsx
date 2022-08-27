import React from "react";
import { ReactWithChildren } from "../../../types";

interface IButton {
  onClick: () => void;
  variant?: "default" | "primary" | "danger" | "outlined";
  isSelected?: boolean;
}

const Button: ReactWithChildren<IButton> = ({
  children,
  onClick,
  variant,
  isSelected,
}) => {
  const variants = {
    default: "bg-gradient-to-r from-red-500 to-blue-500 text-white",
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
    outlined: `border border-blue-500  ${
      isSelected ? "bg-blue-500 text-white" : "text-blue-500"
    }`,
  };

  return (
    <div
      onClick={onClick}
      className={`hover:opacity-75 ${
        variants[variant || "default"]
      } px-10 py-3 rounded-lg font-bold cursor-pointer text-center`}
    >
      {children}
    </div>
  );
};

export default Button;
