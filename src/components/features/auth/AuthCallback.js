import React, {useState, useEffect} from "react"
import {useQuery} from "./hooks"
import loading from "../../../assets/images/loading.gif"
import invalidToken from "../../../assets/images/sad.gif"
import {login, openModal, googleSignin} from "./AuthSlice"
import {useDispatch} from "react-redux"
import {URL_PATH} from "../../../utils/urlPath"
import { useRouter } from 'next/router'

function AuthCallback() {
  const [isValidToken, setIsValidToken] = useState(true)
  const query = useQuery()
  const router = useRouter()
  const dispatch = useDispatch()
  const token = query["loginToken"]

  useEffect(() => {
    const queryParams = query.toString()
    const handleLoginWithGoogle = async queryParams => {
      try {
        await dispatch(googleSignin(queryParams)).unwrap()
        router.push(URL_PATH.POST)
      } catch (e) {
        dispatch(openModal())
        setIsValidToken(false)
      }
    }
    const handleLogin = async token => {
      try {
        await dispatch(login(token)).unwrap()
        router.push(URL_PATH.POST)
      } catch (e) {
        dispatch(openModal())
        setIsValidToken(false)
      }
    }
    if (router.pathname.includes("auth/google")) {
      handleLoginWithGoogle(queryParams)
    } else {
      console.log(token,'1111');
      if (token) {
        handleLogin(token)
      } else {
        alert("Invalid token")
        dispatch(openModal())
        setIsValidToken(false)
      }
    }
  }, [query, token]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex justify-center mt-20">
        <h2 className="text-xl text-bold text-gray-700">
          {!isValidToken ? "Invalid token" : "Authenticating"}...
        </h2>
        <img
          className="h-8 w-8 ml-2"
          src={!isValidToken ? invalidToken : loading}
          alt="loading"
        />
      </div>
      {!isValidToken && (
        <p
          className="flex text-lg cursor-pointer justify-center text-blue-600 mt-5"
          onClick={() => {
            dispatch(openModal())
          }}
        >
          Try again
        </p>
      )}
    </>
  )
}

export default AuthCallback
