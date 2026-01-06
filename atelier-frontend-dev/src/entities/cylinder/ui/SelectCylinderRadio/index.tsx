import useCylinders from "@entities/cylinder/hooks/useCylinders.ts";
import CylinderBlock from "@entities/cylinder/ui/CylinderBlock";
import { BaseItem } from "@shared/types/base-item.type.ts";
import Loading from "@shared/ui/Loading";
import Radio, { RadioProps } from "antd/es/radio";
import { FC } from "react";
import "./styles.css";

interface Props extends RadioProps {
  availableMetal?: BaseItem;
}

const SelectCylinderRadio: FC<Props> = ({ availableMetal, ...rest }) => {
  const { data } = useCylinders();

  if (!data?.length) return <Loading />;

  return (
    <Radio.Group
      className="cylinder-radio"
      block
      options={data.map((cylinder) => {
        return {
          label: <CylinderBlock cylinder={cylinder} />,
          value: cylinder.id,
          disabled:
            (!!cylinder?.metal?.id && !!availableMetal?.id && cylinder.metal.id !== availableMetal?.id) ||
            !cylinder.open,
        };
      })}
      optionType="button"
      buttonStyle="solid"
      {...rest}
    />
  );
};

export default SelectCylinderRadio;
