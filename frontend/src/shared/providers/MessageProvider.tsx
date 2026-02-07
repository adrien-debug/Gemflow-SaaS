import message from "antd/es/message";
import { createContext, FC, PropsWithChildren, ReactNode } from "react";

export interface MessageContextProps {
  messageApi: ReturnType<typeof message.useMessage>[0];
  contextHolder: ReactNode;
}

export const MessageContext = createContext({} as MessageContextProps);

export const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return <MessageContext.Provider value={{ messageApi, contextHolder }}>{children}</MessageContext.Provider>;
};
