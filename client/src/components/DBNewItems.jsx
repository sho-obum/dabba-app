import React, { useState } from "react";
import { statuses } from "../util/style";
import { Spinner } from "../components";
import { FaCloudUploadAlt } from "react-icons/fa";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../contexts/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";
import { MdDelete } from "react-icons/md";

const DBNewItems = () => {
  const [ItemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploded to the cloud"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);
    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image removed from the cloud"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };
  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeholder={"Item name here"}
          stateFunc={setItemName}
          stateValue={ItemName}
        />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap mt-2">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-5 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-slate-50"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <InputValueField
          type="number"
          placeholder={"Item price here"}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-center w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress{"  "}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full transition-all duration-300 ease-in-out">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width:
                          progress != null ? `${Math.round(progress)}%` : "0%",
                      }}
                    ></div>
                  </div>
                  <span className="text-base font-medium text-textColor">
                    {Math.round(progress > 0) && (
                      <>{`${Math.round(progress)}%`}</>
                    )}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <p className="font-bold text-4xl">
                        <FaCloudUploadAlt className="-rotate-0" />
                      </p>
                      <p className="text-lg text-textColor">
                        Click to upload an Image
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    name="upload-image"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  ></input>
                </label>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className="w-full h-full object-cover"
                    ></motion.img>
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0 text-slate-50" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cardOverlay shadow-md outline-none rounded-md border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};
export default DBNewItems;
