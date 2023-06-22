import React from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animation";
import { FaCheck } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { MdOutlineDangerous } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-300 shadow-md flex items-center gap-4"
      >
        <FaCheck className="text-xl text-emerald-700 " />
        <p className="text-xl">{message}</p>
      </motion.div>
    );
  }
  if (type === "danger") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-red-300 shadow-md flex items-center gap-4"
      >
        <MdOutlineDangerous className="text-xl text-red-700 " />
        <p className="text-xl">{message}</p>
      </motion.div>
    );
  }
  if (type === "info") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-yellow-300 shadow-md flex items-center gap-4"
      >
        <AiOutlineInfoCircle className="text-xl text-yellow-700 " />
        <p className="text-xl">{message}</p>
      </motion.div>
    );
  }
  if (type === "warning") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-4"
      >
        <CiWarning className="text-xl text-orange-700 " />
        <p className="text-xl">{message}</p>
      </motion.div>
    );
  }
};

export default Alert;
