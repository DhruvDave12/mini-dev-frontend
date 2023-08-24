"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { INavigationBarProps } from "@/types/navigation_bar.types";
import Link from "next/link";
import { ModeToggle } from "@/components/custom/theme-mode.custom";
import Image from "next/image";
import LogoImage from "@/assets/kh-logo.png";

const NavigationBar = ({ items }: INavigationBarProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-4 py-4">
          <div>
            <Image src={LogoImage} alt="logo" width={140} height={140}/>
          </div>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                {items?.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item?.links?.map((link, index) => (
                      <Link
                        href={link?.subLink}
                        key={index}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {link?.subName}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex justify-center items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
