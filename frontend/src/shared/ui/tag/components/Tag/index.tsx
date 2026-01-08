import "./styles.scss";
import AntTag, { TagProps } from "antd/es/tag";
import Tooltip from "antd/es/tooltip";
import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from "react";
import Input, { InputRef } from "antd/es/input";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { MAX_LENGTH } from "@shared/ui/tag/constants/max-length.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import InputNumber from "antd/es/input-number";

const CUT_LENGTH = 25;

export interface TagItem extends Omit<BaseItem, "name"> {
  name: string | number;
}

interface Props extends TagProps {
  editable?: boolean;
  deletable?: boolean;
  tag: TagItem;
  onTagChange?: (tag: TagItem) => void;
  onTagDelete?: (tag: TagItem) => void;
  maxLength?: number;
  isNumber?: boolean;
  min?: number;
  max?: number;
}

const Tag: FC<Props> = ({
  editable,
  deletable,
  tag: tagProp,
  onTagChange,
  maxLength = MAX_LENGTH,
  onTagDelete,
  isNumber,
  max,
  min,
  ...rest
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [tag, setTag] = useState<TagItem>({ ...tagProp });
  const inputRef = useRef<InputRef>(null);
  const inputNumberRef = useRef<any>(null);

  const [currentValue, setCurrentValue] = useState<string | number>(tag.name);

  useEffect(() => {
    setTag(tagProp);
    setCurrentValue(tagProp.name);
  }, [tagProp]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputNumberRef.current?.focus();
    }
  }, [editing]);

  const onTagDoubleClick = () => {
    if (editable) {
      setEditing(true);
    }
  };

  const onTagNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const onFinishEditing = () => {
    setEditing(false);
    if (!currentValue) {
      onTagDelete?.(tag);
      return;
    }
    let finalValue = currentValue;
    if (isNumber) {
      const numValue = Number(currentValue);
      if (max && numValue > max) {
        finalValue = max;
      }
      if (min && numValue < min) {
        finalValue = min;
      }
    }
    const updatedTag = { ...tag, name: finalValue };
    setTag(updatedTag);
    setCurrentValue(finalValue);
    onTagChange?.(updatedTag);
  };

  const onDelete = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onTagDelete?.(tag);
  };

  const handleNumberChange = (value: number | string | null) => {
    setCurrentValue(value as number | string);
  };

  if (editing) {
    return isNumber ? (
      <InputNumber
        id={`${tagProp.name}-input`}
        className="tag-input-number"
        ref={inputNumberRef}
        value={currentValue}
        size="small"
        onChange={handleNumberChange}
        onPressEnter={onFinishEditing}
        onBlur={onFinishEditing}
      />
    ) : (
      <Input
        id={`${tagProp.name}-input`}
        className="tag-input"
        ref={inputRef}
        size="small"
        value={currentValue}
        onChange={onTagNameChange}
        onPressEnter={onFinishEditing}
        onBlur={onFinishEditing}
        maxLength={maxLength}
      />
    );
  }

  return (
    <Tooltip placement="top" title={String(tag?.name)?.length > CUT_LENGTH ? tag.name : null}>
      <AntTag
        id={`${tagProp.name}-tag`}
        {...rest}
        className="tag-item"
        onDoubleClick={onTagDoubleClick}
        closeIcon={deletable && <CloseOutlined />}
        onClose={onDelete}>
        {getShortString(String(tagProp.name), CUT_LENGTH)}
      </AntTag>
    </Tooltip>
  );
};

export default Tag;
