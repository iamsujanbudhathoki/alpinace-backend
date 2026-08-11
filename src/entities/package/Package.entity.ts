import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum PackageCategoryType {
  TREKKING = 'Trekking',
  EXPEDITION = 'Expedition',
  TOUR = 'Tour',
}

export enum PackageStatus {
  ACTIVE = 'Active',
  FEATURED = 'Featured',
  DRAFT = 'Draft',
}

@Entity('packages')
export class Package extends CommonEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({
    name: 'category_type',
    type: 'enum',
    enum: PackageCategoryType,
    default: PackageCategoryType.TREKKING,
  })
  categoryType: PackageCategoryType;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @Column({ name: 'region' })
  region: string;

  @Column({ name: 'duration_days', type: 'int' })
  durationDays: number;

  @Column({ name: 'max_altitude_meters', type: 'int', default: 1400 })
  maxAltitudeMeters: number;

  @Column({ name: 'difficulty', default: 'Moderate' })
  difficulty: string;

  @Column({ name: 'price_usd', type: 'decimal', precision: 10, scale: 2 })
  priceUSD: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PackageStatus,
    default: PackageStatus.ACTIVE,
  })
  status: PackageStatus;

  @Column({ name: 'total_bookings', type: 'int', default: 0 })
  totalBookings: number;

  @Column({ name: 'rating', type: 'float', default: 5.0 })
  rating: number;

  @Column({ name: 'reviews_count', type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ name: 'image', type: 'text' })
  image: string;

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

  @Column({ name: 'meta_title', nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;
}
