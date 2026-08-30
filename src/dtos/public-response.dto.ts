import { TripDifficulty } from '../entities/common/difficulty.enum';
import { TripActivity } from '../entities/common/activity.enum';
import { TourType } from '../entities/tour/Tour.entity';
import { ClimbingGrade } from '../entities/expedition/Expedition.entity';
import { CategoryType } from '../entities/category/Category.entity';
import {
  TripDepartureDate,
  TripFaq,
  TripItineraryDay,
  TripPackageFile,
  TripReview,
} from '../entities/trek/Trek.entity';

// ─── Public Trek DTOs ──────────────────────────────────────────────────────────

export interface PublicTrekSummaryDto {
  id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  region: string;
  durationDays: number;
  maxAltitudeMeters: number;
  difficulty: TripDifficulty;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  shortDesc: string;
  country?: string;
  bestSeason?: string;
}

export interface PublicTrekDetailDto extends PublicTrekSummaryDto {
  activity?: TripActivity;
  startEndLocation?: string;
  accommodation?: string;
  meals?: string;
  groupSizeRange?: string;
  inclusionsText?: string;
  exclusionsText?: string;
  addonsText?: string;
  usefulInfoText?: string;
  galleryImages?: string[];
  mapImage?: string;
  itinerary?: TripItineraryDay[];
  faqs?: TripFaq[];
  reviews?: TripReview[];
  departureDates?: TripDepartureDate[];
  packageFiles?: TripPackageFile[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

// ─── Public Tour DTOs ──────────────────────────────────────────────────────────

export interface PublicTourSummaryDto {
  id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  region: string;
  tourType: TourType;
  transportation?: string;
  durationDays: number;
  maxAltitudeMeters: number;
  difficulty: TripDifficulty;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  shortDesc: string;
  country?: string;
  bestSeason?: string;
}

export interface PublicTourDetailDto extends PublicTourSummaryDto {
  activity?: TripActivity;
  startEndLocation?: string;
  accommodation?: string;
  meals?: string;
  groupSizeRange?: string;
  inclusionsText?: string;
  exclusionsText?: string;
  addonsText?: string;
  usefulInfoText?: string;
  galleryImages?: string[];
  mapImage?: string;
  itinerary?: TripItineraryDay[];
  faqs?: TripFaq[];
  reviews?: TripReview[];
  departureDates?: TripDepartureDate[];
  packageFiles?: TripPackageFile[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

// ─── Public Expedition DTOs ───────────────────────────────────────────────────

export interface PublicExpeditionSummaryDto {
  id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  region: string;
  durationDays: number;
  peakHeightM: number;
  maxAltitudeMeters: number;
  climbingGrade: ClimbingGrade;
  difficulty: TripDifficulty;
  sherpaGuideRatio?: string;
  oxygenRequired?: boolean;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  shortDesc: string;
  country?: string;
  bestSeason?: string;
}

export interface PublicExpeditionDetailDto extends PublicExpeditionSummaryDto {
  activity?: TripActivity;
  startEndLocation?: string;
  accommodation?: string;
  meals?: string;
  groupSizeRange?: string;
  inclusionsText?: string;
  exclusionsText?: string;
  addonsText?: string;
  usefulInfoText?: string;
  galleryImages?: string[];
  mapImage?: string;
  itinerary?: TripItineraryDay[];
  faqs?: TripFaq[];
  reviews?: TripReview[];
  departureDates?: TripDepartureDate[];
  packageFiles?: TripPackageFile[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

// ─── Public Blog DTOs ──────────────────────────────────────────────────────────

export interface PublicBlogSummaryDto {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishedDate?: string;
  excerpt?: string;
  image?: string;
}

export interface PublicBlogDetailDto extends PublicBlogSummaryDto {
  content?: string;
  views?: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

// ─── Public Other Resource DTOs ───────────────────────────────────────────────

export interface PublicTeamMemberDto {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  experience?: string;
}

export interface PublicTestimonialDto {
  id: string;
  author: string;
  role?: string;
  country?: string;
  tripName?: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface PublicFaqDto {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PublicCategoryDto {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  itemCount: number;
  image?: string | null;
  parentId?: string;
}

export interface PublicAboutUsDto {
  id: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  storyTitle?: string;
  storyContent?: string;
  storyImage?: string;
  mission?: string;
  vision?: string;
  values?: any[];
  stats?: any[];
}

export interface PublicSettingDto {
  [key: string]: string;
}
