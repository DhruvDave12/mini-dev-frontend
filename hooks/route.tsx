"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export const withPublic = (Component: any) => {
  return function WithPublic(props: any) {
    const auth = useContext(AuthContext);
    const router = useRouter();
    if (auth.user) {
      router.replace("/chat");
      return <Loader />;
    }
    return <Component auth={auth} {...props} />;
  };
};
