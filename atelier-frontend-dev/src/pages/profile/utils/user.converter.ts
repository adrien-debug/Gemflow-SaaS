import { Converter } from "@shared/types/converter.type.ts";
import { UserFormModel } from "@entities/user/models/user-form.model.ts";
import { User } from "@entities/user/models/user.model.ts";

class UserConverter implements Converter<User, UserFormModel> {
  convert(from: User): UserFormModel {
    return {
      firstName: from.firstName,
      lastName: from.lastName,
      email: from.email,
      photos: from.photos,
    };
  }
}

export default new UserConverter();
