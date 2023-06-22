import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBellFill, BsSearchHeart, BsToggles2 } from "react-icons/bs";
import { buttonClick } from "../animation";
import { motion } from "framer-motion";
import { Avatar } from "../assets";
import { MdLogout } from "react-icons/md";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../contexts/actions/userActions";
import { app } from "../config/firebase.config";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
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
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-xl text-headingColor">
        Welcome {user?.name && <span>{`${user?.name}!`}</span>}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3 px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-md shadow-md">
            <BsSearchHeart className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Search here.."
              className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
            />
            <BsToggles2 className="text-gray-400 text-2xl" />
          </div>

          <motion.div
            {...buttonClick}
            className="w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <BsFillBellFill className="text-gray-400" />
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : Avatar}
                whileHover={{ scale: 1.1 }}
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              {...buttonClick}
              className="w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md shadow-md flex items-center justify-center"
            >
              <MdLogout className="text-gray-400 text-xl" onClick={signOut} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
