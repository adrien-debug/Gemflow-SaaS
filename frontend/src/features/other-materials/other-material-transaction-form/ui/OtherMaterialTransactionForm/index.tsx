import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import { OtherMaterialTransactionSchema } from "@features/other-materials/other-material-transaction-form/models/other-material-transaction.schema.ts";
import OtherMaterialBatchFormConverter from "@features/other-materials/other-material-transaction-form/utils/other-material-transaction-form.converter.tsx";
import FormItem from "antd/es/form/FormItem";
import { FormRule } from "@shared/utils/form-validators.ts";
import InputNumber from "antd/es/input-number";
import Input from "antd/es/input";
import Form, { FormInstance } from "antd/es/form";
import DatePicker from "antd/es/date-picker";
import { DateFormat } from "@shared/constants/date-format.ts";
import { FC, useEffect } from "react";
import dayjs from "dayjs";

interface Props {
  transaction?: OtherMaterialTransaction;
  handleFinish: (dto: OtherMaterialTransactionSchema) => void;
  form: FormInstance<OtherMaterialTransactionSchema>;
}

const OtherMaterialTransactionForm: FC<Props> = ({ form, handleFinish, transaction }) => {
  useEffect(() => {
    if (transaction) {
      form.setFieldsValue(OtherMaterialBatchFormConverter.convert(transaction));
    }
  }, [form, transaction]);

  return (
    <Form<OtherMaterialTransactionSchema> onFinish={handleFinish} layout="vertical" form={form} requiredMark={false}>
      <FormItem name="batchWeight" label="Weight, g" rules={[FormRule.Required("Please, enter weight")]}>
        <InputNumber
          size="large"
          placeholder="Enter weight"
          style={{ width: "100%" }}
          disabled={!!transaction?.batchWeight}
        />
      </FormItem>

      <FormItem label="Description" name="description" rules={[FormRule.Required("Please, enter description")]}>
        <Input maxLength={120} placeholder="Description" size="large" />
      </FormItem>

      <Form.Item initialValue={dayjs()} label="Balance Date" name="balanceDate">
        <DatePicker
          id="balance-date"
          style={{ width: "100%" }}
          format={DateFormat.LiteralMontDayYear}
          placeholder="Choose date"
          size="large"
          allowClear={false}
          disabled={!!transaction?.balanceDate}
        />
      </Form.Item>
    </Form>
  );
};

export default OtherMaterialTransactionForm;
