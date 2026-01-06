import "./styles.scss";
import Form, { FormInstance } from "antd/es/form";
import { FC } from "react";
import { CadDetailsFormFields } from "@features/orders/cad-details/models/cad-details-form.model.ts";
import ImageUpload from "@shared/ui/form/ImageUpload";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Col from "antd/es/col";
import FileList from "@shared/ui/form/FileList";
import DataDisplay from "@shared/ui/DataDisplay";
import { CadDetails } from "@entities/order/models/cad-details.model.ts";
import Image from "@shared/ui/Image";
import InputNumber from "antd/es/input-number";

interface Props {
  form: FormInstance<CadDetailsFormFields>;
  onFinish?: (values: CadDetailsFormFields) => void;
  cadDetails?: CadDetails;
  editing?: boolean;
  onStartFileLoad?: () => void;
  onEndFileLoad?: () => void;
  onStartImageLoad?: () => void;
  onEndImageLoad?: () => void;
}

const CadDetailsForm: FC<Props> = ({
  form,
  onFinish,
  editing,
  onStartFileLoad,
  onEndFileLoad,
  cadDetails,
  onStartImageLoad,
  onEndImageLoad,
}) => {
  const handleFinish = (values: CadDetailsFormFields) => {
    onFinish?.(values);
  };

  return (
    <Form className="cad-details-form" form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
      <Flex vertical gap={24}>
        <Flex gap={24}>
          <Form.Item<CadDetailsFormFields> name="cadImages" label="CAD image">
            {editing ? (
              <ImageUpload onStartLoading={onStartImageLoad} onFinishLoading={onEndImageLoad} />
            ) : (
              <Image width={220} height={220} src={cadDetails?.cadImages} />
            )}
          </Form.Item>

          <Flex vertical flex={1}>
            <Row gutter={44}>
              <Col span={12}>
                <Form.Item<CadDetailsFormFields> name="stlCount" label="Number of STLs">
                  {editing ? (
                    <InputNumber
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Enter number of STLs"
                      maxLength={10}
                      min={1}
                    />
                  ) : (
                    <DataDisplay>{cadDetails?.stlCount}</DataDisplay>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={44}>
              <Col span={12}>
                <Form.Item<CadDetailsFormFields> name="stlFiles" label={editing ? "Attach STL files" : "STL files"}>
                  <FileList
                    editing={editing}
                    createFileIdsFieldName="createStlFileIds"
                    deleteFileIdsFieldName="deletedStlFileIds"
                    onStartFileLoad={onStartFileLoad}
                    onEndFileLoad={onEndFileLoad}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item<CadDetailsFormFields> name="cadFiles" label={editing ? "Attach CAD files" : "CAD files"}>
                  <FileList
                    editing={editing}
                    createFileIdsFieldName="createCadFileIds"
                    deleteFileIdsFieldName="deletedCadFileIds"
                    onStartFileLoad={onStartFileLoad}
                    onEndFileLoad={onEndFileLoad}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Form.Item<CadDetailsFormFields> name="castingPartsImages" label="Casting parts">
            {editing ? (
              <ImageUpload onStartLoading={onStartImageLoad} onFinishLoading={onEndImageLoad} />
            ) : (
              <Image width={220} height={220} src={cadDetails?.castingPartsImages} />
            )}
          </Form.Item>

          <Form.Item<CadDetailsFormFields> name="diamondMapImages" label="Diamond map">
            {editing ? (
              <ImageUpload onStartLoading={onStartImageLoad} onFinishLoading={onEndImageLoad} />
            ) : (
              <Image width={220} height={220} src={cadDetails?.diamondMapImages} />
            )}
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );
};

export default CadDetailsForm;
