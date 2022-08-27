import React from "react";
import { ReactWithChildren } from "../../../types";

const Modal: ReactWithChildren = ({ children }) => {
  return (
    <div className="absolute grid place-items-center bg-white/60 backdrop-blur-lg h-screen w-screen z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div>{children}</div>
    </div>
  );
};

export default Modal;
