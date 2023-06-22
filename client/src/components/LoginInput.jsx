import React, { useState } from "react";
import { icon } from "react-icons/lib";
import { motion } from "framer-motion";
import { fadeInOut } from "../animation";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignup,
  isSignin,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full px-4 py-22 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-full bg-transparent text-textColor text-lg font-semibold border-none outline-none p-4 `}
        value={inputState}
        onChange={(e) => {
          inputStateFunc(e.target.value);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
