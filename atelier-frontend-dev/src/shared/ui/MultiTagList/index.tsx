import "./styles.scss";
import TagList from "@shared/ui/tag/components/TagList";
import { FC } from "react";
import { BaseItem } from "@shared/types/base-item.type.ts";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

const TAG_LIMIT = 50;

interface Props {
  tagItems?: Record<string, BaseItem[]>;
  editing: boolean;
  onChange?: (tags: BaseItem[], deleteIds: number[], key?: string) => void;
  titles: Record<string, string>;
}

const MultiTagList: FC<Props> = ({ titles, tagItems, editing, onChange }) => {
  const handleTagChange = (key: string) => (tags: BaseItem[], deleteIds: number[]) => {
    onChange?.(tags, deleteIds, key);
  };

  return (
    <Flex vertical gap={24} className="multi-tag-list-wrap">
      {tagItems &&
        Object.entries(tagItems).map(([key, tags]) => (
          <Flex gap={8} key={key} className="tag-list-container">
            <Typography.Text className="title">{titles[key]}</Typography.Text>
            {tags.length || editing ? (
              <TagList
                tags={tags}
                editable={editing}
                creatable={editing}
                deletable={editing}
                onChange={(tags, deleteIds) => handleTagChange(key)(tags as BaseItem[], deleteIds)}
                maxLength={32}
                tagLimit={TAG_LIMIT}
              />
            ) : (
              <div>-</div>
            )}
          </Flex>
        ))}
    </Flex>
  );
};

export default MultiTagList;
