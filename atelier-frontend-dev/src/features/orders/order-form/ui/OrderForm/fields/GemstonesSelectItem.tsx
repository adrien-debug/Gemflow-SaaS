import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto";
import GemstoneSelect from "@entities/gemstone/ui/GemstoneSelect";
import FormItem from "antd/es/form/FormItem";
import { FC } from "react";

interface Props {
  searchConfig?: Pick<SearchGemstoneDto, "searchCriteria">;
}

const GemstonesSelectItem: FC<Props> = ({ searchConfig }) => {
  return (
    <FormItem label="Stone" name="gemstoneIds">
      <GemstoneSelect searchConfig={searchConfig} />
    </FormItem>
  );
};

export default GemstonesSelectItem;
