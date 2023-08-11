export interface INavigationSubItems {
  subName: string;
  subLink: string;
}
export interface INavigationBarItem {
  name: string;
  links: INavigationSubItems[];
}

export interface INavigationBarProps {
  items: INavigationBarItem[];
}
