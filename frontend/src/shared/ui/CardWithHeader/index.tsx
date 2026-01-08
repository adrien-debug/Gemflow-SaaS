import { FC, PropsWithChildren, ReactNode } from "react";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import "./styles.scss";

interface Props extends PropsWithChildren {
  title: ReactNode;
  topRightContent?: ReactNode;
  titleClassName?: string;
}

const CardWithHeader: FC<Props> = ({ title, children, titleClassName, topRightContent }) => {
  return (
    <Card className="card-with-header">
      <Flex align="center" justify="space-between" className="title-container">
        <Typography.Title level={5} className={`card-title ${titleClassName}`}>
          {title}
        </Typography.Title>
        {topRightContent}
      </Flex>
      {children}
    </Card>
  );
};

export default CardWithHeader;
