import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  key: string;
  keysToInvalidate?: string[];
  fetcher: () => Promise<BaseItem[]>;
  updater?: (updateDto: BatchUpdateDto<BaseItem>) => Promise<BaseItem[]>;
  onUpdated?: () => void;
}

const useSingleTagList = ({ fetcher, updater, key, keysToInvalidate, onUpdated }: Props) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [key],
    queryFn: () => fetcher(),
  });

  const { messageApi } = useMessage();

  const mutation = useMutation({
    mutationFn: (updateDto: BatchUpdateDto<BaseItem>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return updater(updateDto);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [key] });
      void queryClient.invalidateQueries({ queryKey: ["priceSettings"] });
      keysToInvalidate?.forEach((key: string) => queryClient.invalidateQueries({ queryKey: [key] }));
      onUpdated?.();
    },
    onError: (e) => {
      void messageApi.error(e.data?.friendlyMessage || "Failed to update");
    },
  });

  const updateTagList = async (updateDto: BatchUpdateDto<BaseItem>) => {
    if (updater) {
      return mutation.mutate(updateDto);
    }
    return null;
  };

  // TODO: remove explicit return of tagItems, loading, saving, updateTagList (Check all code places)
  return { tagItems: query.data, loading: query.isPending, saving: mutation.isPending, updateTagList, mutation, query };
};

export default useSingleTagList;
