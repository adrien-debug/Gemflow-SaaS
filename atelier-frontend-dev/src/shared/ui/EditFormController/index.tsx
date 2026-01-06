import "./styles.scss";
import { FC, ReactNode } from "react";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Button, { ButtonProps } from "antd/es/button";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import Tooltip from "antd/es/tooltip";
import { LockOutlined } from "@ant-design/icons";
import { brandingColorPalette } from "@shared/constants/branding.ts";

interface Props {
  title?: string;
  description?: string;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
  editing?: boolean;
  additionalControls?: ReactNode;
  editButtonProps?: ButtonProps;
  borderBottom?: boolean;
  id: string;
  isEditBlocked?: boolean;
}

const EditFormController: FC<Props> = ({
  title,
  description,
  onEdit,
  onSave,
  onCancel,
  editing,
  additionalControls,
  loading,
  editButtonProps = {},
  borderBottom = true,
  id,
  isEditBlocked,
}) => {
  return (
    <Flex
      className={`edit-form-controller ${borderBottom ? "border-bottom" : ""}`}
      justify="space-between"
      align="center">
      <div>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text type="secondary">{description}</Typography.Text>
      </div>

      <Flex gap="middle" align="center">
        <Tooltip title="The details can't be edited, as the order is in the Prototyping stage" placement="top">
          {isEditBlocked && <LockOutlined style={{ color: brandingColorPalette.brand6 }} />}
        </Tooltip>
        {additionalControls}
        {editing ? (
          <>
            <Button id={`${id}-cancel-edit-form`} size="large" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>

            <Button id={`${id}-save-edit-form`} type="primary" size="large" onClick={onSave} loading={loading}>
              Save
            </Button>
          </>
        ) : (
          <Flex>
            <Button
              id={`${id}-edit-form`}
              size="large"
              icon={<EditOutlined />}
              onClick={onEdit}
              {...editButtonProps}
              disabled={isEditBlocked}>
              {editButtonProps.children || "Edit"}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default EditFormController;
