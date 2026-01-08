export interface PageRequestModel {
  page?: number;
  size?: number;
  sorts?: {
    property: string;
    direction: "ASC" | "DESC";
  }[];
  searchCriteria: {
    searchInput?: string;
  };
}
