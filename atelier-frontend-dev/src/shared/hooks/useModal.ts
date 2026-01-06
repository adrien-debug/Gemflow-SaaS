import { ModalContext, ModalContextProps } from "@shared/providers/ModalProvider.tsx";
import { useContext } from "react";

const useModal = () => useContext(ModalContext) as ModalContextProps;

export default useModal;
