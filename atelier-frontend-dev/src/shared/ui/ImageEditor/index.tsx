import { Optional } from "@shared/types/optional.type.ts";
import { ImageEditorTheme } from "@shared/ui/ImageEditor/theme";
import { dataURLtoFile } from "@shared/ui/ImageEditor/utils.ts";
import Loading from "@shared/ui/Loading";
import { imageUrlToFile } from "@shared/utils/image/image-url-to-file.ts";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import TuiImageEditor from "tui-image-editor";

import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "./styles.scss";

export interface ImageEditorActions {
  getImage: () => Optional<File>;
  setImage: (url: string) => void;
}

interface ImageEditorProps {
  imageUrl: string;
  onChange?: (file: File) => void;
  onEditorReady?: (isReady: boolean) => void;
  width?: number;
  height?: number;
}

const ImageEditor = (
  { imageUrl, height = 600, onEditorReady }: ImageEditorProps,
  actionsRef: ForwardedRef<ImageEditorActions>,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tuiImageEditor, setTuiImageEditor] = useState<TuiImageEditor>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTuiImageEditor(
      new TuiImageEditor(ref.current!, {
        includeUI: {
          loadImage: {
            path: imageUrl,
            name: "SampleImage",
          },
          menuBarPosition: "bottom",
          menu: ["draw", "text", "shape"],
          theme: ImageEditorTheme,
          uiSize: {
            width: `100%`,
            height: `${height + 50}px`,
          },
          // @ts-ignore
          locale: {
            Delete: "Delete selected",
            DeleteAll: "Delete all",
          },
        },
        cssMaxWidth: window.innerWidth,
        cssMaxHeight: height - 230,
        usageStatistics: false,
      }),
    );
  }, []);

  const loadImage = async () => {
    if (tuiImageEditor) {
      setIsLoading(true);
      const file = await imageUrlToFile(imageUrl, "SampleImage");
      tuiImageEditor?.loadImageFromFile(file);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImage();

    return () => {
      tuiImageEditor?.destroy();
    };
  }, [tuiImageEditor]);

  useEffect(() => {
    if (!isLoading) onEditorReady?.(true);
  }, [isLoading]);

  useImperativeHandle(
    actionsRef,
    () => ({
      getImage: () => {
        if (tuiImageEditor) {
          const dataUrl = tuiImageEditor.toDataURL();
          if (dataUrl) {
            return dataURLtoFile(dataUrl);
          }
        }
      },
      setImage: async (url: string) => {
        if (tuiImageEditor) {
          setIsLoading(true);
          await tuiImageEditor.loadImageFromURL(url, "SampleImage1");
          setIsLoading(false);
        }
      },
    }),
    [tuiImageEditor],
  );

  return (
    <div className={isLoading ? `tui-image-editor-container__loading` : undefined}>
      <div id="tui-image-editor" ref={ref}></div>
      {isLoading && <Loading />}
    </div>
  );
};

export default forwardRef<ImageEditorActions, ImageEditorProps>(ImageEditor);
