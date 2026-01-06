import "./styles.scss";
import { FC, useEffect, useState } from "react";
import { BaseItem } from "@shared/types/base-item.type.ts";
import Tag, { TagItem } from "@shared/ui/tag/components/Tag";
import NewTag from "@shared/ui/tag/components/NewTag";
import Flex from "antd/es/flex";
import { MAX_LENGTH } from "@shared/ui/tag/constants/max-length.ts";

interface Props {
  tags?: BaseItem[];
  newLabel?: string;
  editable?: boolean;
  deletable?: boolean;
  creatable?: boolean;
  onChange?: (tags: TagItem[], deleteIds: number[]) => void;
  maxLength?: number;
  tagLimit?: number;
  isNumber?: boolean;
  min?: number;
  max?: number;
}

const TagList: FC<Props> = ({
  tags,
  editable,
  creatable,
  deletable,
  newLabel,
  onChange,
  maxLength = MAX_LENGTH,
  tagLimit = Infinity,
  isNumber,
  min,
  max,
}) => {
  const [tagList, setTagList] = useState<TagItem[]>(tags ? structuredClone(tags) : []);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);

  useEffect(() => {
    if (tags) {
      setTagList(structuredClone(tags));
    }
  }, [tags, editable]);

  useEffect(() => {
    onChange?.(tagList, deleteIds);
  }, [tagList, deleteIds]);

  const onAddNew = (tag: TagItem) => {
    if (!isTagExist(tag)) {
      setTagList([...tagList, tag]);
    }
  };

  const onTagChange = (tag: TagItem, index: number) => {
    const updatedTags = tagList?.map((t, i) => (i === index ? tag : t));
    setTagList(updatedTags);
  };

  const onTagDelete = (tag: TagItem, index: number) => {
    if (tag.id) {
      setDeleteIds([...deleteIds, tag.id]);
    }
    const updatedTags = tagList.filter((_, i) => i !== index);
    setTagList(updatedTags);
  };

  const isTagExist = (tag: TagItem) => tagList.some((t) => t.name === tag.name);

  const makeKey = (tag: TagItem, index: number) => {
    if (!tag) {
      return index;
    }
    return `${tag?.id}${tag?.name}`;
  };

  return (
    <Flex wrap gap={8} className="tag-list">
      {tagList?.map((tag, index) => (
        <Tag
          key={makeKey(tag, index)}
          tag={tag}
          editable={editable && !tag.immutable}
          deletable={deletable && !tag.immutable}
          onTagChange={(tag) => onTagChange(tag, index)}
          onTagDelete={(tag) => onTagDelete(tag, index)}
          maxLength={maxLength}
          isNumber={isNumber}
          min={min}
          max={max}
        />
      ))}

      {creatable && tagList.length < tagLimit && (
        <NewTag maxLength={maxLength} label={newLabel} onCreate={onAddNew} isNumber={isNumber} min={min} max={max} />
      )}
    </Flex>
  );
};

export default TagList;
