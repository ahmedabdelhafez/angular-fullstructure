import { ChildMenu } from "./ChildMenu";

export interface MenuItems {
  id?: number;
  name?: string;
  icon?: string;
  link?: string;
  bgColor?: String;
  // used to add child items to menu may be [li]
  childmenu?: MenuItems[];
}
