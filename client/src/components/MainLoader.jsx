import React from "react";
import "../assets/css/Loader.css";
import { Loader } from "../assets";

const MainLoader = () => {
  return (
    <img
      src={Loader}
      alt=""
      className="flex items-center justify-center container w-24"
    />
  );
};

export default MainLoader;
