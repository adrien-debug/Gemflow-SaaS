import { useEffect, useState } from "react";
import { FormInstance } from "antd/es/form";
import { getTotalGemstoneCost } from "@entities/gemstone/utils/get-total-gemstone-cost";
import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import { moneyFormatter } from "@shared/utils/formatter";

export const useGemstoneCalculations = (form: FormInstance, initialMethod?: GemstoneMethodType) => {
  const [currentMethod, setCurrentMethod] = useState<GemstoneMethodType>(initialMethod || GemstoneMethodType.PRICE);

  useEffect(() => {
    if (initialMethod) {
      setCurrentMethod(initialMethod);
      form.setFieldsValue({ methodType: initialMethod });
    }
  }, [initialMethod, form]);

  // Handler for reset all price details fields after changing method
  const handleMethodChange = (value: GemstoneMethodType) => {
    form.setFieldsValue({
      methodType: value.toUpperCase(),
    });
    form.resetFields([
      "customsDutyPriceActive",
      "vatPriceActive",
      "tenPercentsPriceActive",
      "tenPercentsPrice",
      "vatPrice",
      "customsDutyPrice",
      "stonePrice",
      "certificateCost",
      "shipment",
      "totalCost",
      "pricePerCarat",
    ]);
    setCurrentMethod(value);
  };

  // Handler for change inputs values
  const handleValuesChange = (_: unknown, values: GemstoneFormSchema) => {
    let stonePrice = 0;
    switch (values.methodType) {
      case GemstoneMethodType.WEIGHT:
        if (values.totalWeight && values.pricePerCarat) {
          stonePrice = +(values.totalWeight * values.pricePerCarat).toFixed(2);
          form.setFieldsValue({ stonePrice });
        } else {
          stonePrice = 0;
          form.setFieldsValue({ stonePrice });
        }
        break;
      case GemstoneMethodType.PRICE:
      case GemstoneMethodType.MANUAL:
        stonePrice = values.stonePrice || 0;
        break;
    }
    if (form.getFieldValue("stonePrice") > 0) {
      form.setFieldsValue({
        customsDutyPrice: values.customsDutyPriceActive ? moneyFormatter(stonePrice * 0.05) : "-",
        vatPrice: values.vatPriceActive ? moneyFormatter(stonePrice * 0.05) : "-",
        tenPercentsPrice: values.tenPercentsPriceActive ? moneyFormatter(stonePrice * 0.1) : "-",
      });
    } else {
      form.setFieldsValue({
        customsDutyPriceActive: false,
        vatPriceActive: false,
        tenPercentsPriceActive: false,
        customsDutyPrice: "-",
        vatPrice: "-",
        tenPercentsPrice: "-",
      });
    }

    const total = getTotalGemstoneCost({ ...values, stonePrice });
    form.setFieldsValue({ totalCost: total || 0 });
  };

  return {
    isPrice: currentMethod === GemstoneMethodType.PRICE,
    isManual: currentMethod === GemstoneMethodType.MANUAL,
    handleMethodChange,
    handleValuesChange,
  };
};
