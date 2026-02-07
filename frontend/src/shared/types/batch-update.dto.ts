export interface BatchUpdateDto<T> {
  requestDtoList: T[];
  deletedIds?: number[];
}
