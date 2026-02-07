import { MenuProps } from "antd/es/menu";
import { ReactNode } from "react";

export type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[] | ReactNode;
};
