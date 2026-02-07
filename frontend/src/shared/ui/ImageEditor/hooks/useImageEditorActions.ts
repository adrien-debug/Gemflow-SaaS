import { ImageEditorActions } from "@shared/ui/ImageEditor";
import { useRef } from "react";

export const useImageEditorActions = () => useRef<ImageEditorActions>(null);
