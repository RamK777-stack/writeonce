import React, { useState, useEffect } from "react";
import { useQuery } from "./hooks";
import loading from "../../../assets/images/loading.gif";
import invalidToken from "../../../assets/images/sad.gif";
import { login, openModal } from "./AuthSlice";
import { useDispatch } from "react-redux";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { URL_PATH } from "../../../utils/urlPath";

function AuthCallback() {
  const [isValidToken, setIsValidToken] = useState(true);
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(query.get("loginToken"));
  const token = query.get("loginToken");

  useEffect(async () => {
    if (token) {
      try {
        await dispatch(login(token)).unwrap();
        console.log(";;;;;;;;;;;;");
        navigate(URL_PATH.POST);
      } catch (e) {
        dispatch(openModal());
        setIsValidToken(false);
        console.log(e);
      }
    } else {
      alert("Invalid token");
      dispatch(openModal());
      setIsValidToken(false);
    }
  }, []);

  console.log(isValidToken, "111111111111");
  return (
    <>
      <div className="flex justify-center mt-20">
        <h2 className="text-xl text-bold text-gray-700">
          {!isValidToken ? "Invalid token" : "Authenticating"}...
        </h2>
        <img
          className="h-8 w-8 ml-2"
          src={!isValidToken ? invalidToken : loading}
        />
      </div>
      {!isValidToken && (
        <p
          className="flex text-lg cursor-pointer justify-center text-blue-600 mt-5"
          onClick={() => {
            dispatch(openModal());
          }}
        >
          Try again
        </p>
      )}
    </>
  );
}

export default AuthCallback;
