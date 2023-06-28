import React from "react";
import { buttonClick } from "../animation";
import { HiCurrencyRupee } from "react-icons/hi";
import { IoBasketOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { addNewItemToCart, getAllCartItems } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { alertNull, alertSuccess } from "../contexts/actions/alertActions";
import { setCartItems } from "../contexts/actions/cartAction";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    addNewItemToCart(user?.user_id, data).then((res) => {
      dispatch(alertSuccess("Added to Cart"));
      getAllCartItems(user?.user_id).then((items) => {
        // Remove 'data' parameter
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  // Enclose data and index in parentheses
  return (
    <div className="bg-cardOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3 ">
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className="relative pt-12">
        <div className="relative pt-12">
          <p className="text-xl text-headingColor font-semibold">
            {data.product_name}
          </p>
          <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
            <HiCurrencyRupee className="text-red-500" />{" "}
            {parseFloat(data.product_price).toFixed(2)}
          </p>
          <motion.div
            onClick={sendToCart}
            {...buttonClick}
            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
          >
            <IoBasketOutline className="text-xl text-slate-50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
