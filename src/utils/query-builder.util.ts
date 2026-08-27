import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseQueryParamsDto } from '../schemas/query-params.schema';

export function applyBaseQueryParams<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  params: BaseQueryParamsDto = {},
  searchFields: string[] = [],
  defaultSortBy: string = 'order',
  defaultSortOrder: 'ASC' | 'DESC' = 'ASC',
): void {
  if (params.status && params.status !== 'All') {
    qb.andWhere(`${alias}.status = :status`, { status: params.status });
  }

  if (params.search && params.search.trim() && searchFields.length > 0) {
    const term = `%${params.search.trim().toLowerCase()}%`;
    const conditions = searchFields
      .map((field) => `LOWER(${alias}.${field}) LIKE :term`)
      .join(' OR ');
    qb.andWhere(`(${conditions})`, { term });
  }

  const sortBy = params.sortBy || defaultSortBy;
  const sortOrder = (params.sortOrder?.toUpperCase() as 'ASC' | 'DESC') || defaultSortOrder;
  qb.orderBy(`${alias}.${sortBy}`, sortOrder);

  if (sortBy !== 'createdAt') {
    qb.addOrderBy(`${alias}.createdAt`, 'ASC');
  }

  if (params.limit) {
    qb.take(params.limit);
    if (params.page && params.page > 1) {
      qb.skip((params.page - 1) * params.limit);
    }
  }
}
