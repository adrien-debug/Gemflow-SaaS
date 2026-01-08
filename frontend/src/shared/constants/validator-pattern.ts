export const ValidatorPattern = {
  Carat: /^[0-9]{1,3}(\.[0-9]{0,4})?$/,
  PreciseCurrency: /^[0-9]{1,10}(\.[0-9]{0,3})?$/,
  Currency: /^[0-9]{1,4}(\.[0-9]+)?$/,
  JewelSize: /^[0-9]{1,2}(\.[0-9]{0,2})?$/,
  SmallDecimal: /^[0-9]{1,4}(\.[0-9])?$/,
  Markup: /^[0-9]{1,3}(\.[0-9]{0,2})?$/,
  Weight: /^[0-9]{1,10}(\.[0-9]{0,2})?$/,
  MetalWeight: /^[0-9]{1,6}(\.[0-9]{0,5})?$/,
  Integer: /^\d+$/,
  PartsWeight: /^[0-9]{1,6}(\.[0-9]{0,2})?$/,
} as const;
