import { useContext } from "react";
import { UserContext, UserContextProps } from "@shared/providers/UserProvider.tsx";

export const useUser = () => useContext(UserContext) as UserContextProps;
