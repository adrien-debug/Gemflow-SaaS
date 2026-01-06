import { Converter } from "@shared/types/converter.type.ts";
import { UpdateUserDto } from "@entities/user/dto/update-user.dto.ts";
import { UserFormModel } from "@entities/user/models/user-form.model.ts";

class UserFormConverter implements Converter<UserFormModel, UpdateUserDto> {
  convert(from: UserFormModel): UpdateUserDto {
    return {
      firstName: from.firstName,
      lastName: from.lastName,
      photos: from.photos,
    } as UpdateUserDto;
  }
}

export default new UserFormConverter();
