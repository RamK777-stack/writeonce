import React from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

export default function SignupContainer() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-2);
  };
  return <Signup renderAsPage={true} goBack={goBack} />;
}
