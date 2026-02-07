import { useMutation } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";
import { UpdatePasswordDto } from "@entities/user/dto/update-password.dto.ts";

const useChangePassword = () => {
  const changePasswordMutation = useMutation({
    mutationFn: (values: UpdatePasswordDto) => UserApi.updatePassword(values),
  });

  return { changePasswordMutation };
};

export default useChangePassword;
