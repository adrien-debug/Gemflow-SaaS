import ImageUpload, { ImageUploadProps } from "@shared/ui/form/ImageUpload";
import FormItem from "antd/es/form/FormItem";
import { FC } from "react";

interface Props extends ImageUploadProps {}

export const FinalProductImagePickerItem: FC<Props> = ({ ...rest }) => {
  return (
    <FormItem style={{ flex: 0 }} label="Final product image" name="productImages">
      <ImageUpload imageSize={200} {...rest} />
    </FormItem>
  );
};
