import { createContext, FC, PropsWithChildren } from "react";
import { Nullable } from "@shared/types/nullable.type.ts";
import usePersonalDetails from "@entities/user/hooks/usePersonalDetails.ts";
import { User } from "@entities/user/models/user.model.ts";

export interface UserContextProps {
  user: Nullable<User>;
}

export const UserContext = createContext<UserContextProps>({ user: null });

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: user } = usePersonalDetails();

  // ✅ Authentication enabled - show nothing until user data is loaded
  if (!user) return null;

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
