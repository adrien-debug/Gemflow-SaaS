import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import { CSSProperties } from "react";
import Tag from "antd/es/tag";
import type { SelectProps } from "antd/es/select";
import { brandingColorPalette } from "@shared/constants/branding.ts";

type TagRender = SelectProps["tagRender"];

const tagRenderStyles: CSSProperties = {
  color: brandingColorPalette.brand6,
  backgroundColor: brandingColorPalette.brand1,
  borderColor: brandingColorPalette.brand3,
  height: 22,
  margin: 3,
};

const closeStyles = { color: brandingColorPalette.brand6 };

const TagRender: TagRender = ({ label, onClose, closable }) => {
  return (
    <Tag
      style={tagRenderStyles}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined style={closeStyles} />}>
      {label}
    </Tag>
  );
};

export default TagRender;
