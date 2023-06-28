import React, { useEffect } from "react";
import {
  FilterSection,
  Header,
  Home,
  HomeSlider,
  MainLoader,
} from "../components";
import { Loader, LoginBg, LogoLight } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../contexts/actions/productActions";
import { getAllProducts } from "../api";

const Main = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products || products.length === 0) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen flex items-start justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-24 2xl:px-96 gap-12 pb-24">
        {products && products.length > 0 ? (
          <>
            <Home />
            <HomeSlider />
            <FilterSection />
          </>
        ) : (
          <MainLoader />
        )}
      </div>
    </main>
  );
};

export default Main;
