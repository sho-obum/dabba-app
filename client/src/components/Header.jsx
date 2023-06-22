import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../util/style";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animation";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../contexts/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setisMenu] = useState(false);
  const firebase = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebase
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink
        to={"/"}
        className="flex flex-col items-center justify-center gap-4"
      >
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-lg -mt-4">Dabba</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-6">
        <ul className="hidden md:flex items-center justify-center gap-10">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>
        <motion.div {...buttonClick} className="relative cursor-pointer">
          <RiShoppingBasketLine className="text-3xl text-textColor" />
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1">
            <p className="text-primary ">2</p>
          </div>
        </motion.div>
        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setisMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.1 }}
                  referrerPolicy="no-referrer"
                ></motion.img>
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setisMenu(false)}
                  className="px-6 py-4 w-[11rem] bg-cardOverlay backdrop-blur-md rounded-md shadow-lg absolute top-12 right-0 flex flex-col gap-4"
                >
                  <Link
                    className="hover:text-red-500 text-l text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="hover:text-red-500 text-l text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-l text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />

                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded=md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                  >
                    <MdLogout className="text-xl text-textColor group-hover::text-headingColor" />
                    <p>Sign Out</p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-red-300 cursor-pointer "
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
