import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { TripDifficulty } from '../common/difficulty.enum';

export enum TrekStatus {
  ACTIVE = 'active',
  FEATURED = 'featured',
  DRAFT = 'draft',
}

export interface TripItineraryDetail {
  label: string;
  value: string;
}

export interface TripItineraryDay {
  day: number;
  title: string;
  description: string;
  maxAltitude?: string;
  accommodation?: string;
  meals?: string;
  details?: TripItineraryDetail[];
  [key: string]: any;
}

export interface TripFaq {
  id?: string;
  question: string;
  answer: string;
}

export interface TripReview {
  id?: string;
  author: string;
  country: string;
  date?: string;
  rating: number;
  avatar?: string;
  content: string;
}

export interface TripDepartureDate {
  id?: string;
  startDate: string;
  endDate: string;
  priceUSD?: number;
  status?: string;
  seatsAvailable?: number;
  notes?: string;
}

export interface TripPackageFile {
  id?: string;
  mediaId?: string;
  title: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  uploadedAt?: string;
}

@Entity('treks')
export class Trek extends CommonEntity {
  @Column({ name: 'cover_media_id', nullable: true })
  coverMediaId?: string;

  @Column({ name: 'map_media_id', nullable: true })
  mapMediaId?: string;

  @Column({
    name: 'gallery_media_ids',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  galleryMediaIds?: string[];
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @Column({ name: 'region' })
  region: string;

  @Column({ name: 'duration_days', type: 'int' })
  durationDays: number;

  @Column({ name: 'max_altitude_meters', type: 'int', default: 1400 })
  maxAltitudeMeters: number;

  @Column({
    name: 'difficulty',
    type: 'enum',
    enum: TripDifficulty,
    default: TripDifficulty.MODERATE,
  })
  difficulty: TripDifficulty;

  @Column({ name: 'price_usd', type: 'decimal', precision: 10, scale: 2 })
  priceUSD: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TrekStatus,
    default: TrekStatus.ACTIVE,
  })
  status: TrekStatus;

  @Column({ name: 'total_bookings', type: 'int', default: 0 })
  totalBookings: number;

  @Column({ name: 'rating', type: 'float', default: 5.0 })
  rating: number;

  @Column({ name: 'reviews_count', type: 'int', default: 0 })
  reviewsCount: number;

  image?: string;
  galleryImages?: string[];
  mapImage?: string;



  @Column({ name: 'short_desc', type: 'text' })
  shortDesc: string;

  @Column({ name: 'best_season', nullable: true })
  bestSeason: string;

  @Column({ name: 'start_end_location', nullable: true })
  startEndLocation: string;

  @Column({ name: 'accommodation', nullable: true })
  accommodation: string;

  @Column({ name: 'meals', nullable: true })
  meals: string;

  @Column({ name: 'group_size_range', nullable: true })
  groupSizeRange: string;

  @Column({ name: 'permits_required', type: 'simple-array', default: [] })
  permitsRequired: string[];

  @Column({ name: 'inclusions_text', type: 'text', nullable: true })
  inclusionsText: string;

  @Column({ name: 'exclusions_text', type: 'text', nullable: true })
  exclusionsText: string;

  @Column({
    name: 'itinerary',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  itinerary: TripItineraryDay[];

  @Column({
    name: 'faqs',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  faqs: TripFaq[];

  @Column({
    name: 'reviews',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  reviews: TripReview[];

  @Column({ name: 'addons_text', type: 'text', nullable: true })
  addonsText: string;

  @Column({ name: 'useful_info_text', type: 'text', nullable: true })
  usefulInfoText: string;

  @Column({
    name: 'departure_dates',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  departureDates: TripDepartureDate[];



  @Column({
    name: 'package_files',
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  packageFiles: TripPackageFile[];

  @Column({ name: 'meta_title', nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;
}
