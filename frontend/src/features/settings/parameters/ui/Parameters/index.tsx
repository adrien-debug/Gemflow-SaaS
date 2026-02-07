import EditFormController from "@shared/ui/EditFormController";
import { useState } from "react";
import useTagList from "@shared/hooks/useTagList.ts";
import MultiTagList from "@shared/ui/MultiTagList";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import useModal from "@shared/hooks/useModal.ts";
import { ApiErrorCodes } from "@shared/constants/api-error-codes.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import ParametersService from "@features/settings/parameters/services/parameters.service.ts";
import { parametersTitle } from "@features/settings/parameters/constants/parameters-title.ts";
import { COUNTRIES_QUERY_KEY } from "@entities/country/hooks/constants.ts";
import { SEGMENTS_KEY } from "@entities/segment/hooks/query-keys.ts";
import { LOCATIONS_QUERY_KEY } from "@entities/location/constants/constants.ts";
import { COLLECTIONS_QUERY_KEY } from "@entities/collection/api/constants/query-keys.ts";
import { SUPPLY_TYPES_QUERY_KEY } from "@entities/supply-types/hooks/constants.ts";
import { JEWEL_CATEGORY_QUERY_KEY } from "@entities/jewel-category/constants/query-keys.ts";

const KEYS_TO_INVALIDATE = [
  COUNTRIES_QUERY_KEY,
  SEGMENTS_KEY,
  LOCATIONS_QUERY_KEY,
  COLLECTIONS_QUERY_KEY,
  JEWEL_CATEGORY_QUERY_KEY,
  SUPPLY_TYPES_QUERY_KEY,
];

const Parameters = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [updateModel, setUpdateModel] = useState<Record<string, BatchUpdateDto<BaseItem>>>({});

  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const onTagsChange = (tags: BaseItem[], deletedIds: number[], key?: string) => {
    if (key) {
      setUpdateModel((prev) => ({
        ...prev,
        [key]: {
          requestDtoList: tags,
          deletedIds,
        },
      }));
    }
  };

  const { tagItems, saving, loading, mutation } = useTagList<
    Record<string, BaseItem[]>,
    Record<string, BatchUpdateDto<BaseItem>>
  >({
    fetcher: ParametersService.get,
    updater: ParametersService.updateParameters,
    key: "parametersLabels",
    generalKey: "parametersSettings",
    keysToInvalidate: KEYS_TO_INVALIDATE,
  });

  const onSave = async () => {
    mutation.mutate(updateModel, {
      onSuccess: () => {
        messageApi.success("Parameters saved successfully");
      },
      onError: (error) => {
        if (error.data?.errorCode === ApiErrorCodes.CANNOT_DELETE) {
          return modalApi.confirm({
            centered: true,
            content: "The parameters are used in the system and can't be deleted",
            title: "Parameters can't be deleted",
          });
        }
        messageApi.error("Failed to save parameters");
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const onCancel = () => {
    setEditing(false);
  };

  return (
    <Flex vertical className="parameters-widget">
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={onSave}
        onCancel={onCancel}
        loading={saving}
        title="Parameters"
        description="Various customizable parameters"
        id="parameters"
      />
      {loading ? (
        <Skeleton />
      ) : (
        <MultiTagList titles={parametersTitle} editing={editing} tagItems={tagItems} onChange={onTagsChange} />
      )}
    </Flex>
  );
};

export default Parameters;
