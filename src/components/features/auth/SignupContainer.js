import React from "react";
import Signup from "./Signup";
import { useRouter } from 'next/router'

export default function SignupContainer() {
  const router = useRouter();
  const goBack = () => {
    // navigate(-2);
    router.back()
  };
  return <Signup renderAsPage={true} goBack={goBack} />;
}
