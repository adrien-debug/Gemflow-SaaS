import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserDto } from "@entities/user/dto/create-user.dto.ts";
import UserApi from "@entities/user/api/user.api.ts";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUserDto) => UserApi.create(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateUser;
