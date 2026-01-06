import { UpdateCurrentUserDto } from "@entities/user/dto/update-current-user.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";
import { PERSONAL_DETAILS_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";

const useUpdateCurrent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userDto: UpdateCurrentUserDto) => UserApi.updateCurrent(userDto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PERSONAL_DETAILS_QUERY_KEY] });
    },
  });
};

export default useUpdateCurrent;
