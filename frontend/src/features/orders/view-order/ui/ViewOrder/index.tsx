import { orderPriorityNameMap } from "@entities/order/constants/order-priority.enum.ts";
import { ringSizeTypeNameMap } from "@entities/order/constants/ring-size.enum.ts";
import { Order } from "@entities/order/models/order.model.ts";
import { settingTypeNameMap } from "@entities/setting-type/constants/setting-type.enum.ts";
import { ImageSize } from "@shared/constants/image.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import Image from "@shared/ui/Image";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Checkbox from "antd/es/checkbox";
import Divider from "antd/es/divider";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import "./styles.scss";
import { FC } from "react";

interface ViewOrderProps {
  order: Order;
}

const ViewOrder: FC<ViewOrderProps> = ({ order }) => {
  return (
    <div className="view-order">
      <Row gutter={32}>
        <Col span={12}>
          <section>
            <Typography.Title level={4}>Client and order details</Typography.Title>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <DataDisplay label="Client">{getShortString(order?.client?.name, 32)}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Client reference">{getShortString(order?.client?.vatNumber, 16)}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Client ID">{order?.client?.id}</DataDisplay>
              </Col>

              <Col span={24}>
                <DataDisplay variant="common" label="Order name">
                  {order?.name}
                </DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Category">{getShortString(order?.itemCategory?.name, 16)}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Collection">{getShortString(order?.collection?.name, 16)}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Client segment">{getShortString(order?.segment?.name, 16)}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Priority">{orderPriorityNameMap[order?.priority]}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Due date">{order?.dueDate}</DataDisplay>
              </Col>

              <Col span={8}>
                <DataDisplay label="Acceptance date">{order?.acceptanceDate}</DataDisplay>
              </Col>
            </Row>

            <Divider orientationMargin={16} />
          </section>

          <section>
            <Typography.Title level={4}>Description</Typography.Title>

            <Flex gap={16}>
              <DataDisplay variant="common" label="Final product image">
                <Image width={200} height={200} src={order.productImages} size={ImageSize.Compressed} />
              </DataDisplay>
              <DataDisplay variant="common" label="Description">
                {order.description}
              </DataDisplay>
            </Flex>
          </section>
        </Col>

        <Col span={12}>
          <section>
            <Typography.Title level={4}>Materials and mounting</Typography.Title>

            {order.materials.map((material, i) => (
              <div key={material.id}>
                <Typography className="material-title">Material {i + 1}</Typography>
                <Row>
                  <Col span={8}>
                    <DataDisplay label="Metal type">{material.materialMetal.name}</DataDisplay>
                  </Col>
                  <Col span={8}>
                    <DataDisplay label="Claw type">{material.clawMetal.name}</DataDisplay>
                  </Col>
                  {material.hallmarkLogo && (
                    <Col span={8}>
                      <DataDisplay label="Hallmark logo">{material.hallmarkLogo.name}</DataDisplay>
                    </Col>
                  )}
                </Row>
              </div>
            ))}

            <Divider orientationMargin={16} />
          </section>

          <section>
            <Typography.Title level={4}>Dimensions</Typography.Title>
            {order.itemCategory.name === "Ring" ? (
              <Row>
                <Col span={12}>
                  <DataDisplay label="Size system">{ringSizeTypeNameMap[order.sizeSystem]}</DataDisplay>
                </Col>
                <Col span={12}>
                  <DataDisplay label="Finger size">{order.fingerSize}</DataDisplay>
                </Col>
              </Row>
            ) : (
              <DataDisplay label="Length">{order.length}</DataDisplay>
            )}

            <Divider orientationMargin={16} />
          </section>

          <section>
            <Flex justify="space-between" align="center">
              <Typography.Title level={4}>Stone and setting</Typography.Title>
              <Checkbox checked={order.stoneInPacket} disabled>
                Stone in packet
              </Checkbox>
            </Flex>

            <Flex vertical gap={16}>
              {!!order.gemstones.length &&
                order.gemstones.map((gemstone, i) => (
                  <div key={gemstone.id}>
                    <Typography className="material-title">Stone {i + 1}</Typography>

                    <Row>
                      <Col span={12}>
                        <DataDisplay label="Stone">{gemstone?.name}</DataDisplay>
                      </Col>
                      <Col span={12}>
                        <DataDisplay label="Stone certifcate">{order?.gemstones[0]?.certificate}</DataDisplay>
                      </Col>
                    </Row>
                  </div>
                ))}

              <DataDisplay label="Setting type">{settingTypeNameMap[order?.settingType]}</DataDisplay>
            </Flex>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default ViewOrder;
