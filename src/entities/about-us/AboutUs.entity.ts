import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum AboutUsStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export interface AboutUsValueItem {
  title: string;
  desc: string;
}

export interface AboutUsStatItem {
  number: string;
  label: string;
}

@Entity('about_us')
export class AboutUs extends CommonEntity {
  @Column({ name: 'hero_title', type: 'text', nullable: true })
  heroTitle: string;

  @Column({ name: 'hero_subtitle', type: 'text', nullable: true })
  heroSubtitle: string;

  @Column({ name: 'hero_image', type: 'text', nullable: true })
  heroImage: string;

  @Column({ name: 'story_title', type: 'text', nullable: true })
  storyTitle: string;

  @Column({ name: 'story_content', type: 'longtext', nullable: true })
  storyContent: string;

  @Column({ name: 'story_image', type: 'text', nullable: true })
  storyImage: string;

  @Column({ name: 'mission', type: 'longtext', nullable: true })
  mission: string;

  @Column({ name: 'vision', type: 'longtext', nullable: true })
  vision: string;

  @Column({ name: 'values', type: 'json', nullable: true })
  values: AboutUsValueItem[];

  @Column({ name: 'stats', type: 'json', nullable: true })
  stats: AboutUsStatItem[];

  @Column({
    name: 'status',
    type: 'enum',
    enum: AboutUsStatus,
    default: AboutUsStatus.PUBLISHED,
  })
  status: AboutUsStatus;

  // Essential Core Meta SEO fields
  @Column({ name: 'meta_title', type: 'text', nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'meta_keywords', type: 'text', nullable: true })
  metaKeywords: string;
}
