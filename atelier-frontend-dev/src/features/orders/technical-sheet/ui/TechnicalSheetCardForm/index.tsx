import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { CadDetails } from "@entities/order/models/cad-details.model.ts";
import { FC, useEffect } from "react";
import Input from "antd/es/input";
import DataDisplay from "@shared/ui/DataDisplay";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

interface Props {
  cadDetails?: CadDetails;
  technicalSheet?: TechnicalSheetMetadata;
  editing: boolean;
  dimension?: number;
  isRing?: boolean;
}

const TechnicalSheetCardForm: FC<Props> = ({ cadDetails, technicalSheet, isRing, editing, dimension }) => {
  const form = useFormInstance();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        cadImages: cadDetails?.cadImages,
        generalNote: technicalSheet?.generalNote,
        castingPartsImages: cadDetails?.castingPartsImages,
      });
    }
  }, [form, cadDetails, technicalSheet, editing]);

  return (
    <Flex vertical>
      <Flex gap={24}>
        <Form.Item name="cadImages" label="Finished" className="image-container">
          <Image width={300} height={300} src={cadDetails?.cadImages} size={ImageSize.Compressed} />
        </Form.Item>

        <Form.Item name="generalNote" label="General note" style={{ flex: 1 }}>
          {editing ? (
            <Input.TextArea
              maxLength={300}
              size="large"
              placeholder="General note"
              style={{
                height: 300,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          ) : (
            <DataDisplay variant="common">{technicalSheet?.generalNote}</DataDisplay>
          )}
        </Form.Item>
      </Flex>

      <Flex gap={24}>
        <Form.Item name="castingPartsImages" label="Casting parts" className="image-container">
          <Image width={300} height={300} src={cadDetails?.castingPartsImages} size={ImageSize.Compressed} />
        </Form.Item>

        <Flex vertical gap={26}>
          {isRing ? (
            <Form.Item label="Size" name="fingerSize">
              <DataDisplay>{dimension}</DataDisplay>
            </Form.Item>
          ) : (
            <Form.Item label="Length" name="length">
              <DataDisplay>{dimension}</DataDisplay>
            </Form.Item>
          )}

          <Form.Item name="stlCount" label="Total pieces">
            <DataDisplay>{cadDetails?.stlCount}</DataDisplay>
          </Form.Item>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TechnicalSheetCardForm;
