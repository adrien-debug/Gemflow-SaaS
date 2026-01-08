import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { Rule } from "antd/es/form";
import { ValidatorPattern } from "@shared/constants/validator-pattern.ts";
import { Nullable } from "@shared/types/nullable.type.ts";

export const FormRule = {
  Carat: (message?: string) => ({
    pattern: ValidatorPattern.Carat,
    message: message || `Value must be up to 3 digits and 4 decimal places`,
  }),
  Currency: (message?: string) => ({
    pattern: ValidatorPattern.Currency,
    message: message || "Value must be up to 4 digits",
  }),
  ImageRequired: (message?: string): Rule => ({
    required: true,
    validator(_, image: ImageMetadata[]) {
      if (image) return Promise.resolve();
      return Promise.reject(message || "Image is required");
    },
  }),
  JewelSize: (message?: string) => ({
    pattern: ValidatorPattern.JewelSize,
    message: message || "Value must be up to 2 digits and 2 decimal places",
  }),
  Max: (max: number, message?: string) => ({
    max,
    type: "number",
    message: message || `Value must be max ${max}`,
  }),
  Min: (min: number, message?: string): Rule => ({
    min,
    type: "number",
    message: message || `Value must be at least ${min}`,
  }),
  MaxLength: (max: number, message?: string) => ({
    max,
    type: "string",
    message: message || `Value must be max ${max} length`,
  }),
  MinLength: (min: number, message?: string): Rule => ({
    min,
    type: "string",
    message: message || `Value must be at least ${min} length`,
  }),
  PreciseCurrency: (message?: string) => ({
    pattern: ValidatorPattern.PreciseCurrency,
    message: message || "Value must be up to 10 digits and 3 decimal places",
  }),
  Required: (message?: string, required = true) => ({
    required: required,
    message: message || "Please, enter a value",
  }),
  SmallDecimal: (message?: string) => ({
    pattern: ValidatorPattern.SmallDecimal,
    message: message || "Value must be up to 4 digits and 1 decimal places",
  }),
  MatchValue:
    (field: string, message?: string): Rule =>
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(field) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message || "Value don't match"));
      },
    }),
  Markup: (message?: string) => ({
    pattern: ValidatorPattern.Markup,
    message: message || `Value must be up to 3 digits and 2 decimal places`,
  }),
  BasicWeight: (message?: string) => ({
    pattern: ValidatorPattern.Weight,
    message: message || `Value must be up to 10 digits and 2 decimal places`,
  }),
  PreciseWeight: (message?: string) => ({
    pattern: ValidatorPattern.MetalWeight,
    message: message || `Value must be up to 6 digits and 5 decimal places`,
  }),
  Integer: (message?: string) => ({
    pattern: ValidatorPattern.Integer,
    message: message || "Value must be an integer",
  }),
  PartsWeight: (message?: string) => ({
    pattern: ValidatorPattern.PartsWeight,
    message: message || "Value must be up to 6 digits and 2 decimal places",
  }),
  MaxRemainingWeight: (remainingWeight: Nullable<number>, message?: string) => ({
    validator(_, value) {
      if (remainingWeight && value > remainingWeight) {
        return Promise.reject(
          new Error(message || `Weight of the selected material should not exceed ${remainingWeight}g.`),
        );
      }
      return Promise.resolve();
    },
  }),
} as const satisfies Record<string, (...args: never) => Rule>;
