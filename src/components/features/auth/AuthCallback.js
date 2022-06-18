import React, {useState, useEffect} from "react"
import {useQuery} from "./hooks"
import loading from "../../../assets/images/loading.gif"
import invalidToken from "../../../assets/images/sadEmoji.gif"
import {login, openModal, googleSignin} from "./AuthSlice"
import {useDispatch} from "react-redux"
import {URL_PATH} from "../../../utils/urlPath"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import Image from "next/image"

function AuthCallback() {
  const [isValidToken, setIsValidToken] = useState(true)
  const query = useQuery()
  const router = useRouter()
  const dispatch = useDispatch()
  const token = query.get("loginToken")

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
        toast.error("Invalid token... Please try again")
        dispatch(openModal())
        setIsValidToken(false)
      }
    }
    if (router.pathname.includes("auth/google")) {
      handleLoginWithGoogle(queryParams)
    } else {
      if (token) {
        handleLogin(token)
      } else {
        dispatch(openModal())
        setIsValidToken(false)
      }
    }
  }, [query, token]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-xl text-bold text-gray-700 mt-5">
          {!isValidToken ? "Invalid token" : "Authenticating"}...
        </h2>
      </div>
      <div className="flex justify-center mt-3">
        <Image
          className="h-8 w-8 ml-2 rounded-lg"
          src={!isValidToken ? invalidToken : loading}
          alt="loading"
          height={200}
          width={200}
        />
      </div>
      {!isValidToken && (
        <p
          className="flex text-lg cursor-pointer justify-center text-blue-600 mt-5"
          onClick={() => {
            router.push(URL_PATH.SIGN_IN)
          }}
        >
          Try again
        </p>
      )}
    </>
  )
}

export default AuthCallback
