import { PERSONAL_DETAILS_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import { useQuery } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";
import LocalStorageService from "@shared/services/local-storage.service.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { isDevMode, mockDevUser } from "@shared/config/dev-mode.config.ts";

const usePersonalDetails = () => {
  const authData = LocalStorageService.getItem<AuthData>(StorageKey.AuthData) as AuthData | null;

  return useQuery({
    queryKey: [PERSONAL_DETAILS_QUERY_KEY],
    queryFn: isDevMode ? async () => mockDevUser : UserApi.getCurrent,
    staleTime: 6000,
    enabled: isDevMode || !!authData?.access_token,
  });
};

export default usePersonalDetails;
