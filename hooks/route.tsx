"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

// TODO -> PERSISTING THE AUTH STATE IN LOCAL IS A TEMP FIX PLEASE SOLVE THE LOCATION NOT FOUND ERROR

export const withPublic = (Component: any) => {
  return function WithPublic(props: any) {
    const auth = useContext(AuthContext);
    const router = useRouter();
    if (auth.user || localStorage.getItem("@miniDev/authState") === "true") {
      router.replace("/chat");
      return <Loader />;
    }
    return <Component auth={auth} {...props} />;
  };
};

export const withPrivate = (Component: any) => {
  return function WithPrivate(props: any) {
    const auth = useContext(AuthContext);
    const router = useRouter();
    if (
      !auth.user ||
      !localStorage.getItem("@miniDev/authState") ||
      localStorage.getItem("@miniDev/authState") === "false"
    ) {
      router.replace("/");
      return <Loader />;
    }
    return <Component auth={auth} {...props} />;
  };
};
