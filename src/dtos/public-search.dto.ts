export enum PublicSearchType {
  ALL = 'All',
  TREK = 'Trek',
  TOUR = 'Tour',
  EXPEDITION = 'Expedition',
  BLOG = 'Blog',
}

export interface PublicSearchResultItemDto {
  id: string;
  title: string;
  slug: string;
  type: PublicSearchType;
  category?: string;
  region?: string;
  durationDays?: number;
  priceUSD?: number;
  difficulty?: string;
  image?: string;
}

export interface PublicSearchResponseDto {
  query: string;
  totalResults: number;
  results: PublicSearchResultItemDto[];
}
