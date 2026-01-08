import api from "@shared/api";
import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { CreateUserDto } from "@entities/user/dto/create-user.dto.ts";
import { User } from "@entities/user/models/user.model.ts";
import { UpdateCurrentUserDto } from "@entities/user/dto/update-current-user.dto.ts";
import { UpdateUserDto } from "@entities/user/dto/update-user.dto.ts";
import { UpdatePasswordDto } from "@entities/user/dto/update-password.dto.ts";

const UserApi = {
  create: async (userDto: CreateUserDto): Promise<User> => {
    return api.post("/api/v1/users", userDto);
  },

  update: async (id: number, userDto: UpdateUserDto): Promise<User> => {
    return api.put(`/api/v1/users/${id}`, userDto);
  },

  getCurrent: async (): Promise<User> => {
    return api.get<User>("/api/v1/users/current");
  },

  updateCurrent: async (userDto: UpdateCurrentUserDto): Promise<User> => {
    return api.put(`/api/v1/users/current`, userDto);
  },

  search: async (pageRequest: PageRequestModel): Promise<Pageable<User>> => {
    return api.post("/api/v1/users/search", pageRequest);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/users/${id}`);
  },

  toggleActive: async (id: number, isActive: boolean) => {
    return api.patch(`/api/v1/users/${id}/activate?active=${isActive}`);
  },

  updatePassword: async (credentials: UpdatePasswordDto): Promise<void> => {
    return api.put("/api/v1/users/current/password", credentials);
  },
};

export default UserApi;
