import { FC, useEffect, useState } from "react";
import useDebounce from "@shared/hooks/useDebounce.ts";
import Input, { InputProps } from "antd/es/input";
import ConfigProvider from "antd/es/config-provider";

interface Props extends InputProps {
  timeout?: number;
  onValueChange?: (value: string) => void;
  emitSame?: boolean;
  radius?: number;
}

const DebouncedInput: FC<Props> = ({ timeout = 500, onValueChange, emitSame = false, radius, ...rest }) => {
  const [value, setValue] = useState<string>("");

  const [lastEmit, setLastEmit] = useState<string>("");

  const debouncedValue = useDebounce(value, timeout);

  useEffect(() => {
    emitValue(debouncedValue);
  }, [debouncedValue]);

  const emitValue = (v: string) => {
    if (v !== lastEmit || emitSame) {
      onValueChange?.(v);
    }
    setLastEmit(v);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            borderRadius: radius,
            borderRadiusLG: radius,
            borderRadiusSM: radius,
          },
        },
      }}>
      <Input {...rest} onChange={(e) => setValue(e.target.value)} onPressEnter={() => emitValue(value)} />
    </ConfigProvider>
  );
};

export default DebouncedInput;
