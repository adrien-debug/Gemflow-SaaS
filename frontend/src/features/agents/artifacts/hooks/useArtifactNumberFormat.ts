import { createContext, useContext, useMemo } from "react";

export type ArtifactLocale = "fr-FR" | "en-US";

export const ArtifactLocaleContext = createContext<ArtifactLocale | null>(null);

const detectLocale = (): ArtifactLocale => {
  if (typeof navigator === "undefined") return "fr-FR";
  const lang = navigator.language || "fr-FR";
  return lang.toLowerCase().startsWith("en") ? "en-US" : "fr-FR";
};

export interface NumberFormatHelpers {
  locale: ArtifactLocale;
  formatCurrency: (value: number, currency: string, opts?: Intl.NumberFormatOptions) => string;
  formatNumber: (value: number, opts?: Intl.NumberFormatOptions) => string;
  formatPercent: (value: number, opts?: Intl.NumberFormatOptions) => string;
  formatSignedPercent: (value: number, opts?: Intl.NumberFormatOptions) => string;
}

export const useArtifactNumberFormat = (): NumberFormatHelpers => {
  const fromContext = useContext(ArtifactLocaleContext);

  return useMemo(() => {
    const locale: ArtifactLocale = fromContext ?? detectLocale();

    const formatCurrency = (value: number, currency: string, opts?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        currencyDisplay: "code",
        maximumFractionDigits: 0,
        ...opts,
      }).format(value);

    const formatNumber = (value: number, opts?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(locale, opts).format(value);

    const formatPercent = (value: number, opts?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        ...opts,
      }).format(value) + " %";

    const formatSignedPercent = (value: number, opts?: Intl.NumberFormatOptions) => {
      const formatted = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
        ...opts,
      }).format(value);
      return formatted + " %";
    };

    return { locale, formatCurrency, formatNumber, formatPercent, formatSignedPercent };
  }, [fromContext]);
};
