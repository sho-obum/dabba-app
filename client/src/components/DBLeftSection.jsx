import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../util/style";

const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-cardOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink
        to={"/"}
        className="flex flex-col items-start justify-start gap-4 px-6"
      >
        <img src={Logo} className="w-20" alt="" />
        <p className="font-semibold text-xl -mt-4">Dabba</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/newItem"}
        >
          Add New Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>
      <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3 ">
          <div className="w-12 h-12 border bg-light rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble? Please contact us for more information
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
