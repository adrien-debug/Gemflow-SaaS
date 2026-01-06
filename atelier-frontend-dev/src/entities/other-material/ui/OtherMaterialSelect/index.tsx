import TagRender from "@shared/ui/select/components/TagRender.tsx";
import { FC, UIEvent } from "react";
import Select, { SelectProps } from "antd/es/select";
import useInfiniteOtherMaterials from "@entities/other-material/hooks/useInfiniteOtherMaterials.ts";

interface Props extends SelectProps {}

const OtherMaterialSelect: FC<Props> = ({ ...rest }: Props) => {
  const { data, fetchNextPage } = useInfiniteOtherMaterials();

  const options = data?.pages.flatMap((page) => page.content) || [];

  const handlePopupScroll = (e: UIEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
      void fetchNextPage();
    }
  };

  if (!data) return <Select size="large" placeholder={"Loading..."} loading disabled />;

  return (
    <Select
      size="large"
      showSearch
      tagRender={TagRender}
      placeholder="Choose other material"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      {...rest}>
      {options.map((otherMaterial) => (
        <Select.Option key={otherMaterial.id} value={otherMaterial.id} data={otherMaterial}>
          {otherMaterial.id} · {otherMaterial.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default OtherMaterialSelect;
