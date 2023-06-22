import React, { useEffect, useState } from "react";
import { LoginBg, LogoLight } from "../assets";
import { LoginInput } from "../components";
import { BsFillEnvelopeFill, BsFillLockFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../contexts/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertWarning } from "../contexts/actions/alertActions";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    // needs to wait so async
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            // send this token to backend
            // create api by using axious and call api to validate token here
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true }); //prevents users to go back after successfull login
          });
        }
      });
    });
  };
  const signupWithEmailPass = async () => {
    if (userEmail === "" || Password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required fields should not be empty"));
    } else {
      if (Password === confirmPassword) {
        setuserEmail("");
        setconfirmPassword("");
        setPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          Password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                // send this token to backend
                // create api by using axious and call api to validate token here
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true }); //prevents users to go back after successfull login
              });
            }
          });
        });
        // console.log("equal");
      } else {
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };
  //action

  //reducer

  //store - globalized store

  // dispatch

  const signInWithEmailPass = async () => {
    if (userEmail != "" && Password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, Password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                // send this token to backend
                // create api by using axious and call api to validate token here
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true }); //prevents users to go back after successfull login
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-row">
      {/* background image */}
      <img
        src={LoginBg}
        alt="Login__Background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/* content box */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-0 backdrop-blur-md p-4 px-4 py-12">
        {/* top logo */}
        <div className="flex items-center justify-center w-full">
          <img src={LogoLight} className="w-[60%]" alt="" />
        </div>

        {/* Welcome text */}
        <div className="text-3xl font-semibold text-headingColor mt-4">
          Welcome Back
        </div>
        <div className="text-l text-center text-headingColor mt-1">
          {!isSignup ? "Sign In" : "Sign up"} with the following
        </div>

        {/* input section */}
        <div className="w-full flex flex-col justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder="Email here"
            icon={<BsFillEnvelopeFill className="text-xl text-textColor " />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type="email"
            isSignup={isSignup}
          />
          <LoginInput
            placeholder="Password here"
            icon={<BsFillLockFill className="text-xl text-textColor " />}
            inputState={Password}
            inputStateFunc={setPassword}
            type="password"
            isSignup={isSignup}
          />
          {isSignup && (
            <LoginInput
              placeholder="Confirm Password"
              icon={<BsFillEnvelopeFill className="text-xl text-textColor " />}
              inputState={confirmPassword}
              inputStateFunc={setconfirmPassword}
              type="password"
              isSignup={isSignup}
            />
          )}

          {!isSignup ? (
            <p>
              Doesn't have an Account?{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400"
                cursor="pointer"
                onClick={() => setIsSignup(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an Account?{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400"
                cursor="pointer"
                onClick={() => setIsSignup(false)}
              >
                Sign in here
              </motion.button>
            </p>
          )}
          {/* if Not means its false ; by deafult false */}
          {/* if ? (true) do this if : (false) do this */}

          {/* Button Section */}
          {!isSignup ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-light text-xl capitalize hover:bg-red-500 transition-all duaration-150"
              onClick={signInWithEmailPass}
            >
              Sign In
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-light text-xl capitalize hover:bg-red-500 transition-all duaration-150"
              onClick={signupWithEmailPass}
            >
              Sign Up
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="w-24 h-[1px] round-md bg-light"></div>
          <div className="text-light "> OR </div>
          <div className="w-24 h-[1px] round-md bg-light"></div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-3 mt-2"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="text-base "> Sign in with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
