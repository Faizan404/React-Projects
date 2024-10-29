import React from "react";

const Button = ({ style, children }) => {
  return (
    <button style={style} className="p-4 rounded-full flex justify-evenly items-center tracking-widest my-8">
      {children}
    </button>
  );
};

export default Button;
