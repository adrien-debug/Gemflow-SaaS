import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import UserApi from "@entities/user/api/user.api.ts";
import { User } from "@entities/user/models/user.model";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => UserApi.delete(userId),
    onMutate: async (userId: number) => {
      await queryClient.cancelQueries({ queryKey: [USER_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData({ queryKey: [USER_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<User>) => ({
            ...old,
            content: old?.content?.filter((user: User) => user.id !== userId),
          }));
        }
      });
      return { snapshots };
    },

    onError: (_, __, context) => {
      context?.snapshots.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [USER_LIST_QUERY_KEY] });
    },
  });
};

export default useDeleteUser;
