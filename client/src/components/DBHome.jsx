import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../contexts/actions/productActions";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const desert = products?.filter((item) => item.product_category === "fruit");
  const thali = products?.filter((item) => item.product_category === "thali");
  const rice__bowl = products?.filter(
    (item) => item.product_category === "rice__bowl"
  );
  const khichdi = products?.filter(
    (item) => item.product_category === "khichdi"
  );
  const biryani = products?.filter(
    (item) => item.product_category === "biryani"
  );
  const beverage = products?.filter(
    (item) => item.product_category === "beverage"
  );

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "thali",
                  "rice__bowl",
                  "khichdi",
                  "biryani",
                  "fruit",
                  "beverage",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: [
                      thali?.length,
                      rice__bowl?.length,
                      khichdi?.length,
                      biryani?.length,
                      desert?.length,
                      beverage?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "Cancelled",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#e66464",
                      "#cf5a5a",
                      "#b85050",
                      "#733232",
                      "#5c2828",
                    ],

                    data: [40, 20, 80, 34, 54],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
