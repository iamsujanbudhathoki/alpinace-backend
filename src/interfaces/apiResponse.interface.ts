export interface PaginationMeta {
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface ApiResponse<T> {
  data: T | T[] | null;
  pagination?: PaginationMeta;
  success: boolean;
  message: string;
}

