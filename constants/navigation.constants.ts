import {
  INavigationBarItem,
  INavigationSubItems,
} from "@/types/navigation_bar.types";

export const NAVIGATION_ITEMS: INavigationBarItem[] = [
  {
    name: "Home",
    links: [
      {
        subName: "Home",
        subLink: "/",
      },
    ] as INavigationSubItems[],
  },
  {
    name: "About",
    links: [
      {
        subName: "About",
        subLink: "/about",
      },
    ] as INavigationSubItems[],
  },
  {
    name: "Contact",
    links: [
      {
        subName: "Contact",
        subLink: "/contact",
      },
    ] as INavigationSubItems[],
  },
];
