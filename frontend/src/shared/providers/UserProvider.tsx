import { createContext, FC, PropsWithChildren } from "react";
import { Nullable } from "@shared/types/nullable.type.ts";
import usePersonalDetails from "@entities/user/hooks/usePersonalDetails.ts";
import { User } from "@entities/user/models/user.model.ts";
import { isDevMode, mockDevUser } from "@shared/config/dev-mode.config.ts";

export interface UserContextProps {
  user: Nullable<User>;
}

export const UserContext = createContext<UserContextProps>({ user: null });

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: user } = usePersonalDetails();

  // Mode DEV : Utiliser le mock user
  if (isDevMode) {
    const devUser = user || mockDevUser;
    return <UserContext.Provider value={{ user: devUser }}>{children}</UserContext.Provider>;
  }

  // Mode normal : Attendre le chargement des données utilisateur
  if (!user) return null;

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
