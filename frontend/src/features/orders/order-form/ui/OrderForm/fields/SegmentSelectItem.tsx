import SegmentSelect from "@entities/segment/ui/SegmentSelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";

export const SegmentSelectItem = () => {
  return (
    <FormItem label="Client segment" name="segmentId" rules={[FormRule.Required("Choose client segment")]}>
      <SegmentSelect />
    </FormItem>
  );
};
