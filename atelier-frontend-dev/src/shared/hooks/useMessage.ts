import { useContext } from "react";
import { MessageContext, MessageContextProps } from "@shared/providers/MessageProvider.tsx";

export const useMessage = () => useContext(MessageContext) as MessageContextProps;
