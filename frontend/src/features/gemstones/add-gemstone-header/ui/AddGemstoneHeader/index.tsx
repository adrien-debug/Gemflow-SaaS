import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import AddGemstoneButton from "@features/gemstones/add-gemstone-button/ui/AddGemstoneButton";
import CancelAddGemstoneButton from "@features/gemstones/cancel-add-gemstone-button/CancelAddGemstoneButton";
import ActionBar from "@shared/ui/ActionBar";
import Flex from "antd/es/flex";
import { FormInstance } from "antd/es/form";
import { FC } from "react";

interface Props {
  form: FormInstance<GemstoneFormSchema>;
  loading: boolean;
}

const AddGemstoneHeader: FC<Props> = ({ form, loading }) => {
  return (
    <ActionBar title="Add new gemstone">
      <Flex gap={16}>
        <CancelAddGemstoneButton />
        <AddGemstoneButton form={form} loading={loading} />
      </Flex>
    </ActionBar>
  );
};

export default AddGemstoneHeader;
