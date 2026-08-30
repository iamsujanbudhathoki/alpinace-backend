import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Trek } from '../../entities/trek/Trek.entity';
import { Tour } from '../../entities/tour/Tour.entity';
import { Expedition } from '../../entities/expedition/Expedition.entity';
import { Category } from '../../entities/category/Category.entity';
import { Booking } from '../../entities/booking/Booking.entity';
import { Inquiry } from '../../entities/inquiry/Inquiry.entity';
import { BlogArticle } from '../../entities/blog/BlogArticle.entity';
import { Testimonial } from '../../entities/testimonial/Testimonial.entity';
import { TeamMember } from '../../entities/team/TeamMember.entity';
import { Faq } from '../../entities/faq/Faq.entity';
import { Media } from '../../entities/media/media.entity';

export interface AdminSearchResultItem {
  id: string;
  type: 'trek' | 'tour' | 'expedition' | 'category' | 'booking' | 'inquiry' | 'blog' | 'testimonial' | 'team' | 'faq' | 'media';
  typeLabel: string;
  title: string;
  subtitle: string;
  route: string;
}

export interface AdminSearchResponse {
  query: string;
  totalResults: number;
  results: AdminSearchResultItem[];
}

@autoInjectable()
export class AdminSearchService {
  private trekRepo = AppDataSource.getRepository(Trek);
  private tourRepo = AppDataSource.getRepository(Tour);
  private expeditionRepo = AppDataSource.getRepository(Expedition);
  private categoryRepo = AppDataSource.getRepository(Category);
  private bookingRepo = AppDataSource.getRepository(Booking);
  private inquiryRepo = AppDataSource.getRepository(Inquiry);
  private blogRepo = AppDataSource.getRepository(BlogArticle);
  private testimonialRepo = AppDataSource.getRepository(Testimonial);
  private teamRepo = AppDataSource.getRepository(TeamMember);
  private faqRepo = AppDataSource.getRepository(Faq);
  private mediaRepo = AppDataSource.getRepository(Media);

  async search(query: string): Promise<AdminSearchResponse> {
    const q = query.trim();
    if (!q || q.length < 2) {
      return { query: q, totalResults: 0, results: [] };
    }

    const searchPattern = `%${q.toLowerCase()}%`;
    const LIMIT_PER_ENTITY = 4;

    const [
      treks,
      tours,
      expeditions,
      categories,
      bookings,
      inquiries,
      blogs,
      testimonials,
      teams,
      faqs,
      medias,
    ] = await Promise.all([
      // 1. Treks
      this.trekRepo
        .createQueryBuilder('t')
        .where(
          'LOWER(t.title) LIKE :pattern OR LOWER(t.region) LIKE :pattern OR LOWER(t.slug) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 2. Tours
      this.tourRepo
        .createQueryBuilder('t')
        .where(
          'LOWER(t.title) LIKE :pattern OR LOWER(t.region) LIKE :pattern OR LOWER(t.slug) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 3. Expeditions
      this.expeditionRepo
        .createQueryBuilder('e')
        .where(
          'LOWER(e.title) LIKE :pattern OR LOWER(e.region) LIKE :pattern OR LOWER(e.slug) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 4. Categories
      this.categoryRepo
        .createQueryBuilder('c')
        .where(
          'LOWER(c.name) LIKE :pattern OR LOWER(c.slug) LIKE :pattern OR LOWER(c.description) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 5. Bookings
      this.bookingRepo
        .createQueryBuilder('b')
        .where(
          'LOWER(b.reference) LIKE :pattern OR LOWER(b.guestName) LIKE :pattern OR LOWER(b.guestEmail) LIKE :pattern OR LOWER(b.packageName) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 6. Inquiries
      this.inquiryRepo
        .createQueryBuilder('i')
        .where(
          'LOWER(i.guestName) LIKE :pattern OR LOWER(i.email) LIKE :pattern OR LOWER(i.interestedTrip) LIKE :pattern OR LOWER(i.message) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 7. Blogs
      this.blogRepo
        .createQueryBuilder('b')
        .where(
          'LOWER(b.title) LIKE :pattern OR LOWER(b.slug) LIKE :pattern OR LOWER(b.category) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 8. Testimonials
      this.testimonialRepo
        .createQueryBuilder('t')
        .where(
          'LOWER(t.author) LIKE :pattern OR LOWER(t.tripName) LIKE :pattern OR LOWER(t.country) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 9. Team
      this.teamRepo
        .createQueryBuilder('tm')
        .where(
          'LOWER(tm.name) LIKE :pattern OR LOWER(tm.role) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 10. FAQs
      this.faqRepo
        .createQueryBuilder('f')
        .where(
          'LOWER(f.question) LIKE :pattern OR LOWER(f.category) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),

      // 11. Media
      this.mediaRepo
        .createQueryBuilder('m')
        .where(
          'LOWER(m.name) LIKE :pattern OR LOWER(m.title) LIKE :pattern OR LOWER(m.altText) LIKE :pattern',
          { pattern: searchPattern },
        )
        .take(LIMIT_PER_ENTITY)
        .getMany(),
    ]);

    const results: AdminSearchResultItem[] = [];

    // Map Treks
    treks.forEach((t) => {
      results.push({
        id: t.id,
        type: 'trek',
        typeLabel: 'Trekking',
        title: t.title,
        subtitle: `${t.region || 'Nepal'} • ${t.durationDays || 0} Days • $${t.priceUSD || 0}`,
        route: `/admin/treks?id=${t.id}`,
      });
    });

    // Map Tours
    tours.forEach((t) => {
      results.push({
        id: t.id,
        type: 'tour',
        typeLabel: 'Tour',
        title: t.title,
        subtitle: `${t.region || 'Cultural'} • ${t.durationDays || 0} Days • $${t.priceUSD || 0}`,
        route: `/admin/tours?id=${t.id}`,
      });
    });

    // Map Expeditions
    expeditions.forEach((e) => {
      results.push({
        id: e.id,
        type: 'expedition',
        typeLabel: 'Expedition',
        title: e.title,
        subtitle: `${e.region || 'Everest'} • ${e.peakHeightM ? `${e.peakHeightM}m` : ''} • $${e.priceUSD || 0}`,
        route: `/admin/expeditions?id=${e.id}`,
      });
    });

    // Map Categories
    categories.forEach((c) => {
      results.push({
        id: c.id,
        type: 'category',
        typeLabel: 'Category',
        title: c.name,
        subtitle: `Type: ${c.type || 'General'} • Slug: ${c.slug}`,
        route: `/admin/categories?id=${c.id}`,
      });
    });

    // Map Bookings
    bookings.forEach((b) => {
      results.push({
        id: b.id,
        type: 'booking',
        typeLabel: 'Booking',
        title: `${b.guestName} (${b.reference})`,
        subtitle: `${b.packageName} • ${b.guestEmail}`,
        route: `/admin/bookings?id=${b.id}`,
      });
    });

    // Map Inquiries
    inquiries.forEach((i) => {
      results.push({
        id: i.id,
        type: 'inquiry',
        typeLabel: 'Inquiry',
        title: i.guestName,
        subtitle: `${i.interestedTrip || 'General Inquiry'} • ${i.email}`,
        route: `/admin/inquiries?id=${i.id}`,
      });
    });

    // Map Blogs
    blogs.forEach((b) => {
      results.push({
        id: b.id,
        type: 'blog',
        typeLabel: 'Blog Article',
        title: b.title,
        subtitle: `Category: ${b.category || 'Article'} • Status: ${b.status}`,
        route: `/admin/blogs?id=${b.id}`,
      });
    });

    // Map Testimonials
    testimonials.forEach((t) => {
      results.push({
        id: t.id,
        type: 'testimonial',
        typeLabel: 'Testimonial',
        title: t.author,
        subtitle: `${t.tripName || 'Guest Review'} • ${t.country || ''}`,
        route: `/admin/testimonials?id=${t.id}`,
      });
    });

    // Map Team
    teams.forEach((tm) => {
      results.push({
        id: tm.id,
        type: 'team',
        typeLabel: 'Team Member',
        title: tm.name,
        subtitle: `Role: ${tm.role} • Status: ${tm.status}`,
        route: `/admin/teams?id=${tm.id}`,
      });
    });

    // Map FAQs
    faqs.forEach((f) => {
      results.push({
        id: f.id,
        type: 'faq',
        typeLabel: 'FAQ',
        title: f.question,
        subtitle: `Category: ${f.category} • Status: ${f.status}`,
        route: `/admin/faqs?id=${f.id}`,
      });
    });

    // Map Media
    medias.forEach((m) => {
      results.push({
        id: m.id,
        type: 'media',
        typeLabel: 'Media File',
        title: m.title || m.name,
        subtitle: `${m.mimeType || 'file'} • ${m.fileSize || ''}`,
        route: `/admin/media?id=${m.id}`,
      });
    });

    return {
      query: q,
      totalResults: results.length,
      results,
    };
  }
}
