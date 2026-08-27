import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { TripDifficulty } from '../common/difficulty.enum';
import { TripActivity } from '../common/activity.enum';
import {
  TripDepartureDate,
  TripFaq,
  TripItineraryDay,
  TripPackageFile,
  TripReview,
} from '../trek/Trek.entity';

export enum TourStatus {
  ACTIVE = 'active',
  FEATURED = 'featured',
  DRAFT = 'draft',
}

export enum TourType {
  CULTURAL_HERITAGE = 'cultural_heritage',
  LUXURY_WELLNESS = 'luxury_wellness',
  WILDLIFE_SAFARI = 'wildlife_safari',
  HELICOPTER_TOUR = 'helicopter_tour',
  DAY_TOUR = 'day_tour',
  OTHER = 'other',
}

@Entity('tours')
export class Tour extends CommonEntity {
  @Column({ name: 'cover_media_id', type: 'varchar', nullable: true })
  coverMediaId?: string | null;

  @Column({ name: 'map_media_id', type: 'varchar', nullable: true })
  mapMediaId?: string | null;

  @Column({
    name: 'gallery_media_ids',
    type: 'json',
    nullable: true,
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

  @Column({
    name: 'tour_type',
    type: 'enum',
    enum: TourType,
    default: TourType.CULTURAL_HERITAGE,
  })
  tourType: TourType;

  @Column({ name: 'transportation', nullable: true })
  transportation: string;

  @Column({ name: 'duration_days', type: 'int' })
  durationDays: number;

  @Column({ name: 'max_altitude_meters', type: 'int', default: 1400 })
  maxAltitudeMeters: number;

  @Column({
    name: 'difficulty',
    type: 'enum',
    enum: TripDifficulty,
    default: TripDifficulty.EASY,
  })
  difficulty: TripDifficulty;

  @Column({ name: 'price_usd', type: 'decimal', precision: 10, scale: 2 })
  priceUSD: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TourStatus,
    default: TourStatus.ACTIVE,
  })
  status: TourStatus;

  @Column({ name: 'total_bookings', type: 'int', default: 0 })
  totalBookings: number;

  @Column({ name: 'rating', type: 'float', default: 5.0 })
  rating: number;

  @Column({ name: 'reviews_count', type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ name: 'image', type: 'text', nullable: true })
  image?: string;
  galleryImages?: string[];
  mapImage?: string;



  @Column({ name: 'short_desc', type: 'text' })
  shortDesc: string;

  @Column({ name: 'country', nullable: true, default: 'Nepal' })
  country: string;

  @Column({
    name: 'activity',
    type: 'enum',
    enum: TripActivity,
    default: TripActivity.CULTURAL_SIGHTSEEING,
    nullable: true,
  })
  activity: TripActivity;

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

  @Column({ name: 'inclusions_text', type: 'text', nullable: true })
  inclusionsText: string;

  @Column({ name: 'exclusions_text', type: 'text', nullable: true })
  exclusionsText: string;

  @Column({
    name: 'itinerary',
    type: 'json',
    nullable: true,
  })
  itinerary: TripItineraryDay[];

  @Column({
    name: 'faqs',
    type: 'json',
    nullable: true,
  })
  faqs: TripFaq[];

  @Column({
    name: 'reviews',
    type: 'json',
    nullable: true,
  })
  reviews: TripReview[];

  @Column({ name: 'addons_text', type: 'text', nullable: true })
  addonsText: string;

  @Column({ name: 'useful_info_text', type: 'text', nullable: true })
  usefulInfoText: string;

  @Column({
    name: 'departure_dates',
    type: 'json',
    nullable: true,
  })
  departureDates: TripDepartureDate[];



  @Column({
    name: 'package_files',
    type: 'json',
    nullable: true,
  })
  packageFiles: TripPackageFile[];

  @Column({ name: 'meta_title', nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;
}
