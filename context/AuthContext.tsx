"use client";

import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "@/config/firebase-config";
import { IAuthContextProps } from "@/types/context.type";

const AuthContext = createContext<IAuthContextProps>({
  user: null,
  signInWithGoogle: () => {},
  signOut: () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FIREBASE_AUTH = firebase.auth();
const GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();
GOOGLE_PROVIDER.setCustomParameters({ prompt: "select_account" });

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
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
