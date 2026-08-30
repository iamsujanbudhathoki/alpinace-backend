import { Trek } from '../entities/trek/Trek.entity';
import { Tour } from '../entities/tour/Tour.entity';
import { Expedition } from '../entities/expedition/Expedition.entity';
import { BlogArticle } from '../entities/blog/BlogArticle.entity';
import { TeamMember } from '../entities/team/TeamMember.entity';
import { Testimonial } from '../entities/testimonial/Testimonial.entity';
import { Faq } from '../entities/faq/Faq.entity';
import { Category } from '../entities/category/Category.entity';
import { AboutUs } from '../entities/about-us/AboutUs.entity';
import {
  PublicTrekSummaryDto,
  PublicTrekDetailDto,
  PublicTourSummaryDto,
  PublicTourDetailDto,
  PublicExpeditionSummaryDto,
  PublicExpeditionDetailDto,
  PublicBlogSummaryDto,
  PublicBlogDetailDto,
  PublicTeamMemberDto,
  PublicTestimonialDto,
  PublicFaqDto,
  PublicCategoryDto,
  PublicAboutUsDto,
  PublicSettingDto,
} from '../dtos/public-response.dto';

// ─── Trek Mappers ─────────────────────────────────────────────────────────────

export function toPublicTrekSummary(trek: Trek): PublicTrekSummaryDto {
  return {
    id: trek.id,
    title: trek.title,
    slug: trek.slug,
    category: (trek as any).category,
    categorySlug: (trek as any).categorySlug,
    categoryId: trek.categoryId,
    region: trek.region,
    durationDays: trek.durationDays,
    maxAltitudeMeters: trek.maxAltitudeMeters,
    difficulty: trek.difficulty,
    priceUSD: Number(trek.priceUSD),
    rating: trek.rating,
    reviewsCount: trek.reviewsCount,
    image: trek.image,
    shortDesc: trek.shortDesc,
    country: trek.country,
    bestSeason: trek.bestSeason,
  };
}

export function toPublicTrekDetail(trek: Trek): PublicTrekDetailDto {
  const summary = toPublicTrekSummary(trek);
  return {
    ...summary,
    activity: trek.activity,
    startEndLocation: trek.startEndLocation,
    accommodation: trek.accommodation,
    meals: trek.meals,
    groupSizeRange: trek.groupSizeRange,
    inclusionsText: trek.inclusionsText,
    exclusionsText: trek.exclusionsText,
    addonsText: trek.addonsText,
    usefulInfoText: trek.usefulInfoText,
    galleryImages: trek.galleryImages,
    mapImage: trek.mapImage,
    itinerary: trek.itinerary,
    faqs: trek.faqs,
    reviews: trek.reviews,
    departureDates: trek.departureDates,
    packageFiles: trek.packageFiles,
    metaTitle: trek.metaTitle,
    metaDescription: trek.metaDescription,
    keywords: trek.keywords,
  };
}

// ─── Tour Mappers ─────────────────────────────────────────────────────────────

export function toPublicTourSummary(tour: Tour): PublicTourSummaryDto {
  return {
    id: tour.id,
    title: tour.title,
    slug: tour.slug,
    category: (tour as any).category,
    categorySlug: (tour as any).categorySlug,
    categoryId: tour.categoryId,
    region: tour.region,
    tourType: tour.tourType,
    transportation: tour.transportation,
    durationDays: tour.durationDays,
    maxAltitudeMeters: tour.maxAltitudeMeters,
    difficulty: tour.difficulty,
    priceUSD: Number(tour.priceUSD),
    rating: tour.rating,
    reviewsCount: tour.reviewsCount,
    image: tour.image,
    shortDesc: tour.shortDesc,
    country: tour.country,
    bestSeason: tour.bestSeason,
  };
}

export function toPublicTourDetail(tour: Tour): PublicTourDetailDto {
  const summary = toPublicTourSummary(tour);
  return {
    ...summary,
    activity: tour.activity,
    startEndLocation: tour.startEndLocation,
    accommodation: tour.accommodation,
    meals: tour.meals,
    groupSizeRange: tour.groupSizeRange,
    inclusionsText: tour.inclusionsText,
    exclusionsText: tour.exclusionsText,
    addonsText: tour.addonsText,
    usefulInfoText: tour.usefulInfoText,
    galleryImages: tour.galleryImages,
    mapImage: tour.mapImage,
    itinerary: tour.itinerary,
    faqs: tour.faqs,
    reviews: tour.reviews,
    departureDates: tour.departureDates,
    packageFiles: tour.packageFiles,
    metaTitle: tour.metaTitle,
    metaDescription: tour.metaDescription,
    keywords: tour.keywords,
  };
}

// ─── Expedition Mappers ────────────────────────────────────────────────────────

export function toPublicExpeditionSummary(exp: Expedition): PublicExpeditionSummaryDto {
  return {
    id: exp.id,
    title: exp.title,
    slug: exp.slug,
    category: (exp as any).category,
    categorySlug: (exp as any).categorySlug,
    categoryId: exp.categoryId,
    region: exp.region,
    durationDays: exp.durationDays,
    peakHeightM: exp.peakHeightM,
    maxAltitudeMeters: exp.maxAltitudeMeters,
    climbingGrade: exp.climbingGrade,
    difficulty: exp.difficulty,
    sherpaGuideRatio: exp.sherpaGuideRatio,
    oxygenRequired: exp.oxygenRequired,
    priceUSD: Number(exp.priceUSD),
    rating: exp.rating,
    reviewsCount: exp.reviewsCount,
    image: exp.image,
    shortDesc: exp.shortDesc,
    country: exp.country,
    bestSeason: exp.bestSeason,
  };
}

export function toPublicExpeditionDetail(exp: Expedition): PublicExpeditionDetailDto {
  const summary = toPublicExpeditionSummary(exp);
  return {
    ...summary,
    activity: exp.activity,
    startEndLocation: exp.startEndLocation,
    accommodation: exp.accommodation,
    meals: exp.meals,
    groupSizeRange: exp.groupSizeRange,
    inclusionsText: exp.inclusionsText,
    exclusionsText: exp.exclusionsText,
    addonsText: exp.addonsText,
    usefulInfoText: exp.usefulInfoText,
    galleryImages: exp.galleryImages,
    mapImage: exp.mapImage,
    itinerary: exp.itinerary,
    faqs: exp.faqs,
    reviews: exp.reviews,
    departureDates: exp.departureDates,
    packageFiles: exp.packageFiles,
    metaTitle: exp.metaTitle,
    metaDescription: exp.metaDescription,
    keywords: exp.keywords,
  };
}

// ─── Blog Mappers ─────────────────────────────────────────────────────────────

export function toPublicBlogSummary(blog: BlogArticle): PublicBlogSummaryDto {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    readTime: blog.readTime,
    publishedDate: blog.publishedDate,
    excerpt: blog.excerpt,
    image: blog.image,
  };
}

export function toPublicBlogDetail(blog: BlogArticle): PublicBlogDetailDto {
  const summary = toPublicBlogSummary(blog);
  return {
    ...summary,
    content: blog.content,
    views: blog.views,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription,
    keywords: blog.keywords,
  };
}

// ─── Simple Resource Mappers ───────────────────────────────────────────────────

export function toPublicTeamMember(member: TeamMember): PublicTeamMemberDto {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    bio: member.bio,
    avatar: member.avatar,
    experience: member.experience,
  };
}

export function toPublicTestimonial(testimonial: Testimonial): PublicTestimonialDto {
  return {
    id: testimonial.id,
    author: testimonial.author,
    role: testimonial.role,
    country: testimonial.country,
    tripName: testimonial.tripName,
    content: testimonial.content,
    avatar: testimonial.avatar,
    rating: testimonial.rating,
  };
}

export function toPublicFaq(faq: Faq): PublicFaqDto {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
  };
}

export function toPublicCategory(category: Category): PublicCategoryDto {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    type: category.type,
    description: category.description,
    itemCount: category.itemCount,
    image: category.image,
    parentId: category.parentId || undefined,
  };
}

export function toPublicAboutUs(about: AboutUs): PublicAboutUsDto {
  return {
    id: about.id,
    heroTitle: about.heroTitle,
    heroSubtitle: about.heroSubtitle,
    heroImage: about.heroImage,
    storyTitle: about.storyTitle,
    storyContent: about.storyContent,
    storyImage: about.storyImage,
    mission: about.mission,
    vision: about.vision,
    values: about.values,
    stats: about.stats,
  };
}

export function toPublicSetting(settingsMap: Record<string, string>): PublicSettingDto {
  const PUBLIC_KEYS = [
    'siteName',
    'contactEmail',
    'contactPhone',
    'address',
    'currency',
    'socialLinks',
    'logo',
    'favicon',
    'tagline',
    'footerText',
  ];
  const publicSettings: PublicSettingDto = {};
  for (const [key, val] of Object.entries(settingsMap)) {
    if (PUBLIC_KEYS.includes(key) || !key.toLowerCase().includes('secret') && !key.toLowerCase().includes('key') && !key.toLowerCase().includes('token')) {
      publicSettings[key] = val;
    }
  }
  return publicSettings;
}
