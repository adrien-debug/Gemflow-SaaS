import Select, { SelectProps } from "antd/es/select";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { FC } from "react";
import useDiamondShapes from "@entities/diamond/hooks/useDiamondShapes.ts";
import TagRender from "@shared/ui/select/components/TagRender.tsx";

interface Props extends Omit<SelectProps, "onChange" | "options"> {
  onChange?: (shapeIds: number[] | number, shapes?: BaseItem[] | BaseItem) => void;
  multiple?: boolean;
}

const DiamondShapeSelector: FC<Props> = ({ onChange, multiple, ...rest }) => {
  const { data: shapes = [], isPending } = useDiamondShapes();

  return (
    <Select
      loading={isPending}
      size="large"
      placeholder={multiple ? "Choose shapes" : "Choose shape"}
      mode={multiple ? "multiple" : undefined}
      onChange={onChange}
      optionFilterProp={"name"}
      fieldNames={{ label: "name", value: "id" }}
      options={shapes}
      tagRender={TagRender}
      {...rest}
    />
  );
};

export default DiamondShapeSelector;
