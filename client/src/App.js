import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { validateUserJWTToken } from "./api";
import { setUserDetails } from "./contexts/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animation";
import "./assets/css/Loader.css";
import { Alert, MainLoader } from "./components";

const App = () => {
  const firebaseAuth = getAuth(app);

  const [isLoading, setIsLoading] = useState(false);

  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          // send this token to backend
          // create api by using axious and call api to validate token here
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-light backdrop-blur-md flex items-center justify-center w-full" //change bg-card if you find new loader
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
      {/* The ?. is called the optional chaining operator in JavaScript. It is used
      to safely access properties of an object without causing an error if the
      property or any intermediate property is undefined or null.
      alert?.type is using the optional chaining operator to access the type property of the
      alert object. If the alert object is undefined or null, or if the type
      property does not exist, it will gracefully return undefined instead of
      throwing an error. */}
    </div>
  );
};

export default App;
