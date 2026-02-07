import { ImageSize } from "@shared/constants/image.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { getImageUrls } from "@shared/utils/image/get-image-urls.ts";
import AntdImage, { ImageProps as AntdImageProps } from "antd/es/image";
import { FC } from "react";
import "./styles.scss";
import Flex from "antd/es/flex";
import FileImageTwoTone from "@ant-design/icons/lib/icons/FileImageTwoTone";
import { EyeOutlined } from "@ant-design/icons";

interface ImageProps extends Omit<AntdImageProps, "src"> {
  size?: ImageSize;
  src?: ImageMetadata[];
  url?: string;
  bordered?: boolean;
  boxRadius?: string;
  noCache?: boolean;
}

const Image: FC<ImageProps> = ({ url, src, width, height, size, boxRadius, bordered = true, noCache, ...rest }) => {
  const { originalUrl, imageUrl } = getImageUrls(src, size, noCache);

  return (
    <Flex
      className={bordered ? "image" : ""}
      style={{ width, height, borderRadius: boxRadius }}
      align="center"
      justify="center">
      {!src?.length && !url ? (
        <FileImageTwoTone className="image-icon" />
      ) : (
        <AntdImage
          src={url || imageUrl || originalUrl}
          preview={{
            src: url || originalUrl || imageUrl,
            mask: <EyeOutlined style={{ fontSize: 16 }} />,
          }}
          width={width}
          height={height}
          {...rest}
        />
      )}
    </Flex>
  );
};

export default Image;
