export interface Pageable<T> {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}
