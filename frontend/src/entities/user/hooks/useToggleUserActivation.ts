import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pageable } from "@shared/types/pageable.model.ts";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import UserApi from "@entities/user/api/user.api.ts";
import { User } from "@entities/user/models/user.model.ts";

const useToggleUserActivation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: number; isActive: boolean }) => UserApi.toggleActive(userId, isActive),
    onMutate: async ({ userId, isActive }: { userId: number; isActive: boolean }) => {
      await queryClient.cancelQueries({ queryKey: [USER_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData({ queryKey: [USER_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<User>) => ({
            ...old,
            content: old?.content?.map((user: User) => ({
              ...user,
              isActive: user.id === userId ? isActive : user.isActive,
            })),
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

export default useToggleUserActivation;
