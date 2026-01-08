import "./styles.scss";
import { FC, useEffect, useRef, useState } from "react";
import Input, { InputRef } from "antd/es/input";
import AntTag from "antd/es/tag";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { MAX_LENGTH } from "@shared/ui/tag/constants/max-length.ts";
import InputNumber from "antd/es/input-number";
import { TagItem } from "@shared/ui/tag/components/Tag";

interface Props {
  label?: string;
  onCreate?: (tag: TagItem) => void;
  maxLength?: number;
  isNumber?: boolean;
  min?: number;
  max?: number;
}

const NewTag: FC<Props> = ({ label = "New tag", onCreate, isNumber, maxLength = MAX_LENGTH, min, max }) => {
  const [tagName, setTagName] = useState<string | number>();

  const [editing, setEditing] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);

  const inputNumberRef = useRef<any>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputNumberRef.current?.focus();
    }
  }, [editing]);

  const onNewClick = () => {
    setEditing(true);
  };

  const onFinishEditing = () => {
    setEditing(false);
    if (tagName) {
      let finalValue = tagName;
      if (isNumber) {
        const numValue = Number(tagName);
        if (max && numValue > max) {
          finalValue = max;
        }
        if (min && numValue < min) {
          finalValue = min;
        }
      }
      setTagName(finalValue);
      onCreate?.({ id: null, name: finalValue });
    }
  };

  const handleNumberChange = (value: number | string | null) => {
    setTagName(value as number | string);
  };

  if (editing) {
    return isNumber ? (
      <InputNumber
        id="new-tag"
        className="tag-input"
        ref={inputNumberRef}
        size="small"
        onChange={handleNumberChange}
        onPressEnter={onFinishEditing}
        onBlur={onFinishEditing}
      />
    ) : (
      <Input
        id="new-tag"
        className="tag-input"
        ref={inputRef}
        size="small"
        onChange={(e) => setTagName(e.target.value)}
        onPressEnter={onFinishEditing}
        onBlur={onFinishEditing}
        maxLength={maxLength}
      />
    );
  }

  return (
    <AntTag id={label} className="new-tag-item" icon={<PlusOutlined />} onClick={onNewClick}>
      {label}
    </AntTag>
  );
};

export default NewTag;
