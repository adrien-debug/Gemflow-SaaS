import { FormInstance } from "antd/es/form";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import {
  calculatePreliminaryCastWeight,
  calculateWaxWeight,
} from "@features/casting/casting-form/utils/casting.util.ts";

const useWaxWeights = (form: FormInstance<CastingFormSchema>, alloyParameters?: AlloyParameters) => {
  const supportWeight = useWatch("supportWeight", form);
  const waxTreeWeight = useWatch("waxTreeWeight", form);

  const [waxWeight, setWaxWeight] = useState<number>(0);
  const [preliminaryCastWeight, setPreliminaryCastWeight] = useState<number>(0);

  useEffect(() => {
    setWaxWeight(calculateWaxWeight(form.getFieldsValue()));
    setPreliminaryCastWeight(calculatePreliminaryCastWeight(form.getFieldsValue(), alloyParameters as AlloyParameters));
  }, [form, supportWeight, waxTreeWeight, alloyParameters]);

  return { waxWeight, preliminaryCastWeight };
};

export default useWaxWeights;
