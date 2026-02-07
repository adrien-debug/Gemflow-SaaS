import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { ImageSize } from "@shared/constants/image.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import Image from "@shared/ui/Image";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Checkbox from "antd/es/checkbox/Checkbox";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import { FC } from "react";
import "./styles.scss";

interface Props {
  gemstone: Gemstone;
}

const ViewGemstone: FC<Props> = ({ gemstone }) => {
  return (
    <div className="view-gemstone">
      <Row gutter={44}>
        <Col span={13}>
          <section>
            <Typography.Title level={4}>Parameters</Typography.Title>

            <Flex gap={24}>
              <DataDisplay variant="common" label="Gem image">
                <Image width={220} height={220} src={gemstone.gemstoneImages} size={ImageSize.Compressed} />
              </DataDisplay>

              <Flex vertical gap={20} style={{ flex: 1, minWidth: 0 }}>
                <DataDisplay label="Name" variant="common">
                  {getShortString(gemstone.name, 32)}
                </DataDisplay>
                <DataDisplay label="Description" variant="common">
                  {gemstone.description}
                </DataDisplay>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataDisplay label="Supplier">{gemstone.supplier.name}</DataDisplay>
                  </Col>
                  <Col span={12}>
                    <DataDisplay label="Location">{gemstone.location.name}</DataDisplay>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataDisplay label="Number of gems">{gemstone.numberOfGems}</DataDisplay>
                  </Col>
                  <Col span={12}>
                    <DataDisplay label="Total weight, Ct">{gemstone.totalWeight}</DataDisplay>
                  </Col>
                </Row>

                <DataDisplay label="Certificate">{gemstone.certificate}</DataDisplay>

                <DataDisplay label="Comments" variant="common">
                  {gemstone.comment}
                </DataDisplay>
              </Flex>
            </Flex>
          </section>
        </Col>

        <Col span={7}>
          <section>
            <Typography.Title style={{ marginBottom: 0 }} level={4}>
              Price details
            </Typography.Title>
            <Typography className="subtitle">Calculated by Price</Typography>

            <Flex vertical gap={48}>
              <Flex vertical gap={16}>
                <DataDisplay label="Stone(s) price" horizontal>
                  ${moneyFormatter(gemstone.stonePrice)}
                </DataDisplay>

                <DataDisplay
                  label={
                    <Checkbox disabled checked={gemstone.customsDutyPriceActive}>
                      Customs Duty (5%)
                    </Checkbox>
                  }
                  horizontal>
                  ${moneyFormatter(gemstone.customsDutyPrice)}
                </DataDisplay>
                <DataDisplay
                  label={
                    <Checkbox disabled checked={gemstone.vatPriceActive}>
                      VAT (5%)
                    </Checkbox>
                  }
                  horizontal>
                  ${moneyFormatter(gemstone.vatPrice)}
                </DataDisplay>
                <DataDisplay
                  label={
                    <Checkbox disabled checked={gemstone.tenPercentsPriceActive}>
                      10%
                    </Checkbox>
                  }
                  horizontal>
                  ${moneyFormatter(gemstone.tenPercentsPrice)}
                </DataDisplay>
              </Flex>

              <Flex vertical gap={16}>
                <DataDisplay label="Certificate cost" horizontal>
                  ${moneyFormatter(gemstone.certificateCost)}
                </DataDisplay>

                <DataDisplay label="Shipment" horizontal>
                  ${moneyFormatter(gemstone.shipment)}
                </DataDisplay>
              </Flex>

              <DataDisplay label="Total cost" horizontal variant="common">
                <Typography.Title className="total-cost-title" level={4}>
                  ${moneyFormatter(gemstone.totalCost, 2)}
                </Typography.Title>
              </DataDisplay>
            </Flex>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default ViewGemstone;
