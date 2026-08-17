import appConstants from '../constants/appConstant';
import { PaginatedInput } from '../interfaces/queryInterface';

export interface Pagination {
  page: number;
  limit: number;
}

export const paginateResponse = <T>(
  dataTotalCount: [T[], number],
  limit: number | string | undefined,
  page: number | string | undefined,
) => {
  const [data, total] = dataTotalCount;

  const parsedPage = Math.max(1, parseInt(page?.toString() ?? '1', 10) || 1);
  const parsedLimit = parseInt(limit?.toString() ?? '0', 10) || (total > 0 ? total : appConstants.DEFAULT_LIMIT);
  const lastPage = Math.max(1, Math.ceil(total / parsedLimit));
  const nextPage = parsedPage + 1 > lastPage ? null : parsedPage + 1;
  const prevPage = parsedPage - 1 < 1 ? null : parsedPage - 1;

  return {
    data,
    pagination: {
      count: total,
      currentPage: parsedPage,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    },
  };
};

export const skipTakeMaker = (paginationInput: PaginatedInput) => {
  // if undefined set default value
  paginationInput.page = paginationInput.page || appConstants.DEFAULT_PAGE;
  paginationInput.limit = paginationInput.limit || appConstants.DEFAULT_LIMIT;

  const skip = (paginationInput.page - 1) * paginationInput.limit;
  return { skip, take: paginationInput.limit };
};
