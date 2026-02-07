import { FormInstance } from "antd/es/form";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { calculateMetalPurity } from "@features/casting/casting-form/utils/casting.util.ts";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";

const useMetalPurityRatio = (form: FormInstance<CastingFormSchema>, alloyParameters?: AlloyParameters) => {
  const alloyWeight = useWatch("alloyWeight", form);
  const pureMetalWeight = useWatch("pureMetalWeight", form);
  const purityId = useWatch("purityId", form);

  const [metalPurity, setMetalPurity] = useState<number>(0);
  const [isGoodPurity, setGoodPurity] = useState<boolean>(true);

  useEffect(() => {
    const ratio = calculateMetalPurity(form.getFieldsValue());
    setMetalPurity(ratio ? parseFloat(ratio.toFixed(2)) : 0);
  }, [form, alloyWeight, pureMetalWeight]);

  useEffect(() => {
    if (purityId && alloyParameters) {
      const selectedPurity = alloyParameters.metalPurities?.find((purity) => purity.id === purityId);
      if (selectedPurity && metalPurity) {
        const isGood = metalPurity * 10 >= selectedPurity.metalPurity;
        setGoodPurity(isGood);
      } else {
        setGoodPurity(false);
      }
    }
  }, [metalPurity, purityId, alloyParameters]);

  return { metalPurity, isGoodPurity };
};

export default useMetalPurityRatio;
