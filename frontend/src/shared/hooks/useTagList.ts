import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props<T, U> {
  key: string;
  generalKey: string;
  keysToInvalidate?: string[];
  fetcher: () => Promise<T>;
  updater: (updateDto: U) => Promise<T>;
}

const useTagList = <T, U>({ fetcher, updater, key, generalKey, keysToInvalidate }: Props<T, U>) => {
  const queryClient = useQueryClient();

  const { data: tagItems, isPending: loading } = useQuery({
    queryKey: [key],
    queryFn: () => fetcher(),
  });

  const mutation = useMutation({
    mutationFn: (updateDto: U) => updater(updateDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      queryClient.invalidateQueries({ queryKey: [generalKey] });
      keysToInvalidate?.forEach((key: string) => queryClient.invalidateQueries({ queryKey: [key] }));
    },
  });

  return { tagItems, loading, saving: mutation.isPending, mutation };
};

export default useTagList;
