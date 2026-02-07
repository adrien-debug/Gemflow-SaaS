import { Pageable } from "@shared/types/pageable.model.ts";
import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props<T, P extends PageRequestModel> {
  key: string;
  fetcher: (request: P) => Promise<Pageable<T>>;
  requestBody: P;
}

const usePageableRequest = <T, P extends PageRequestModel>({ fetcher, key, requestBody }: Props<T, P>) => {
  return useQuery<Pageable<T>>({
    queryKey: [key, requestBody],
    queryFn: () => fetcher(requestBody),
    placeholderData: keepPreviousData,
  });
};

export default usePageableRequest;
