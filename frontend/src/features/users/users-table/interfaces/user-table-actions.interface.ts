import { User } from "@entities/user/models/user.model";

export interface ITableActions {
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleActiveUser: (user: User, isActive: boolean) => void;
}
