import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  // General Business Info
  @IsOptional()
  @IsString()
  siteName?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @IsOptional()
  @IsString()
  companyAddress?: string;

  @IsOptional()
  @IsString()
  googleMapsUrl?: string;

  @IsOptional()
  @IsString()
  officeHours?: string;

  // SEO & Webmaster
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  googleAnalyticsId?: string;

  @IsOptional()
  @IsString()
  googleSiteVerification?: string;

  // Social Links
  @IsOptional()
  @IsString()
  facebookUrl?: string;

  @IsOptional()
  @IsString()
  instagramUrl?: string;

  @IsOptional()
  @IsString()
  youtubeUrl?: string;

  @IsOptional()
  @IsString()
  tripadvisorUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  // Dynamic & Custom Content
  @IsOptional()
  @IsString()
  siteTitle?: string;

  @IsOptional()
  @IsString()
  homeStats?: string;

  @IsOptional()
  @IsString()
  companyFaqs?: string;

  @IsOptional()
  @IsString()
  testimonials?: string;

  // Booking & Operations
  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  depositPercentage?: string;

  @IsOptional()
  @IsString()
  enableBookings?: string;
}
