import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import { UpdateUserDto } from "@entities/user/dto/update-user.dto.ts";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateUserDto }) => UserApi.update(id, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_LIST_QUERY_KEY] });
    },
  });
};

export default useUpdateUser;
