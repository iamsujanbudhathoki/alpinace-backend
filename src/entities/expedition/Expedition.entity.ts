import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { TripDifficulty } from '../common/difficulty.enum';
import { TripFaq, TripReview } from '../trek/Trek.entity';

export enum ExpeditionStatus {
  ACTIVE = 'active',
  FEATURED = 'featured',
  DRAFT = 'draft',
}

export enum ClimbingGrade {
  NON_TECHNICAL_TREKKING_PEAK = 'Non-Technical Trekking Peak',
  TECHNICAL_ALPINE_GRADE = 'Technical Alpine Grade',
  EXTREME_TECHNICAL_GRADE = 'Extreme Technical Grade',
}

@Entity('expeditions')
export class Expedition extends CommonEntity {
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

  @Column({ name: 'peak_height_m', type: 'int', default: 6000 })
  peakHeightM: number;

  @Column({ name: 'max_altitude_meters', type: 'int', default: 6000 })
  maxAltitudeMeters: number;

  @Column({
    name: 'climbing_grade',
    type: 'enum',
    enum: ClimbingGrade,
    default: ClimbingGrade.EXTREME_TECHNICAL_GRADE,
  })
  climbingGrade: ClimbingGrade;

  @Column({
    name: 'difficulty',
    type: 'enum',
    enum: TripDifficulty,
    default: TripDifficulty.EXTREME,
  })
  difficulty: TripDifficulty;

  @Column({ name: 'sherpa_guide_ratio', default: '1:1 Sherpa Guide Ratio' })
  sherpaGuideRatio: string;

  @Column({ name: 'oxygen_required', default: true })
  oxygenRequired: boolean;

  @Column({ name: 'price_usd', type: 'decimal', precision: 10, scale: 2 })
  priceUSD: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ExpeditionStatus,
    default: ExpeditionStatus.ACTIVE,
  })
  status: ExpeditionStatus;

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

  @Column({ name: 'meta_title', nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;
}
