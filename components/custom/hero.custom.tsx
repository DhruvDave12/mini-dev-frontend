"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/AuthContext";

const Hero = () => {
  const { user, signInWithGoogle, signOut } = useContext(AuthContext);
  console.log("USER: ", user);
  signOut();
  return (
    <div className="w-full px-5 flex justify-center items-center my-10">
      <div className="w-1/2 mr-10">
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-center">
              Need a mini dev helper for your software development journey ?
            </h1>
            <p className="text-sm font-bold py-5 text-center font-light">
              Get Started with this free opensource service and give reviews to
              help us improve. Initially it is supporting majority of Web3
              services to help you around.
            </p>
            <Button className="w-1/2" onClick={signInWithGoogle}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-center items-center w-full">
          <Image
            src={require("@/assets/hero_image.svg")}
            alt="hero-image"
            className="w-3/4 h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
