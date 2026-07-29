export interface BaseSearch {
  search?: string;

  page: number;

  pageSize: number;

  sortBy?: string;

  descending: boolean;
}