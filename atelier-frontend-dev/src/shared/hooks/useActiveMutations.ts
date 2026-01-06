import { useIsMutating } from "@tanstack/react-query";

const useActiveMutations = (keys: string[]) =>
  useIsMutating({
    predicate: (mutation) => keys.includes(mutation.options.mutationKey?.[0] as string),
  });

export default useActiveMutations;
