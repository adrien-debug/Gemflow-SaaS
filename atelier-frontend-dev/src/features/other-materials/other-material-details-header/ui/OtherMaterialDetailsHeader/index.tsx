import AddOtherMaterialBatchButton from "@features/other-materials/add-other-material-batch-button/ui/AddOtherMaterialBatchButton";
import DeductOtherMaterialBatchButton from "@features/other-materials/deduct-other-material-batch-button/ui/DeductOtherMaterialBatchButton";
import OtherMaterialActionsDropdown from "@features/other-materials/other-material-actions/ui/OtherMaterialActionsDropdown";
import OtherMaterialDetailsBreadcrumbs from "@features/other-materials/other-material-details-header/ui/OtherMaterialDetailsBreadcrumbs";
import ActionBar from "@shared/ui/ActionBar";
import DatePicker from "antd/es/date-picker";
import Flex from "antd/es/flex";
import "./styles.scss";
import { FC } from "react";
import { Dayjs } from "dayjs";
import { brandingTokens } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { OtherMaterial } from "@entities/other-material/model/other-material.model";

interface Props {
  otherMaterial: OtherMaterial;
  onDateChange?: (date: Dayjs) => void;
}

const OtherMaterialDetailsHeader: FC<Props> = ({ otherMaterial, onDateChange }) => {
  return (
    <div className="material-details-header">
      <OtherMaterialDetailsBreadcrumbs title={otherMaterial?.name} />

      <ActionBar title={otherMaterial?.name}>
        <Flex gap={16} align="center">
          <Typography.Text className="material-weight">
            Weight: <span>{otherMaterial?.remainingWeight}</span>
          </Typography.Text>

          <DatePicker
            size="large"
            placeholder="Filter by date"
            onChange={onDateChange}
            style={{ borderRadius: brandingTokens.borderRadiusDefault }}
          />

          <DeductOtherMaterialBatchButton />

          <AddOtherMaterialBatchButton />

          <OtherMaterialActionsDropdown otherMaterial={otherMaterial} />
        </Flex>
      </ActionBar>
    </div>
  );
};

export default OtherMaterialDetailsHeader;
