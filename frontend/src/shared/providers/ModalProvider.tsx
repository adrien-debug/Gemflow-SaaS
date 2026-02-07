import { createContext, FC, PropsWithChildren, ReactNode } from "react";
import useModal from "antd/es/modal/useModal";

export interface ModalContextProps {
  modalApi: ReturnType<typeof useModal>[0];
  contextHolder: ReactNode;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalApi, contextHolder] = useModal();
  return <ModalContext.Provider value={{ modalApi, contextHolder }}>{children}</ModalContext.Provider>;
};
