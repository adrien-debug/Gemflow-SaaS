import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { CadDetails } from "@entities/order/models/cad-details.model.ts";
import { FC, useEffect } from "react";
import ImageUpload from "@shared/ui/form/ImageUpload";
import Input from "antd/es/input";
import DataDisplay from "@shared/ui/DataDisplay";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { getFieldValue, getImageSrc } from "@features/orders/technical-sheet/utils/get-mounting-card-values.ts";

interface Props {
  cadDetails?: CadDetails;
  technicalSheet?: TechnicalSheetMetadata;
  onStartImageLoad: () => void;
  onEndImageLoad: () => void;
  variant: "first" | "second";
  editing: boolean;
}

const MountingCardForm: FC<Props> = ({ onStartImageLoad, onEndImageLoad, variant, editing, technicalSheet }) => {
  const form = useFormInstance();

  const getFieldNumber = (baseNumber: number) => (variant === "first" ? baseNumber : baseNumber + 2);

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({ ...technicalSheet });
    }
  }, [form, technicalSheet, editing]);

  return (
    <Flex vertical>
      <Flex gap={24}>
        <Form.Item
          name={`mounting${getFieldNumber(1)}Images`}
          label={`Mounting ${getFieldNumber(1)}`}
          className="image-container">
          {editing ? (
            <ImageUpload imageSize={300} onStartLoading={onStartImageLoad} onFinishLoading={onEndImageLoad} />
          ) : (
            <Image
              width={300}
              height={300}
              src={getImageSrc(getFieldNumber(1), technicalSheet)}
              size={ImageSize.Compressed}
            />
          )}
        </Form.Item>

        <Form.Item
          name={`mountingNote${getFieldNumber(1)}`}
          label={`Mounting note ${getFieldNumber(1)}`}
          style={{ flex: 1 }}>
          {editing ? (
            <Input.TextArea
              maxLength={300}
              size="large"
              placeholder="Add note"
              style={{
                height: 300,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          ) : (
            <DataDisplay variant="common">{getFieldValue(getFieldNumber(1), technicalSheet)}</DataDisplay>
          )}
        </Form.Item>
      </Flex>

      <Flex gap={24}>
        <Form.Item
          name={`mounting${getFieldNumber(2)}Images`}
          label={`Mounting ${getFieldNumber(2)}`}
          className="image-container">
          {editing ? (
            <ImageUpload imageSize={300} onStartLoading={onStartImageLoad} onFinishLoading={onEndImageLoad} />
          ) : (
            <Image
              width={300}
              height={300}
              src={getImageSrc(getFieldNumber(2), technicalSheet)}
              size={ImageSize.Compressed}
            />
          )}
        </Form.Item>

        <Form.Item
          name={`mountingNote${getFieldNumber(2)}`}
          label={`Mounting note ${getFieldNumber(2)}`}
          style={{ flex: 1 }}>
          {editing ? (
            <Input.TextArea
              maxLength={300}
              size="large"
              placeholder="Add note"
              style={{
                height: 300,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          ) : (
            <DataDisplay variant="common">{getFieldValue(getFieldNumber(2), technicalSheet)}</DataDisplay>
          )}
        </Form.Item>
      </Flex>
    </Flex>
  );
};

export default MountingCardForm;
