import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { CadDetails } from "@entities/order/models/cad-details.model.ts";
import { FC, useEffect } from "react";
import Input from "antd/es/input";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

interface Props {
  cadDetails?: CadDetails;
  technicalSheet?: TechnicalSheetMetadata;
  editing: boolean;
}

const SettingCardForm: FC<Props> = ({ cadDetails, technicalSheet, editing }) => {
  const form = useFormInstance();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        diamondMapImages: cadDetails?.diamondMapImages,
        settingNote: technicalSheet?.settingNote,
      });
    }
  }, [form, technicalSheet, editing, cadDetails]);

  return (
    <Flex vertical gap={32}>
      <Flex vertical>
        <Form.Item name="diamondMapImages" label="Diamonds map" className="image-container">
          <Image width={530} height={530} src={cadDetails?.diamondMapImages} size={ImageSize.Compressed} />
        </Form.Item>

        <Form.Item name="settingNote" label="Setting note">
          {editing ? (
            <Input.TextArea
              maxLength={300}
              size="large"
              placeholder="Add note"
              style={{
                height: 90,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          ) : (
            <DataDisplay variant="common">{technicalSheet?.settingNote}</DataDisplay>
          )}
        </Form.Item>
      </Flex>
    </Flex>
  );
};

export default SettingCardForm;
