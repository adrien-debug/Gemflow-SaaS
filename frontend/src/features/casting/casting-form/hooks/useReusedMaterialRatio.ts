import { FormInstance } from "antd/es/form";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { calculateReusedMaterialRatio } from "@features/casting/casting-form/utils/casting.util.ts";

const useReusedMaterialRatio = (form: FormInstance<CastingFormSchema>) => {
  const alloyWeight = useWatch("alloyWeight", form);
  const alloyedMetalWeight = useWatch("alloyedMetalWeight", form);
  const pureMetalWeight = useWatch("pureMetalWeight", form);

  const [reusedMaterialRatio, setReusedMaterialRatio] = useState<number>(0);

  useEffect(() => {
    const ratio = calculateReusedMaterialRatio(form.getFieldsValue());
    setReusedMaterialRatio(ratio ? parseFloat(ratio.toFixed(2)) : 0);
  }, [form, alloyWeight, pureMetalWeight, alloyedMetalWeight]);

  return { reusedMaterialRatio };
};

export default useReusedMaterialRatio;
