import { useSearchParams } from "react-router";

const useActiveTab = (defaultTab: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || defaultTab;

  const setActiveTab = (tab: string) => setSearchParams({ tab });

  return { activeTab, setActiveTab };
};

export default useActiveTab;
