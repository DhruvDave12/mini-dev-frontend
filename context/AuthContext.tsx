"use client";

import React, { useState, useEffect, createContext } from "react";
import { IAuthContextProps } from "@/types/context.type";
import { IUserProps } from "@/types/user.type";
import { FIREBASE_AUTH, GOOGLE_PROVIDER } from "@/config/firebase-config";
import firebase from "firebase/compat/app";
import axiosInstance from "@/services/axiosInstance";

const AuthContext = createContext<IAuthContextProps>({
  user: null,
  signInWithGoogle: () => {},
  signOut: () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}



const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserProps | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user) {
        const trimmedUser: IUserProps = {
          uid: user.uid,
          email: user.email ? user.email : "NO EMAIL",
          displayName: user.displayName ? user.displayName : "Anonymous",
          photoURL: user.photoURL
            ? user.photoURL
            : require("@/assets/male_user.svg"),
        };

        const idToken = await user.getIdToken();
        const res = await axiosInstance.post("/user/auth/google", {
          idtoken: idToken,
        })
        if(res.status === 200 || res.status === 201) {
          const jwt = res.data;
          localStorage.setItem("@miniDev/token", jwt);
          setUser(trimmedUser);
          localStorage.setItem("@miniDev/authState", "true");
        }
      } else {
        setUser(null);
        localStorage.setItem("@miniDev/authState", "false");
      }
    });
  }, []);

  const signInWithGoogle = () => {
    FIREBASE_AUTH.signInWithPopup(GOOGLE_PROVIDER);
  };

  const signOut = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
