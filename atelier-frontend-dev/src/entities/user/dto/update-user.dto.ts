import { CreateUserDto } from "./create-user.dto.ts";

// Used by the admin user to update in a table for example
export interface UpdateUserDto extends Omit<CreateUserDto, "email"> {}
