import { brandingTokens } from "@shared/constants/branding.ts";
import Flex from "antd/es/flex";
import Tag from "antd/es/tag";
import Typography from "antd/es/typography";
import { FC, HTMLProps, PropsWithChildren, ReactNode } from "react";
import "./styles.scss";

interface LabeledTagProps extends Omit<HTMLProps<HTMLDivElement>, "label" | "size"> {
  label?: ReactNode;
  variant?: "tag" | "common";
  size?: "small" | "large";
  horizontal?: boolean;
}

const horizontalProps = {
  justify: "space-between",
  align: "center",
};
const verticalProps = {
  justify: "start",
  align: "start",
};

const DataDisplay: FC<PropsWithChildren<LabeledTagProps>> = ({
  children,
  label,
  variant = "tag",
  size = "large",
  horizontal,
  ...rest
}) => {
  const alignProps = horizontal ? horizontalProps : verticalProps;
  const value = typeof children === "number" ? children?.toString() : children;

  return (
    <div className={`labeled-tag ${size}`} {...rest}>
      <Flex vertical={!horizontal} gap={variant == "tag" ? 8 : 4} {...alignProps}>
        {label && <Typography>{label}</Typography>}
        {variant === "tag" ? (
          <Tag style={{ color: brandingTokens.textDefaultColor }} color={brandingTokens.colorBgContainerDisabled}>
            <div className="inner-tag-content">{value || "-"}</div>
          </Tag>
        ) : (
          <div className="children">{value || "-"}</div>
        )}
      </Flex>
    </div>
  );
};

export default DataDisplay;
