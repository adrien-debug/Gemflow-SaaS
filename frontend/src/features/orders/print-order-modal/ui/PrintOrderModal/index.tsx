import { ringSizeTypeShortNameMap } from "@entities/order/constants/ring-size.enum.ts";
import { Order } from "@entities/order/models/order.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import AtelierLogo from "@shared/ui/icons/AtelierLogo";
import Image from "@shared/ui/Image";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Flex from "antd/es/flex";
import Col from "antd/es/col";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { FC } from "react";
import "./styles.scss";
import { ModalProps } from "antd/es/modal/interface";
import Row from "antd/es/row";
import Checkbox from "antd/es/checkbox";
import QRCode from "antd/es/qr-code";
import { settingTypeNameMap } from "@entities/setting-type/constants/setting-type.enum.ts";
import { getCurrentEnvironmentUrl } from "@shared/utils/url-helper.ts";

interface Props extends ModalProps {
  order: Order;
}

const PrintOrderModal: FC<Props> = ({ order, ...rest }) => {
  const timeTrackerLink = `${getCurrentEnvironmentUrl()}/orders/${order.id}/time-tracker`;

  return (
    <Modal
      width={700}
      okText="Print"
      onOk={window.print}
      title={
        <>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0, color: brandingColorPalette.brand6 }}>
            Print envelope sticker
          </Typography.Title>
          <Typography.Text style={{ fontWeight: 400 }}>Sticker preview</Typography.Text>
        </>
      }
      {...rest}>
      <Flex vertical className="order-sticker" gap={21}>
        <Row gutter={21}>
          <Col span={10}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DataDisplay size="small" label="DEADLINE" variant="common">
                  {order.dueDate}
                </DataDisplay>
              </Col>
              <Col span={24}>
                <Flex justify="center">
                  <AtelierLogo width={26} height={30} />
                </Flex>
              </Col>
              <Col span={24}>
                <Flex justify="center">
                  <Image
                    preview={false}
                    draggable={false}
                    width={150}
                    height={150}
                    src={order.productImages}
                    noCache
                    loading="eager"
                  />
                </Flex>
              </Col>
              <Col span={13}>
                <DataDisplay size="small" label="CATEGORY" variant="common">
                  {order.itemCategory.name}
                </DataDisplay>
              </Col>
              <Col span={11}>
                {order.itemCategory.name === "Ring" ? (
                  <DataDisplay size="small" label="SIZE" variant="common">
                    {ringSizeTypeShortNameMap[order.sizeSystem]} {order.fingerSize}
                  </DataDisplay>
                ) : (
                  <DataDisplay size="small" label="LENGTH" variant="common">
                    {order.length}
                  </DataDisplay>
                )}
              </Col>

              <Col span={24}>
                <DataDisplay size="small" label="METAL COLOR" variant="common">
                  {order.materials.map((material) => (
                    <span key={material.id}>
                      {material.materialMetal.name}
                      <br />
                    </span>
                  ))}
                </DataDisplay>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <DataDisplay size="small" label="ACCEPTANCE DATE" variant="common">
                  {order.acceptanceDate}
                </DataDisplay>
              </Col>
              <Col span={24}>
                <DataDisplay size="small" label="ORDER NAME" variant="common">
                  {getShortString(order.name, 32)}
                </DataDisplay>
              </Col>
              <Col span={12}>
                <DataDisplay size="small" label="ORDER ID" variant="common">
                  {order.id}
                </DataDisplay>
              </Col>
              <Col span={12}>
                <DataDisplay size="small" label="CLIENT REF #" variant="common">
                  {order.client.id}
                </DataDisplay>
              </Col>
              <Col span={24}>
                <DataDisplay size="small" label="SEGMENT" variant="common">
                  {order.segment.name}
                </DataDisplay>
              </Col>
              <Col span={24}>
                <DataDisplay size="small" label="SETTING TYPE" variant="common">
                  {settingTypeNameMap[order.settingType]}
                </DataDisplay>
              </Col>
              <Col span={24}>
                <DataDisplay size="small" label="CLAW COLOR" variant="common">
                  {order.materials.map((material) => (
                    <span key={material.id}>
                      {material.clawMetal.name}
                      <br />
                    </span>
                  ))}
                </DataDisplay>
              </Col>
            </Row>
          </Col>
        </Row>
        <DataDisplay
          size="small"
          style={{ maxWidth: 200 }}
          label={
            <>
              STONE (IN PACKET: <Checkbox disabled checked={order.stoneInPacket} />)
            </>
          }
          variant="common">
          {order.gemstones.map((gemstone) => getShortString(gemstone.name, 32)).join(", ")}
        </DataDisplay>

        <DataDisplay style={{ maxWidth: 230 }} size="small" label="ORDER DESCRIPTION" variant="common">
          {getShortString(order.description, 200)}
        </DataDisplay>

        <QRCode size={150} style={{ flex: 1 }} bordered={false} value={timeTrackerLink} />
      </Flex>
    </Modal>
  );
};

export default PrintOrderModal;
