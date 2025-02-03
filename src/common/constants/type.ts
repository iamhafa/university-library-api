export type TPagination<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};
