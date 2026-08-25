import { AppDataSource } from '../config/database.config';
import { Admin } from '../entities/admin/Admin.entity';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../entities/category/Category.entity';
import { Trek, TrekStatus } from '../entities/trek/Trek.entity';
import { Tour, TourStatus, TourType } from '../entities/tour/Tour.entity';
import {
  Expedition,
  ExpeditionStatus,
  ClimbingGrade,
} from '../entities/expedition/Expedition.entity';
import { TripDifficulty } from '../entities/common/difficulty.enum';
import { Guide, GuideRole, GuideStatus } from '../entities/guide/Guide.entity';
import {
  Booking,
  BookingPackageType,
  BookingPaymentStatus,
  BookingPermitStatus,
  BookingStatus,
} from '../entities/booking/Booking.entity';
import { Inquiry, InquiryStatus } from '../entities/inquiry/Inquiry.entity';
import { BlogArticle, BlogStatus } from '../entities/blog/BlogArticle.entity';
import { Setting } from '../entities/setting/Setting.entity';
import { Media } from '../entities/media/media.entity';
import {
  Associate,
  AssociateStatus,
} from '../entities/associate/Associate.entity';
import { Faq, FaqStatus } from '../entities/faq/Faq.entity';
import { MediaType } from '../constants/appConstant';

export const seedDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  console.log('Database initialized for seeding...');

  // 1. Seed Categories & Ensure Slugs
  const categoryRepo = AppDataSource.getRepository(Category);

  // Migration/repair check: ensure all existing category records in DB have valid unique slugs
  const existingDbCategories = await categoryRepo.find();
  for (const cat of existingDbCategories) {
    if (!cat.slug || !cat.slug.trim()) {
      let slug = cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!slug) slug = `category-${cat.id}`;
      const collision = await categoryRepo.findOne({ where: { slug } });
      if (collision && collision.id !== cat.id) {
        slug = `${slug}-${cat.id.slice(0, 4)}`;
      }
      cat.slug = slug;
      await categoryRepo.save(cat);
    }
  }

  const categoriesData = [
    {
      name: 'Everest & Khumbu Region',
      slug: 'everest-khumbu-region',
      type: CategoryType.TREKKING,
      description:
        'Trekking packages navigating the iconic Khumbu valley, Lukla, Namche Bazaar, and Everest Base Camp.',
      itemCount: 8,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Everest Base Camp Treks', slug: 'everest-base-camp', description: 'Classic trail to EBC & Kala Patthar 5,545m', itemCount: 4, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
        { name: 'Gokyo Lakes & Cho La Pass', slug: 'gokyo-lakes-cho-la', description: 'Turquoise glacial lakes and high pass crossing', itemCount: 3, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
        { name: 'Three High Passes Challenge', slug: 'three-passes-trek', description: 'Kongma La, Cho La, and Renjo La alpine routes', itemCount: 2, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
        { name: 'Everest Luxury Lodge Treks', slug: 'everest-luxury-lodge', description: 'Five-star mountain lodge experience in Khumbu', itemCount: 2, image: 'https://images.unsplash.com/photo-1516481400365-878b508f2fea?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'Annapurna Sanctuary Circuit',
      slug: 'annapurna-sanctuary-circuit',
      type: CategoryType.TREKKING,
      description:
        'Traversing Thorong La pass, Poon Hill sunrises, and Annapurna Base Camp.',
      itemCount: 5,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Annapurna Circuit Trek', slug: 'annapurna-circuit', description: 'Thorong La Pass 5,416m and Kali Gandaki gorge', itemCount: 3, image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca913b?auto=format&fit=crop&w=800&q=80' },
        { name: 'Annapurna Base Camp (ABC)', slug: 'annapurna-base-camp', description: 'Deep amphitheater surrounded by 8000m peaks', itemCount: 3, image: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=800&q=80' },
        { name: 'Ghorepani Poon Hill', slug: 'poon-hill-sunrise', description: 'Short panoramic sunrise trek over Dhaulagiri', itemCount: 2, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc32?auto=format&fit=crop&w=800&q=80' },
        { name: 'Mardi Himal Ridge Trek', slug: 'mardi-himal', description: 'Off-the-beaten-path ridge trek under Machhapuchhre', itemCount: 2, image: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'Langtang & Sacred Lakes',
      slug: 'langtang-sacred-lakes',
      type: CategoryType.TREKKING,
      description:
        'Pristine rhododendron forests, Tamang mountain heritage, and Gosaikunda glacier-fed lakes.',
      itemCount: 4,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Langtang Valley Trek', slug: 'langtang-valley', description: 'Glacial valley trek with Tamang cultural heritage', itemCount: 3, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
        { name: 'Gosaikunda Sacred Lakes', slug: 'gosaikunda-lakes', description: 'Sacred glacier-fed mountain lakes at 4,380m', itemCount: 2, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
        { name: 'Tamang Heritage Trail', slug: 'tamang-heritage', description: 'Homestay culture, hot springs, and Tibetan traditions', itemCount: 2, image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'Manaslu Restricted Circuit',
      slug: 'manaslu-restricted-circuit',
      type: CategoryType.TREKKING,
      description:
        'Circumnavigating Mt. Manaslu (8,163m) across Larkya La pass in restricted wilderness.',
      itemCount: 3,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Manaslu Circuit Trek', slug: 'manaslu-circuit', description: 'Larkya La pass 5,160m around Mt. Manaslu', itemCount: 2, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
        { name: 'Upper Mustang Kingdom', slug: 'upper-mustang', description: 'Walled city of Lo Manthang and Tibetan caves', itemCount: 2, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
        { name: 'Kanchenjunga Circuit', slug: 'kanchenjunga-circuit', description: 'Far-eastern wilderness to world 3rd highest peak', itemCount: 1, image: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'UNESCO Heritage & Resorts',
      slug: 'unesco-heritage-resorts',
      type: CategoryType.TOURS,
      description:
        'Cultural sightseeing, boutique heritage hotels, and luxury Pokhara resort stays.',
      itemCount: 6,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Kathmandu Valley World Heritage', slug: 'kathmandu-heritage', description: 'Durbar squares, Swayambhunath, and Pashupatinath', itemCount: 3, image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80' },
        { name: 'Pokhara Scenic & Lake Tour', slug: 'pokhara-lakeside', description: 'Phewa lake boating, Sarangkot sunrise, and mountain views', itemCount: 3, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc32?auto=format&fit=crop&w=800&q=80' },
        { name: 'Lumbini Sacred Pilgrimage', slug: 'lumbini-birthplace', description: 'Birthplace of Lord Buddha and international monasteries', itemCount: 2, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'Luxury & Helicopter Tours',
      slug: 'luxury-helicopter-tours',
      type: CategoryType.TOURS,
      description:
        'Helicopter day charters, Everest breakfast flights, and luxury resort transfers.',
      itemCount: 4,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Everest Helicopter Day Tour', slug: 'everest-heli-tour', description: 'Fly to Kala Patthar and champagne breakfast at Everest', itemCount: 2, image: 'https://images.unsplash.com/photo-1516481400365-878b508f2fea?auto=format&fit=crop&w=800&q=80' },
        { name: 'Annapurna Heli Landing', slug: 'annapurna-heli-landing', description: 'Direct helicopter landing at Annapurna Base Camp', itemCount: 2, image: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=800&q=80' },
        { name: 'Gosaikunda Heli Flight', slug: 'gosaikunda-heli', description: 'Quick morning helicopter flight to sacred Gosaikunda', itemCount: 1, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'Wildlife & Jungle Safari',
      slug: 'wildlife-jungle-safari',
      type: CategoryType.TOURS,
      description:
        'Chitwan national park safaris, rhino tracking, and Tharu cultural experiences.',
      itemCount: 3,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Chitwan National Park Safari', slug: 'chitwan-safari', description: 'One-horned rhinos, Bengal tigers, and canoe rides', itemCount: 2, image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=800&q=80' },
        { name: 'Bardia Wilderness Sanctuary', slug: 'bardia-safari', description: 'Pristine jungle sanctuary in western Nepal', itemCount: 1, image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: '8000m Technical Expeditions',
      slug: '8000m-technical-expeditions',
      type: CategoryType.EXPEDITIONS,
      description:
        'Extreme high-altitude peak climbs requiring IFMGA guide ratios, oxygen systems, and fixed-line logistics.',
      itemCount: 4,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Mt. Everest Expedition (8,848m)', slug: 'mt-everest-expedition', description: 'Ultimate summit of the world with 1:1 Sherpa guide ratio', itemCount: 2, image: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=800&q=80' },
        { name: 'Mt. Lhotse Expedition (8,516m)', slug: 'mt-lhotse-expedition', description: 'World 4th highest peak via South Col route', itemCount: 1, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
        { name: 'Mt. Manaslu Expedition (8,163m)', slug: 'mt-manaslu-expedition', description: 'Autumn 8000m expedition in Gorkha region', itemCount: 2, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: '6000m & 7000m Peak Climbing',
      slug: '6000m-7000m-peaks',
      type: CategoryType.EXPEDITIONS,
      description:
        'Trekking peaks and technical alpine climbs including Island Peak, Mera Peak, and Ama Dablam.',
      itemCount: 5,
      status: CategoryStatus.ACTIVE,
      subcategories: [
        { name: 'Ama Dablam Expedition (6,812m)', slug: 'ama-dablam-expedition', description: 'The Jewel of the Himalayas technical ridge climbing', itemCount: 2, image: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=800&q=80' },
        { name: 'Island Peak (Imja Tse 6,189m)', slug: 'island-peak-climbing', description: 'Classic Himalayan climbing peak combined with EBC', itemCount: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
        { name: 'Mera Peak (6,476m)', slug: 'mera-peak-climbing', description: 'Highest trekking peak in Nepal with 5 x 8000m views', itemCount: 2, image: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=800&q=80' },
        { name: 'Lobuche East (6,119m)', slug: 'lobuche-east-climbing', description: 'Technical snow ridge climb near Everest Base Camp', itemCount: 2, image: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    {
      name: 'High Altitude Physiology & Safety',
      slug: 'high-altitude-physiology-safety',
      type: CategoryType.BLOGS,
      description:
        'Expert guide insights on AMS prevention, acclimatization schedules, and mountain wellness.',
      itemCount: 12,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: 'Helicopter Charter Photography',
      slug: 'helicopter-charter-photography',
      type: CategoryType.MEDIA,
      description:
        'Aerial mountain imagery, heli-tour photography, and high-resolution marketing banners.',
      itemCount: 24,
      status: CategoryStatus.ACTIVE,
    },
  ];

  for (const cat of categoriesData) {
    const slug = cat.slug || cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    let parentCat = await categoryRepo.findOne({
      where: [{ slug }, { name: cat.name }],
      withDeleted: true,
    });
    if (!parentCat) {
      parentCat = await categoryRepo.save(
        categoryRepo.create({
          name: cat.name,
          slug,
          type: cat.type,
          description: cat.description,
          itemCount: cat.itemCount,
          status: cat.status,
          parentId: null,
        }),
      );
    } else {
      parentCat.type = cat.type;
      parentCat.description = cat.description;
      parentCat.status = cat.status;
      await categoryRepo.save(parentCat);
    }

    if (cat.subcategories && cat.subcategories.length > 0) {
      for (const sub of cat.subcategories) {
        const subSlug = sub.slug || sub.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
        const existingSub = await categoryRepo.findOne({
          where: [{ slug: subSlug }, { name: sub.name }],
          withDeleted: true,
        });
        if (!existingSub) {
          await categoryRepo.save(
            categoryRepo.create({
              name: sub.name,
              slug: subSlug,
              type: cat.type,
              description: sub.description || '',
              itemCount: sub.itemCount || 0,
              status: CategoryStatus.ACTIVE,
              parentId: parentCat.id,
              image: (sub as any).image || null,
            }),
          );
        } else {
          existingSub.parentId = parentCat.id;
          existingSub.type = cat.type;
          existingSub.description = sub.description || existingSub.description;
          if ((sub as any).image) existingSub.image = (sub as any).image;
          await categoryRepo.save(existingSub);
        }
      }
    }
  }
  console.log('Seeded categories');

  // 3. Seed Centralized Media First
  const mediaRepo = AppDataSource.getRepository(Media);
  const mediaMap = new Map<string, Media>();
  const mediaCategory = await categoryRepo.findOne({ where: { type: CategoryType.MEDIA } });

  const seedMediaDefinitions = [
    // Treks Covers
    { key: 'ebc-gokyo-cover', name: 'ebc-gokyo-cover.jpg', path: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', title: 'Everest Base Camp & Gokyo Cover' },
    { key: 'ebc-luxury-cover', name: 'ebc-luxury-cover.jpg', path: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', title: 'Everest Luxury Lodge Cover' },
    { key: 'annapurna-circuit-cover', name: 'annapurna-circuit-cover.jpg', path: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca913b?auto=format&fit=crop&w=1200&q=80', title: 'Annapurna Circuit Cover' },
    { key: 'annapurna-panoramic-cover', name: 'annapurna-panoramic-cover.jpg', path: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca913b?auto=format&fit=crop&w=1200&q=80', title: 'Annapurna Panoramic Cover' },
    { key: 'manaslu-cover', name: 'manaslu-cover.jpg', path: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80', title: 'Manaslu Circuit Cover' },
    { key: 'langtang-cover', name: 'langtang-cover.jpg', path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', title: 'Langtang Valley Cover' },

    // Maps, Galleries & Package Files
    { key: 'himalayan-route-map', name: 'himalayan-route-map.jpg', path: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80', title: 'Himalayan Route Map' },
    { key: 'himalayan-gallery-1', name: 'himalayan-gallery-1.jpg', path: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', title: 'Himalayan Gallery 1' },
    { key: 'himalayan-gallery-2', name: 'himalayan-gallery-2.jpg', path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', title: 'Himalayan Gallery 2' },
    { key: 'expedition-dossier-pdf', name: 'expedition-dossier.pdf', path: 'https://example.com/docs/expedition-dossier.pdf', title: 'Official Expedition Dossier', mimeType: 'application/pdf', fileSize: '1500000' },
    { key: 'tour-itinerary-pdf', name: 'tour-itinerary.pdf', path: 'https://example.com/docs/tour-itinerary.pdf', title: 'Official Tour Itinerary', mimeType: 'application/pdf', fileSize: '1200000' },
    { key: 'climbing-guide-pdf', name: 'climbing-guide.pdf', path: 'https://example.com/docs/climbing-guide.pdf', title: 'Official Climbing Guide', mimeType: 'application/pdf', fileSize: '2100000' },

    // Tours Covers
    { key: 'kathmandu-heritage-cover', name: 'kathmandu-heritage-cover.jpg', path: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80', title: 'Kathmandu Royal Heritage Cover' },
    { key: 'pokhara-lakeside-cover', name: 'pokhara-lakeside-cover.jpg', path: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc32?auto=format&fit=crop&w=1200&q=80', title: 'Pokhara Lakeside Retreat Cover' },
    { key: 'chitwan-safari-cover', name: 'chitwan-safari-cover.jpg', path: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=1200&q=80', title: 'Chitwan Luxury Safari Cover' },
    { key: 'everest-scenic-flight-cover', name: 'everest-scenic-flight-cover.jpg', path: 'https://images.unsplash.com/photo-1516481400365-878b508f2fea?auto=format&fit=crop&w=1200&q=80', title: 'Everest Scenic Flight Cover' },

    // Expeditions Covers
    { key: 'ama-dablam-cover', name: 'ama-dablam-cover.jpg', path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', title: 'Ama Dablam Expedition Cover' },
    { key: 'island-peak-cover', name: 'island-peak-cover.jpg', path: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=1200&q=80', title: 'Island Peak Expedition Cover' },
    { key: 'everest-summit-cover', name: 'everest-summit-cover.jpg', path: 'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=1200&q=80', title: 'Everest Summit Expedition Cover' },
    { key: 'mera-peak-cover', name: 'mera-peak-cover.jpg', path: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=1200&q=80', title: 'Mera Peak Expedition Cover' },

    // Blogs Covers
    { key: 'blog-high-altitude-prep-cover', name: 'blog-high-altitude-prep.jpg', path: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', title: 'High Altitude Prep Cover' },
    { key: 'blog-packing-list-cover', name: 'blog-packing-list.jpg', path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', title: 'Packing List Cover' },
    { key: 'blog-sherpa-culture-cover', name: 'blog-sherpa-culture.jpg', path: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', title: 'Sherpa Culture Cover' },
    { key: 'blog-ama-vs-island-cover', name: 'blog-ama-vs-island.jpg', path: 'https://images.unsplash.com/photo-1516482498816-ba38689e1c14?auto=format&fit=crop&w=800&q=80', title: 'Ama Dablam vs Island Peak Cover' },

    // Avatars & Logos
    { key: 'guide-lakpa-avatar', name: 'guide-lakpa-avatar.jpg', path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', title: 'Lakpa Avatar' },
    { key: 'guide-mingma-avatar', name: 'guide-mingma-avatar.jpg', path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', title: 'Mingma Avatar' },
    { key: 'guide-pemba-avatar', name: 'guide-pemba-avatar.jpg', path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', title: 'Pemba Avatar' },
    { key: 'guide-rohan-avatar', name: 'guide-rohan-avatar.jpg', path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', title: 'Rohan Avatar' },
    { key: 'guide-pasang-avatar', name: 'guide-pasang-avatar.jpg', path: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', title: 'Pasang Avatar' },
    { key: 'assoc-taan-logo', name: 'assoc-taan-logo.jpg', path: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&auto=format&fit=crop&w=300&q=80', title: 'TAAN Logo' },
    { key: 'assoc-nma-logo', name: 'assoc-nma-logo.jpg', path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&auto=format&fit=crop&w=300&q=80', title: 'NMA Logo' },
    { key: 'assoc-hra-logo', name: 'assoc-hra-logo.jpg', path: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&w=300&q=80', title: 'HRA Logo' },
  ];

  for (const mDef of seedMediaDefinitions) {
    let m = await mediaRepo.findOne({ where: { path: mDef.path } });
    if (!m) {
      m = await mediaRepo.save(
        mediaRepo.create({
          name: mDef.name,
          title: mDef.title,
          path: mDef.path,
          mimeType: mDef.mimeType || 'image/jpeg',
          fileSize: mDef.fileSize || '500000',
          categoryId: mediaCategory ? mediaCategory.id : undefined,
          mediaType: MediaType.BLOG_THUMBNAIL,
        }),
      );
    }
    mediaMap.set(mDef.key, m);
  }
  console.log('Seeded centralized media records first');

  const getMediaId = (key: string): string => {
    const m = mediaMap.get(key);
    if (!m) throw new Error(`Media key ${key} not found`);
    return m.id;
  };

  const getMediaUrl = (key: string): string => {
    const m = mediaMap.get(key);
    if (!m) throw new Error(`Media key ${key} not found`);
    return m.path;
  };

  // Seed Admin User
  const adminRepo = AppDataSource.getRepository(Admin);
  const existingAdmin = await adminRepo.findOne({
    where: { email: 'admin@alpineace.com' },
    withDeleted: true,
  });
  if (!existingAdmin) {
    const admin = adminRepo.create({
      name: 'Sujan Budhathoki',
      email: 'admin@alpineace.com',
      password: 'admin123',
      role: 'Expedition Director',
      avatarUrl: getMediaUrl('guide-mingma-avatar'),
      phoneNumber: '+977 9841-234567',
      isActive: true,
    });
    await adminRepo.save(admin);
    console.log('Seeded admin: admin@alpineace.com');
  }

  // 4. Seed Treks
  const trekRepo = AppDataSource.getRepository(Trek);
  const defaultTrekFaqs = [
    {
      question: 'How do you manage high-altitude medical safety and AMS?',
      answer:
        'Every trek is led by certified IFMGA Sherpa leaders equipped with pulse oximeters, specialized high-altitude medical kits, portable supplemental oxygen, and 24/7 standby emergency helicopter evacuation coverage.',
    },
    {
      question: 'What is the standard of your luxury mountain lodges?',
      answer:
        'We partner exclusively with premium boutique lodges (such as Yeti Mountain Home and Ker & Downey) featuring private attached heated bathrooms, electric mattress warmers, hot showers, and chef-curated organic dining.',
    },
    {
      question:
        'Can I customize the departure dates or request private helicopter transfers?',
      answer:
        'Yes! Our adventure directors create bespoke departures tailored to your timeframe, private helicopter transfers, and personalized dietary requirements.',
    },
    {
      question: 'What luggage weight limit applies for domestic flights?',
      answer:
        'Domestic flights allow 15kg total per passenger (10kg duffle bag + 5kg daypack). Any extra city luggage can be safely stored free of charge at our Kathmandu luxury hotel partner.',
    },
  ];

  const defaultTrekReviews = [
    {
      author: 'Jonathan Vance',
      country: 'United States',
      date: 'May 2026',
      rating: 5,
      avatar: getMediaUrl('guide-mingma-avatar'),
      content:
        'The 1:1 Sherpa guide ratio and basecamp luxury made our journey unforgettable. Heated blankets and pulse-oximeter monitoring every evening set the gold standard in high-altitude mountaineering.',
    },
    {
      author: 'Elena Rostova',
      country: 'Germany',
      date: 'April 2026',
      rating: 5,
      avatar: getMediaUrl('guide-lakpa-avatar'),
      content:
        'Heated mattresses and organic fine dining at 4,000 meters! The Sherpa team looked after our safety with pulse oximeters every evening.',
    },
    {
      author: 'Jean-Pierre Dubois',
      country: 'France',
      date: 'March 2026',
      rating: 5,
      avatar: getMediaUrl('guide-pemba-avatar'),
      content:
        'Bespoke planning from start to finish. Our private helicopter transfer from the high pass back to Kathmandu was breathtaking. Alpine Ace is truly in a league of its own.',
    },
  ];

  const sampleEverestItinerary = [
    {
      day: 1,
      title: 'Arrive in Kathmandu & VIP Luxury Airport Transfer',
      description:
        'Our Alpine Ace airport representative will receive you at Tribhuvan International Airport with traditional flower garlands (Khada). You will then be transferred to your 5-star heritage hotel in our private tourist vehicle for evening orientation and gear check.',
      maxAltitude: 'Kathmandu (1,400 m)',
      accommodation: 'Overnight at Dwarika’s Heritage Hotel / Hyatt Regency',
      meals: 'Welcome Dinner with Cultural Show',
      details: [
        { label: 'Transport', value: 'Private Mercedes / Alphard Van' },
        { label: 'Briefing', value: '6:00 PM Gear & Safety Check' },
      ],
    },
    {
      day: 2,
      title: 'Scenic Mountain Flight to Lukla (2,860 m) & Trek to Phakding',
      description:
        'Early morning flight to Tenzing-Hillary Airport in Lukla. Meet your dedicated Sherpa porter team and begin a gradual 3 to 4 hour trek down to Phakding along the turquoise Dudh Koshi river valley.',
      maxAltitude: 'Lukla (2,860 m) / Phakding (2,610 m)',
      accommodation: 'Overnight at Yeti Mountain Home Phakding',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '3 - 4 hours' },
        { label: 'Distance', value: '7.8 km' },
      ],
    },
    {
      day: 3,
      title: 'Trek to Namche Bazaar across Hillary Suspension Bridge',
      description:
        'Cross several high suspension bridges decorated with prayer flags and ascend through pine forests into Sagarmatha National Park. Catch your first panoramic glimpse of Mt. Everest before reaching the vibrant Sherpa capital of Namche.',
      maxAltitude: 'Namche Bazaar (3,440 m)',
      accommodation: 'Overnight at Panorama Lodge / Yeti Mountain Home',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '5 - 6 hours' },
        { label: 'Distance', value: '10.5 km' },
      ],
    },
    {
      day: 4,
      title: 'Acclimatization Day in Namche Bazaar & Everest View Hotel Hike',
      description:
        'Hike up to the iconic Hotel Everest View (3,880m) for breakfast with uninterrupted views of Everest, Lhotse, and Ama Dablam. Visit Khumjung village, Hillary School, and the local monastery.',
      maxAltitude: 'Everest View Hotel (3,880 m)',
      accommodation: 'Overnight at Namche Boutique Lodge',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '3 - 4 hours (Day Hike)' },
        { label: 'Altitude Gain', value: '+440 m / -440 m' },
      ],
    },
    {
      day: 5,
      title: 'Trek to Tengboche Monastery with Ama Dablam Views',
      description:
        'The trail winds past rhododendron forests down to Phunki Tenga, followed by a steady climb to Tengboche Monastery, the spiritual heart of the Khumbu region set against Ama Dablam.',
      maxAltitude: 'Tengboche (3,860 m)',
      accommodation: 'Overnight at Rivendell Boutique Lodge',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '5 hours' },
        { label: 'Highlights', value: 'Monastery Blessing & Evening Puja' },
      ],
    },
    {
      day: 6,
      title: 'Trek to Dingboche (4,410 m) into High Alpine Valley',
      description:
        'Gradual ascent above the tree line through Pangboche village, crossing the Imja Khola with spectacular vistas of Island Peak and the massive south face of Lhotse.',
      maxAltitude: 'Dingboche (4,410 m)',
      accommodation: 'Overnight at Good Luck Lodge / Peak 38 Lodge',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '5 - 6 hours' },
        { label: 'Distance', value: '11 km' },
      ],
    },
    {
      day: 7,
      title: 'Acclimatization Hike to Nagarjun Hill (5,100 m)',
      description:
        'Climb the ridge behind Dingboche to Nagarjun viewpoint overlooking Makalu, Cho Oyu, and Island Peak. Active rest afternoon with pulse oximetry health checks.',
      maxAltitude: 'Nagarjun Hill (5,100 m)',
      accommodation: 'Overnight at Dingboche Lodge',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '4 hours' },
        { label: 'Medical Check', value: 'Daily SpO2 & Heart Rate Log' },
      ],
    },
    {
      day: 8,
      title: 'Trek to Lobuche past Thokla Pass Climber Memorials',
      description:
        'Follow the wide moraine valley up to Dughla, then climb the steep terminal moraine of Khumbu Glacier to the touching memorials for fallen Everest climbers.',
      maxAltitude: 'Lobuche (4,940 m)',
      accommodation: 'Overnight at Eco Lodge Lobuche',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '5 hours' },
        { label: 'Distance', value: '8.5 km' },
      ],
    },
    {
      day: 9,
      title:
        'Trek to Gorak Shep (5,164 m) & Hike to Everest Base Camp (5,364 m)',
      description:
        'The milestone day! Trek along the Khumbu Glacier moraine to Gorak Shep, drop main packs, and press onward to standing on Everest Base Camp under the Khumbu Icefall.',
      maxAltitude: 'Everest Base Camp (5,364 m)',
      accommodation: 'Overnight at Himalayan Lodge Gorak Shep',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '7 - 8 hours total' },
        { label: 'Distance', value: '13 km' },
      ],
    },
    {
      day: 10,
      title: 'Sunrise Summit of Kala Patthar (5,545 m) & Descend to Pheriche',
      description:
        'Pre-dawn ascent of Kala Patthar for the most magnificent sunrise view of Mt. Everest and surrounding giants. Descend to Pheriche for heated comfort.',
      maxAltitude: 'Kala Patthar Summit (5,545 m)',
      accommodation: 'Overnight at Edelweiss Lodge Pheriche',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [
        { label: 'Walking Time', value: '6 - 7 hours' },
        { label: 'Summit View', value: 'Everest 8,848m, Lhotse, Nuptse' },
      ],
    },
    {
      day: 11,
      title: 'Descend through Rhododendron Forests to Namche Bazaar',
      description:
        'Trek downhill past Tengboche with higher oxygen levels and warm hospitality awaiting in Namche Bazaar.',
      maxAltitude: 'Namche Bazaar (3,440 m)',
      accommodation: 'Overnight at Namche Boutique Hotel',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [{ label: 'Walking Time', value: '6 hours' }],
    },
    {
      day: 12,
      title: 'Trek Back to Lukla & Celebration with Sherpa Crew',
      description:
        'Final day on trail descending to Lukla. Evening celebration dinner and tipping ceremony with our incredible Sherpa climbing guides and porters.',
      maxAltitude: 'Lukla (2,860 m)',
      accommodation: 'Overnight at Lukla Mountain Lodge',
      meals: 'Breakfast, Lunch & Dinner Included',
      details: [{ label: 'Walking Time', value: '6 - 7 hours' }],
    },
    {
      day: 13,
      title: 'Morning Flight to Kathmandu & Leisure Afternoon',
      description:
        'Early morning flight back to Kathmandu. Private transfer to your luxury hotel for relaxing spa treatments, shopping, or city dining.',
      maxAltitude: 'Kathmandu (1,400 m)',
      accommodation: 'Overnight at 5-Star Hotel Kathmandu',
      meals: 'Breakfast & Farewell Dinner Included',
      details: [{ label: 'Flight Time', value: '35 minutes' }],
    },
    {
      day: 14,
      title: 'Final Departure & VIP Airport Drop-off',
      description:
        'Enjoy breakfast at hotel before our private chauffeur transfers you to Tribhuvan International Airport for your flight back home.',
      maxAltitude: 'Kathmandu (1,400 m)',
      accommodation: 'Departure Day',
      meals: 'Breakfast Included',
      details: [{ label: 'Airport Transfer', value: '3 hours before flight' }],
    },
  ];

  const treksData = [
    {
      title: 'Everest Base Camp & Gokyo Lakes Luxury Trek',
      slug: 'everest-base-camp-gokyo',
      region: 'Everest',
      durationDays: 16,
      maxAltitudeMeters: 5545,
      difficulty: TripDifficulty.CHALLENGING,
      priceUSD: 3200,
      status: TrekStatus.FEATURED,
      totalBookings: 142,
      rating: 4.95,
      reviewsCount: 48,
      coverMediaId: getMediaId('ebc-gokyo-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'everest-base-camp-gokyo-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Everest Base Camp Route & Gear Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Experience the ultimate trek to the base of Mt. Everest, staying in handpicked premium luxury lodges with Sherpa legends.',
      bestSeason: 'March - May & September - November',
      itinerary: sampleEverestItinerary,
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
    {
      title: 'Everest Base Camp Luxury Lodge Trek',
      slug: 'everest-base-camp-luxury-lodge',
      region: 'Everest',
      durationDays: 14,
      maxAltitudeMeters: 5545,
      difficulty: TripDifficulty.CHALLENGING,
      priceUSD: 2450,
      status: TrekStatus.FEATURED,
      totalBookings: 98,
      rating: 4.9,
      reviewsCount: 48,
      coverMediaId: getMediaId('ebc-luxury-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'everest-base-camp-luxury-lodge-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Everest Luxury Lodge Route Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        "Experience the ultimate trek to the base of the world's highest peak, staying in handpicked premium luxury lodges with Sherpa legends.",
      bestSeason: 'March - May & September - November',
      itinerary: sampleEverestItinerary,
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
    {
      title: 'Annapurna Circuit & Tilicho Lake High Pass',
      slug: 'annapurna-circuit-tilicho',
      region: 'Annapurna',
      durationDays: 15,
      maxAltitudeMeters: 5416,
      difficulty: TripDifficulty.CHALLENGING,
      priceUSD: 1650,
      status: TrekStatus.ACTIVE,
      totalBookings: 215,
      rating: 4.88,
      reviewsCount: 35,
      coverMediaId: getMediaId('annapurna-circuit-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'annapurna-circuit-tilicho-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Annapurna Circuit Route Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Witness the complete diversity of the Himalayas, from lush tropical valleys and pine-covered ridges to Thorong La pass.',
      bestSeason: 'March - May & September - November',
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
    {
      title: 'Annapurna Panoramic Luxury Circuit',
      slug: 'annapurna-panoramic-luxury-circuit',
      region: 'Annapurna',
      durationDays: 10,
      maxAltitudeMeters: 3800,
      difficulty: TripDifficulty.MODERATE,
      priceUSD: 1850,
      status: TrekStatus.ACTIVE,
      totalBookings: 112,
      rating: 4.85,
      reviewsCount: 31,
      coverMediaId: getMediaId('annapurna-panoramic-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'annapurna-panoramic-luxury-circuit-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Annapurna Panoramic Route Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Immerse in breathtaking panoramic views of the Annapurna Massif with private lodge accommodation, gourmet dining, and helicopter return.',
      bestSeason: 'September - May',
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
    {
      title: 'Manaslu Circuit Wilderness Expedition',
      slug: 'manaslu-circuit-wilderness',
      region: 'Manaslu',
      durationDays: 14,
      maxAltitudeMeters: 5106,
      difficulty: TripDifficulty.CHALLENGING,
      priceUSD: 2100,
      status: TrekStatus.ACTIVE,
      totalBookings: 78,
      rating: 4.92,
      reviewsCount: 24,
      coverMediaId: getMediaId('manaslu-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'manaslu-circuit-wilderness-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Manaslu Circuit Route Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Circle the world’s eighth-highest peak through untouched Tibetan-influenced villages and Larkya La pass.',
      bestSeason: 'March - May & September - November',
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
    {
      title: 'Langtang Valley & Gosaikunda Sacred Lakes Trek',
      slug: 'langtang-gosaikunda-lakes',
      region: 'Langtang',
      durationDays: 12,
      maxAltitudeMeters: 4610,
      difficulty: TripDifficulty.MODERATE,
      priceUSD: 1450,
      status: TrekStatus.ACTIVE,
      totalBookings: 67,
      rating: 4.9,
      reviewsCount: 29,
      coverMediaId: getMediaId('langtang-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'langtang-gosaikunda-lakes-file-1',
          mediaId: getMediaId('expedition-dossier-pdf'),
          title: 'Langtang Valley Route Dossier',
          fileUrl: getMediaUrl('expedition-dossier-pdf'),
          fileName: 'expedition-dossier.pdf',
          fileSize: '1.5 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Trek through pristine rhododendron forests, Tamang mountain villages, and glacier-fed alpine lakes near Kathmandu.',
      bestSeason: 'March - May & September - December',
      faqs: defaultTrekFaqs,
      reviews: defaultTrekReviews,
    },
  ];

  const allDbCats = await categoryRepo.find();
  const allValidCatIds = new Set(allDbCats.map((c) => c.id));
  const catSlugMap = new Map<string, string>();
  allDbCats.forEach((c) => {
    catSlugMap.set(c.slug, c.id);
    catSlugMap.set(c.name.toLowerCase(), c.id);
  });

  const getTrekCategoryId = (region: string, title: string = '') => {
    const r = (region + ' ' + title).toLowerCase();
    if (r.includes('everest') || r.includes('khumbu')) return catSlugMap.get('everest-khumbu-region');
    if (r.includes('annapurna')) return catSlugMap.get('annapurna-sanctuary-circuit');
    if (r.includes('langtang')) return catSlugMap.get('langtang-sacred-lakes');
    if (r.includes('manaslu')) return catSlugMap.get('manaslu-restricted-circuit');
    return allDbCats.find((c) => c.type === CategoryType.TREKKING)?.id;
  };

  const getTourCategoryId = () => {
    return catSlugMap.get('unesco-heritage-resorts') || allDbCats.find((c) => c.type === CategoryType.TOURS)?.id;
  };

  const getExpeditionCategoryId = () => {
    return catSlugMap.get('8000m-technical-expeditions') || allDbCats.find((c) => c.type === CategoryType.EXPEDITIONS)?.id;
  };

  for (const t of treksData) {
    const catId = getTrekCategoryId(t.region, t.title);
    const exists = await trekRepo.findOne({
      where: { slug: t.slug },
      withDeleted: true,
    });
    if (!exists) {
      await trekRepo.save(trekRepo.create({ ...t, categoryId: catId }));
    } else {
      let updated = false;
      if (catId && (!exists.categoryId || !allValidCatIds.has(exists.categoryId))) {
        exists.categoryId = catId;
        updated = true;
      }
      if (!exists.coverMediaId && t.coverMediaId) {
        exists.coverMediaId = t.coverMediaId;
        updated = true;
      }
      if (!exists.mapMediaId && t.mapMediaId) {
        exists.mapMediaId = t.mapMediaId;
        updated = true;
      }
      if ((!exists.galleryMediaIds || exists.galleryMediaIds.length === 0) && t.galleryMediaIds) {
        exists.galleryMediaIds = t.galleryMediaIds;
        updated = true;
      }
      if ((!exists.faqs || exists.faqs.length === 0) && t.faqs) {
        exists.faqs = t.faqs;
        updated = true;
      }
      if ((!exists.reviews || exists.reviews.length === 0) && t.reviews) {
        exists.reviews = t.reviews;
        updated = true;
      }
      if ((!exists.packageFiles || exists.packageFiles.length === 0) && t.packageFiles) {
        exists.packageFiles = t.packageFiles;
        updated = true;
      }
      if (t.itinerary && (!exists.itinerary || exists.itinerary.length === 0)) {
        exists.itinerary = t.itinerary;
        updated = true;
      }
      if (updated) {
        await trekRepo.save(exists);
      }
    }
  }

  // Repair existing DB treks missing or invalid categoryId
  const existingDbTreks = await trekRepo.find();
  for (const trek of existingDbTreks) {
    if (!trek.categoryId || !allValidCatIds.has(trek.categoryId)) {
      const catId = getTrekCategoryId(trek.region, trek.title);
      if (catId) {
        trek.categoryId = catId;
        await trekRepo.save(trek);
      }
    }
  }
  console.log('Seeded and linked treks');

  // 4. Seed Tours
  const tourRepo = AppDataSource.getRepository(Tour);
  const defaultTourFaqs = [
    {
      question:
        'What level of physical fitness is needed for cultural & wildlife tours?',
      answer:
        'Our tours are designed for all ages and require gentle walking along heritage sites, gardens, and safari jeep tracks. Private air-conditioned luxury transport is provided throughout.',
    },
    {
      question: 'Are heritage monument entry tickets and permits included?',
      answer:
        'Yes, all monument passes, museum fees, national park entries, and government taxes are 100% included in the tour package.',
    },
    {
      question:
        'Can dietary preferences be accommodated in hotels and restaurants?',
      answer:
        'Absolutely. Our team coordinates with boutique luxury hotels and fine dining partners to cater to vegetarian, vegan, gluten-free, and kosher requirements.',
    },
  ];

  const defaultTourReviews = [
    {
      author: 'David & Sarah Miller',
      country: 'United Kingdom',
      date: 'April 2026',
      rating: 5,
      avatar: getMediaUrl('guide-mingma-avatar'),
      content:
        'Our private historian in Kathmandu and the sunrise boat cruise in Pokhara were breathtaking. Impeccable luxury hospitality throughout.',
    },
    {
      author: 'Aiko Tanaka',
      country: 'Japan',
      date: 'March 2026',
      rating: 5,
      avatar: getMediaUrl('guide-lakpa-avatar'),
      content:
        'Seeing rhinos and royal Bengal tigers up close in Chitwan while staying in a five-star jungle lodge was the trip of a lifetime.',
    },
  ];

  const toursData = [
    {
      title: 'Kathmandu Valley Royal Heritage & Durbar Squares Tour',
      slug: 'kathmandu-valley-royal-heritage',
      tourType: TourType.CULTURAL_HERITAGE,
      transportation: 'Private Luxury AC Vehicle',
      region: 'Kathmandu & Pokhara',
      durationDays: 5,
      maxAltitudeMeters: 1400,
      difficulty: TripDifficulty.EASY,
      priceUSD: 1650,
      status: TourStatus.FEATURED,
      totalBookings: 41,
      rating: 4.9,
      reviewsCount: 41,
      coverMediaId: getMediaId('kathmandu-heritage-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'kathmandu-valley-royal-heritage-file-1',
          mediaId: getMediaId('tour-itinerary-pdf'),
          title: 'Kathmandu Heritage Tour Overview',
          fileUrl: getMediaUrl('tour-itinerary-pdf'),
          fileName: 'tour-itinerary.pdf',
          fileSize: '1.2 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Explore medieval durbar squares, ancient pagoda palaces, and sacred stupas with private historians.',
      bestSeason: 'Year-round, best October - April',
      faqs: defaultTourFaqs,
      reviews: defaultTourReviews,
    },
    {
      title: 'Pokhara Lakeside Wellness & Serenity Retreat',
      slug: 'pokhara-lakeside-wellness-retreat',
      tourType: TourType.LUXURY_WELLNESS,
      transportation: 'Private AC Van & Boat',
      region: 'Kathmandu & Pokhara',
      durationDays: 4,
      maxAltitudeMeters: 1400,
      difficulty: TripDifficulty.EASY,
      priceUSD: 1280,
      status: TourStatus.ACTIVE,
      totalBookings: 33,
      rating: 4.8,
      reviewsCount: 33,
      coverMediaId: getMediaId('pokhara-lakeside-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'pokhara-lakeside-wellness-retreat-file-1',
          mediaId: getMediaId('tour-itinerary-pdf'),
          title: 'Pokhara Wellness Retreat Overview',
          fileUrl: getMediaUrl('tour-itinerary-pdf'),
          fileName: 'tour-itinerary.pdf',
          fileSize: '1.2 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Unwind beside Phewa Lake with private sunrise cruises, mountain-view yoga sessions, and full spa treatments framed by the Annapurna range.',
      bestSeason: 'September - May',
      faqs: defaultTourFaqs,
      reviews: defaultTourReviews,
    },
    {
      title: 'Chitwan Luxury Wildlife Safari',
      slug: 'chitwan-luxury-wildlife-safari',
      tourType: TourType.WILDLIFE_SAFARI,
      transportation: '4x4 Open Safari Jeep',
      region: 'Kathmandu & Pokhara',
      durationDays: 3,
      maxAltitudeMeters: 410,
      difficulty: TripDifficulty.EASY,
      priceUSD: 1450,
      status: TourStatus.ACTIVE,
      totalBookings: 27,
      rating: 4.9,
      reviewsCount: 27,
      coverMediaId: getMediaId('chitwan-safari-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'chitwan-luxury-wildlife-safari-file-1',
          mediaId: getMediaId('tour-itinerary-pdf'),
          title: 'Chitwan Safari Tour Overview',
          fileUrl: getMediaUrl('tour-itinerary-pdf'),
          fileName: 'tour-itinerary.pdf',
          fileSize: '1.2 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Track one-horned rhinos and Bengal tigers across Chitwan National Park, staying in luxury jungle resort.',
      bestSeason: 'October - March',
      faqs: defaultTourFaqs,
      reviews: defaultTourReviews,
    },
    {
      title: 'Everest Scenic Mountain Flight & Sherpa Village Day Tour',
      slug: 'everest-scenic-flight-sherpa-village',
      tourType: TourType.HELICOPTER_TOUR,
      transportation: 'Airbus H125 Helicopter',
      region: 'Everest',
      durationDays: 1,
      maxAltitudeMeters: 2800,
      difficulty: TripDifficulty.EASY,
      priceUSD: 650,
      status: TourStatus.FEATURED,
      totalBookings: 19,
      rating: 5.0,
      reviewsCount: 19,
      coverMediaId: getMediaId('everest-scenic-flight-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'everest-scenic-flight-sherpa-village-file-1',
          mediaId: getMediaId('tour-itinerary-pdf'),
          title: 'Everest Scenic Flight Overview',
          fileUrl: getMediaUrl('tour-itinerary-pdf'),
          fileName: 'tour-itinerary.pdf',
          fileSize: '1.2 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        "Fly within view of Mt. Everest's summit at dawn, then land in the Khumbu foothills for a guided day in a traditional Sherpa village.",
      bestSeason: 'March - May & September - November',
      faqs: defaultTourFaqs,
      reviews: defaultTourReviews,
    },
  ];

  for (const tr of toursData) {
    const catId = getTourCategoryId();
    const exists = await tourRepo.findOne({
      where: { slug: tr.slug },
      withDeleted: true,
    });
    if (!exists) {
      await tourRepo.save(tourRepo.create({ ...tr, categoryId: catId }));
    } else {
      let updated = false;
      if (catId && (!exists.categoryId || !allValidCatIds.has(exists.categoryId))) {
        exists.categoryId = catId;
        updated = true;
      }
      if (!exists.coverMediaId && tr.coverMediaId) {
        exists.coverMediaId = tr.coverMediaId;
        updated = true;
      }
      if (!exists.mapMediaId && tr.mapMediaId) {
        exists.mapMediaId = tr.mapMediaId;
        updated = true;
      }
      if ((!exists.galleryMediaIds || exists.galleryMediaIds.length === 0) && tr.galleryMediaIds) {
        exists.galleryMediaIds = tr.galleryMediaIds;
        updated = true;
      }
      if ((!exists.faqs || exists.faqs.length === 0) && tr.faqs) {
        exists.faqs = tr.faqs;
        updated = true;
      }
      if ((!exists.reviews || exists.reviews.length === 0) && tr.reviews) {
        exists.reviews = tr.reviews;
        updated = true;
      }
      if ((!exists.packageFiles || exists.packageFiles.length === 0) && tr.packageFiles) {
        exists.packageFiles = tr.packageFiles;
        updated = true;
      }
      if (updated) {
        await tourRepo.save(exists);
      }
    }
  }

  // Repair existing DB tours missing or invalid categoryId
  const existingDbTours = await tourRepo.find();
  for (const tour of existingDbTours) {
    if (!tour.categoryId || !allValidCatIds.has(tour.categoryId)) {
      const catId = getTourCategoryId();
      if (catId) {
        tour.categoryId = catId;
        await tourRepo.save(tour);
      }
    }
  }
  console.log('Seeded and linked tours');

  // 5. Seed Expeditions
  const expeditionRepo = AppDataSource.getRepository(Expedition);
  const defaultExpeditionFaqs = [
    {
      question: 'What previous mountaineering experience is required?',
      answer:
        'For 6,000m peaks (Island Peak, Mera Peak), basic crampon and ice axe familiarity or completing our pre-summit clinic is sufficient. For Ama Dablam and Everest, prior high-altitude ascents (6,000m+) and fixed-rope technical proficiency are mandatory.',
    },
    {
      question: 'What is the guide ratio during the summit push?',
      answer:
        'We provide a strict 1:1 ratio with multi-summit certified IFMGA Sherpa leaders. Your dedicated Sherpa carries backup supplemental oxygen and manages rope fixing.',
    },
    {
      question: 'What medical oxygen systems are provided?',
      answer:
        'We utilize TopOut / Summit Oxygen mask systems with Russian Poisk cylinders, tested pulse oximeters, and high-altitude hyperbaric Gamow bags at basecamp.',
    },
  ];

  const defaultExpeditionReviews = [
    {
      author: 'Marcus Lindqvist',
      country: 'Sweden',
      date: 'May 2026',
      rating: 5,
      avatar: getMediaUrl('guide-pemba-avatar'),
      content:
        'Summited Ama Dablam with Mingma Sherpa. Flawless rope work, heated basecamp dome tents, and gourmet chef nutrition made the hardest climb of my life safe and successful.',
    },
    {
      author: 'Sophia Zhang',
      country: 'Singapore',
      date: 'April 2026',
      rating: 5,
      avatar: getMediaUrl('guide-lakpa-avatar'),
      content:
        'The Island Peak ascent was breathtaking. The 1:1 Sherpa support gave me total confidence on the headwall and summit ridge.',
    },
  ];

  const expeditionsData = [
    {
      title: 'Ama Dablam Technical Expedition (6,812m)',
      slug: 'ama-dablam-expedition',
      region: 'Everest',
      durationDays: 28,
      peakHeightM: 6812,
      maxAltitudeMeters: 6812,
      climbingGrade: ClimbingGrade.EXTREME_TECHNICAL_GRADE,
      difficulty: TripDifficulty.EXTREME,
      sherpaGuideRatio: '1:1 IFMGA Sherpa Ratio',
      oxygenRequired: true,
      priceUSD: 9800,
      status: ExpeditionStatus.ACTIVE,
      totalBookings: 38,
      rating: 5.0,
      reviewsCount: 22,
      coverMediaId: getMediaId('ama-dablam-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'ama-dablam-expedition-file-1',
          mediaId: getMediaId('climbing-guide-pdf'),
          title: 'Ama Dablam Expedition Manual & Permits',
          fileUrl: getMediaUrl('climbing-guide-pdf'),
          fileName: 'climbing-guide.pdf',
          fileSize: '2.1 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'Climb the Matterhorn of the Himalayas with 1:1 IFMGA Sherpa summit leaders and high-altitude luxury basecamp support.',
      bestSeason: 'March - May & September - November',
      faqs: defaultExpeditionFaqs,
      reviews: defaultExpeditionReviews,
    },
    {
      title: 'Island Peak (Imja Tse) Climbing Expedition',
      slug: 'island-peak-imja-tse-expedition',
      region: 'Everest',
      durationDays: 18,
      peakHeightM: 6189,
      maxAltitudeMeters: 6189,
      climbingGrade: ClimbingGrade.NON_TECHNICAL_TREKKING_PEAK,
      difficulty: TripDifficulty.CHALLENGING,
      sherpaGuideRatio: '1:2 Sherpa Ratio',
      oxygenRequired: false,
      priceUSD: 3450,
      status: ExpeditionStatus.FEATURED,
      totalBookings: 37,
      rating: 4.8,
      reviewsCount: 37,
      coverMediaId: getMediaId('island-peak-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'island-peak-imja-tse-expedition-file-1',
          mediaId: getMediaId('climbing-guide-pdf'),
          title: 'Island Peak Expedition Manual & Permits',
          fileUrl: getMediaUrl('climbing-guide-pdf'),
          fileName: 'climbing-guide.pdf',
          fileSize: '2.1 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'An ideal introductory Himalayan summit, combining the classic Everest Base Camp approach with a guided technical ascent of Island Peak.',
      bestSeason: 'March - May & September - November',
      faqs: defaultExpeditionFaqs,
      reviews: defaultExpeditionReviews,
    },
    {
      title: 'Mount Everest Summit Expedition (8,849m)',
      slug: 'everest-summit-expedition',
      region: 'Everest',
      durationDays: 63,
      peakHeightM: 8849,
      maxAltitudeMeters: 8849,
      climbingGrade: ClimbingGrade.EXTREME_TECHNICAL_GRADE,
      difficulty: TripDifficulty.EXTREME,
      sherpaGuideRatio: '1:1 Elite Summit Sherpa',
      oxygenRequired: true,
      priceUSD: 48500,
      status: ExpeditionStatus.FEATURED,
      totalBookings: 11,
      rating: 5.0,
      reviewsCount: 11,
      coverMediaId: getMediaId('everest-summit-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'everest-summit-expedition-file-1',
          mediaId: getMediaId('climbing-guide-pdf'),
          title: 'Everest Summit Expedition Manual & Permits',
          fileUrl: getMediaUrl('climbing-guide-pdf'),
          fileName: 'climbing-guide.pdf',
          fileSize: '2.1 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        'The ultimate mountaineering achievement. A full South Col expedition with 1:1 Sherpa support and bottled oxygen.',
      bestSeason: 'April - May',
      faqs: defaultExpeditionFaqs,
      reviews: defaultExpeditionReviews,
    },
    {
      title: 'Mera Peak Climbing (6,476m)',
      slug: 'mera-peak-climbing',
      region: 'Everest',
      durationDays: 19,
      peakHeightM: 6476,
      maxAltitudeMeters: 6476,
      climbingGrade: ClimbingGrade.EXTREME_TECHNICAL_GRADE,
      difficulty: TripDifficulty.EXTREME,
      sherpaGuideRatio: '1:2 Sherpa Ratio',
      oxygenRequired: false,
      priceUSD: 3600,
      status: ExpeditionStatus.ACTIVE,
      totalBookings: 29,
      rating: 4.85,
      reviewsCount: 29,
      coverMediaId: getMediaId('mera-peak-cover'),
      mapMediaId: getMediaId('himalayan-route-map'),
      galleryMediaIds: [getMediaId('himalayan-gallery-1'), getMediaId('himalayan-gallery-2')],
      packageFiles: [
        {
          id: 'mera-peak-climbing-file-1',
          mediaId: getMediaId('climbing-guide-pdf'),
          title: 'Mera Peak Expedition Manual & Permits',
          fileUrl: getMediaUrl('climbing-guide-pdf'),
          fileName: 'climbing-guide.pdf',
          fileSize: '2.1 MB',
          fileType: 'pdf',
          uploadedAt: '2026-08-01',
        },
      ],
      shortDesc:
        "Trek through remote Hinku valley and climb Nepal's highest trekking peak for panoramic views of five 8,000m summits.",
      bestSeason: 'March - May & September - November',
      faqs: defaultExpeditionFaqs,
      reviews: defaultExpeditionReviews,
    },
  ];

  for (const exp of expeditionsData) {
    const catId = getExpeditionCategoryId();
    const exists = await expeditionRepo.findOne({
      where: { slug: exp.slug },
      withDeleted: true,
    });
    if (!exists) {
      await expeditionRepo.save(expeditionRepo.create({ ...exp, categoryId: catId }));
    } else {
      let updated = false;
      if (catId && (!exists.categoryId || !allValidCatIds.has(exists.categoryId))) {
        exists.categoryId = catId;
        updated = true;
      }
      if (!exists.coverMediaId && exp.coverMediaId) {
        exists.coverMediaId = exp.coverMediaId;
        updated = true;
      }
      if (!exists.mapMediaId && exp.mapMediaId) {
        exists.mapMediaId = exp.mapMediaId;
        updated = true;
      }
      if ((!exists.galleryMediaIds || exists.galleryMediaIds.length === 0) && exp.galleryMediaIds) {
        exists.galleryMediaIds = exp.galleryMediaIds;
        updated = true;
      }
      if ((!exists.faqs || exists.faqs.length === 0) && exp.faqs) {
        exists.faqs = exp.faqs;
        updated = true;
      }
      if ((!exists.reviews || exists.reviews.length === 0) && exp.reviews) {
        exists.reviews = exp.reviews;
        updated = true;
      }
      if ((!exists.packageFiles || exists.packageFiles.length === 0) && exp.packageFiles) {
        exists.packageFiles = exp.packageFiles;
        updated = true;
      }
      if (updated) {
        await expeditionRepo.save(exists);
      }
    }
  }

  // Repair existing DB expeditions missing or invalid categoryId
  const existingDbExpeditions = await expeditionRepo.find();
  for (const exp of existingDbExpeditions) {
    if (!exp.categoryId || !allValidCatIds.has(exp.categoryId)) {
      const catId = getExpeditionCategoryId();
      if (catId) {
        exp.categoryId = catId;
        await expeditionRepo.save(exp);
      }
    }
  }
  console.log('Seeded and linked expeditions');

  // 6. Seed Guides
  const guideRepo = AppDataSource.getRepository(Guide);
  const guidesData = [
    {
      name: 'Lakpa Tenzing Sherpa',
      role: GuideRole.LEAD_EXPEDITION_LEADER,
      summitStats: '12x Everest, 4x K2, 6x Lhotse',
      certifications: [
        'IFMGA Mountain Guide',
        'NMA Master Instructor',
        'Wilderness First Responder',
      ],
      status: GuideStatus.ON_MOUNTAIN,
      phone: '+977 9841-234567',
      email: 'lakpa.sherpa@alpineace.com',
      currentAssignment: 'Everest Base Camp Luxury Trek (ACE-2026-0891)',
      avatarUrl: getMediaUrl('guide-lakpa-avatar'),
    },
    {
      name: 'Mingma Norbu Sherpa',
      role: GuideRole.LEAD_EXPEDITION_LEADER,
      summitStats: '8x Everest, 9x Ama Dablam',
      certifications: ['IFMGA Mountain Guide', 'NMA Advanced Mountaineer'],
      status: GuideStatus.AVAILABLE,
      phone: '+977 9851-876543',
      email: 'mingma.norbu@alpineace.com',
      avatarUrl: getMediaUrl('guide-mingma-avatar'),
    },
    {
      name: 'Pemba Gelje Sherpa',
      role: GuideRole.SENIOR_TREKKING_GUIDE,
      summitStats: '3x Island Peak, 4x Mera Peak',
      certifications: [
        'NMA Certified Trekking Guide',
        'Emergency Alpine First Aid',
      ],
      status: GuideStatus.AVAILABLE,
      phone: '+977 9803-345678',
      email: 'pemba.g@alpineace.com',
      avatarUrl: getMediaUrl('guide-pemba-avatar'),
    },
    {
      name: 'Rohan Tamang',
      role: GuideRole.CULTURAL_TOUR_GUIDE,
      summitStats: 'Cultural Specialist (10+ Yrs)',
      certifications: ['Nepal Tourism Board License', 'Heritage Historian'],
      status: GuideStatus.ON_MOUNTAIN,
      phone: '+977 9818-567890',
      email: 'rohan.tamang@alpineace.com',
      currentAssignment: 'Kathmandu & Chitwan Safari (ACE-2026-0894)',
      avatarUrl: getMediaUrl('guide-rohan-avatar'),
    },
    {
      name: 'Pasang Dawa Sherpa',
      role: GuideRole.HIGH_ALTITUDE_SHERPA,
      summitStats: '5x Everest, 3x Cho Oyu',
      certifications: ['NMA Climbing Guide', 'Alpine Rescue'],
      status: GuideStatus.AVAILABLE,
      phone: '+977 9849-112233',
      email: 'pasang.dawa@alpineace.com',
      avatarUrl: getMediaUrl('guide-pasang-avatar'),
    },
  ];

  for (const g of guidesData) {
    const exists = await guideRepo.findOne({
      where: { email: g.email },
      withDeleted: true,
    });
    if (!exists) {
      await guideRepo.save(guideRepo.create(g));
    }
  }
  console.log('Seeded guides');

  // 7. Seed Bookings
  const bookingRepo = AppDataSource.getRepository(Booking);
  const bookingsData = [
    {
      reference: 'ACE-2026-0891',
      guestName: 'Marcus Vance',
      guestEmail: 'marcus.vance@example.com',
      guestPhone: '+1 (555) 234-5678',
      country: 'United States',
      packageName: 'Everest Base Camp Luxury Helicopter Trek',
      packageType: BookingPackageType.TREKKING,
      startDate: '2026-09-10',
      endDate: '2026-09-24',
      groupSize: 2,
      totalAmountUSD: 7600,
      paymentStatus: BookingPaymentStatus.DEPOSIT_PAID,
      bookingStatus: BookingStatus.CONFIRMED,
      assignedGuide: 'Lakpa Tenzing Sherpa',
      permitStatus: BookingPermitStatus.ISSUED,
      specialRequests:
        'Requires gluten-free meals & single room supplement in Namche.',
    },
    {
      reference: 'ACE-2026-0892',
      guestName: 'Elena Rostova',
      guestEmail: 'elena.r@example.de',
      guestPhone: '+49 170 8923145',
      country: 'Germany',
      packageName: 'Ama Dablam (6,812m) Autumn Expedition',
      packageType: BookingPackageType.EXPEDITION,
      startDate: '2026-10-01',
      endDate: '2026-10-28',
      groupSize: 1,
      totalAmountUSD: 9800,
      paymentStatus: BookingPaymentStatus.PAID,
      bookingStatus: BookingStatus.CONFIRMED,
      assignedGuide: 'Mingma Norbu Sherpa',
      permitStatus: BookingPermitStatus.ISSUED,
      specialRequests: 'Personal oxygen setup request verified.',
    },
    {
      reference: 'ACE-2026-0893',
      guestName: 'Jean-Pierre Dubois',
      guestEmail: 'jp.dubois@example.fr',
      guestPhone: '+33 6 12 34 56 78',
      country: 'France',
      packageName: 'Annapurna Circuit High Passes',
      packageType: BookingPackageType.TREKKING,
      startDate: '2026-09-18',
      endDate: '2026-10-04',
      groupSize: 4,
      totalAmountUSD: 6400,
      paymentStatus: BookingPaymentStatus.PENDING,
      bookingStatus: BookingStatus.IN_REVIEW,
      assignedGuide: 'Pemba Gelje Sherpa',
      permitStatus: BookingPermitStatus.PROCESSING,
    },
    {
      reference: 'ACE-2026-0894',
      guestName: 'Sarah Jenkins & Group',
      guestEmail: 'sarah.j@example.co.uk',
      guestPhone: '+44 7700 900077',
      country: 'United Kingdom',
      packageName: 'Kathmandu Valley & Chitwan Cultural Safari',
      packageType: BookingPackageType.TOUR,
      startDate: '2026-08-15',
      endDate: '2026-08-25',
      groupSize: 6,
      totalAmountUSD: 7200,
      paymentStatus: BookingPaymentStatus.PAID,
      bookingStatus: BookingStatus.ACTIVE_TREK,
      assignedGuide: 'Rohan Tamang',
      permitStatus: BookingPermitStatus.ISSUED,
    },
    {
      reference: 'ACE-2026-0895',
      guestName: 'Kenji Sato',
      guestEmail: 'kenji.sato@example.jp',
      guestPhone: '+81 90 1234 5678',
      country: 'Japan',
      packageName: 'Manaslu Circuit Wild Wilderness Trek',
      packageType: BookingPackageType.TREKKING,
      startDate: '2026-10-10',
      endDate: '2026-10-26',
      groupSize: 2,
      totalAmountUSD: 4200,
      paymentStatus: BookingPaymentStatus.DEPOSIT_PAID,
      bookingStatus: BookingStatus.CONFIRMED,
      assignedGuide: 'Pasang Dawa Sherpa',
      permitStatus: BookingPermitStatus.PROCESSING,
    },
    {
      reference: 'ACE-2026-0896',
      guestName: 'Carlos Mendez',
      guestEmail: 'carlos.m@example.es',
      guestPhone: '+34 600 123 456',
      country: 'Spain',
      packageName: 'Mera Peak Climbing (6,476m)',
      packageType: BookingPackageType.EXPEDITION,
      startDate: '2026-11-02',
      endDate: '2026-11-20',
      groupSize: 3,
      totalAmountUSD: 8500,
      paymentStatus: BookingPaymentStatus.PENDING,
      bookingStatus: BookingStatus.IN_REVIEW,
      permitStatus: BookingPermitStatus.PENDING_DOCUMENT,
    },
  ];

  for (const b of bookingsData) {
    const exists = await bookingRepo.findOne({
      where: { reference: b.reference },
      withDeleted: true,
    });
    if (!exists) {
      await bookingRepo.save(bookingRepo.create(b));
    }
  }
  console.log('Seeded bookings');

  // 8. Seed Inquiries
  const inquiryRepo = AppDataSource.getRepository(Inquiry);
  const inquiriesData = [
    {
      guestName: 'Dr. Alexander Wright',
      email: 'a.wright@university.edu',
      phone: '+1 415 555 0192',
      country: 'USA',
      interestedTrip: 'Custom Private Ama Dablam Climb',
      travelDates: 'October 2026',
      groupSize: 3,
      message:
        'We are a group of 3 experienced climbers looking for a private Sherpa team for Ama Dablam. Looking for full logistics, basecamp luxury, and 1:1 Sherpa ratio.',
      status: InquiryStatus.QUOTE_SENT,
      notes: 'Sent $9,500/pp proposal with helicopter transfer add-on.',
    },
    {
      guestName: 'Camilla Lindqvist',
      email: 'camilla.l@design.se',
      phone: '+46 70 123 4567',
      country: 'Sweden',
      interestedTrip: 'Everest Base Camp & Gokyo Trek',
      travelDates: 'November 2026',
      groupSize: 2,
      message:
        'Hello! My partner and I want to combine Cho La Pass with Gokyo Lakes. Are oxygen bottles available at tea houses along the route?',
      status: InquiryStatus.NEW,
    },
    {
      guestName: "Liam O'Connor",
      email: 'liam.oc@dublin.ie',
      phone: '+353 87 123 4567',
      country: 'Ireland',
      interestedTrip: 'Manaslu Circuit Trek',
      travelDates: 'Spring 2027',
      groupSize: 5,
      message:
        'We have a group of 5 friends planning for Manaslu Circuit. Do we need 2 guides for 5 people or is 1 guide sufficient?',
      status: InquiryStatus.CONTACTED,
      notes:
        'Clarified restricted permit regulations (min 2 trekkers, licensed Sherpa guide required).',
    },
  ];

  for (const inq of inquiriesData) {
    const exists = await inquiryRepo.findOne({
      where: { email: inq.email, interestedTrip: inq.interestedTrip },
      withDeleted: true,
    });
    if (!exists) {
      await inquiryRepo.save(inquiryRepo.create(inq));
    }
  }
  console.log('Seeded inquiries');

  // 9. Seed Blog Articles
  const blogRepo = AppDataSource.getRepository(BlogArticle);
  const blogsData = [
    {
      title: 'How to Prepare for High-Altitude Trekking in Nepal',
      slug: 'high-altitude-trekking-preparation',
      category: 'Expedition Prep',
      readTime: '6 min read',
      status: BlogStatus.PUBLISHED,
      publishedDate: '2026-07-12',
      views: 1420,
      coverMediaId: getMediaId('blog-high-altitude-prep-cover'),
      excerpt:
        'Essential advice on cardiovascular training, altitude acclimatization schedules, and preventing AMS on the Everest trail.',
      content:
        'Preparing for a Himalayan trek is as much mental as it is physical. Over our years of leading premium itineraries, we have found that high altitude readiness depends heavily on gradual pacing and proper hydration. Build cardiovascular fitness for at least 8 weeks before departure, prioritize acclimatization days at 3,000m and 4,000m, and watch for early symptoms of acute mountain sickness such as headache, nausea, and disrupted sleep. Ascending no more than 300-500m in sleeping altitude per day above 3,000m is the single most effective way to prevent AMS.',
    },
    {
      title: 'Top 5 Essential Packing Items for Everest Base Camp',
      slug: 'packing-list-everest-base-camp',
      category: 'Gear & Equipment',
      readTime: '4 min read',
      status: BlogStatus.PUBLISHED,
      publishedDate: '2026-06-28',
      views: 980,
      coverMediaId: getMediaId('blog-packing-list-cover'),
      excerpt:
        "Don't leave Kathmandu without these critical gear items — from thermal layering to down sleeping bags and solar power packs.",
      content:
        "Don't leave Kathmandu without these critical gear items: a -20°C rated down sleeping bag, moisture-wicking thermal base layers, a reliable headlamp with spare batteries, a water filtration bottle to cut down on plastic waste, and a portable solar charging pack for keeping cameras and phones running above 4,000m where power is scarce. Quality trekking boots that are already broken in matter more than almost anything else on this list.",
    },
    {
      title: 'Understanding Sherpa Culture and Sacred Himalayan Peaks',
      slug: 'sherpa-culture-sacred-peaks',
      category: 'Sherpa Culture',
      readTime: '8 min read',
      status: BlogStatus.PUBLISHED,
      publishedDate: '2026-06-15',
      views: 2150,
      coverMediaId: getMediaId('blog-sherpa-culture-cover'),
      excerpt:
        'A deep dive into Tibetan Buddhism, Mani stones, prayer flags, and the spiritual respect guiding multi-summit Sherpas.',
      content:
        "Many of the Himalaya's highest peaks are considered sacred by the Sherpa people, and mountaineers are expected to observe local customs before any expedition. Prayer flags carry mantras on the wind, Mani stones inscribed with Buddhist scripture line the trails, and basecamp Puja ceremonies ask for safe passage before a climbing season begins. Understanding this cultural context transforms a trek from a physical challenge into a much deeper journey through one of the world's most spiritually significant landscapes.",
    },
    {
      title: 'Ama Dablam vs Island Peak: Choosing Your First Peak Climb',
      slug: 'ama-dablam-vs-island-peak',
      category: 'Expedition Prep',
      readTime: '5 min read',
      status: BlogStatus.PUBLISHED,
      publishedDate: '2026-07-25',
      views: 540,
      coverMediaId: getMediaId('blog-ama-vs-island-cover'),
      excerpt:
        'Comparing technical difficulty, training requirements, and climbing permits for Island Peak vs Ama Dablam.',
      content:
        'Island Peak (6,189m) is the ideal introductory 6,000m peak for strong trekkers, whereas Ama Dablam (6,812m) is a serious technical alpine climb requiring steep rock and ice proficiency. Choose Island Peak if you want to experience crampon work and fixed ropes for the first time, and advance to Ama Dablam after completing at least two 6,000m summits.',
    },
  ];

  for (const b of blogsData) {
    const exists = await blogRepo.findOne({
      where: { slug: b.slug },
      withDeleted: true,
    });
    if (!exists) {
      await blogRepo.save(blogRepo.create(b));
    } else if (!exists.coverMediaId && b.coverMediaId) {
      exists.coverMediaId = b.coverMediaId;
      await blogRepo.save(exists);
    }
  }
  console.log('Seeded blog articles');

  // 10. Seed Settings
  const settingRepo = AppDataSource.getRepository(Setting);
  const homeStats = [
    {
      number: '14+',
      label: 'Years of Adventure',
      desc: 'Crafting premium mountain experiences',
    },
    {
      number: '4,800+',
      label: 'Happy Travelers',
      desc: 'Savoring pristine local hospitality',
    },
    {
      number: '99.4%',
      label: 'Success Rate',
      desc: 'On high-altitude peak expeditions',
    },
    {
      number: '30+',
      label: 'Bespoke Destinations',
      desc: 'Exploring remote wilderness valleys',
    },
  ];

  const companyFaqs = [
    {
      id: 'faq-1',
      question: 'How do you ensure high-altitude medical safety on treks?',
      answer:
        'Every trek is led by certified IFMGA Sherpa leaders equipped with pulse oximeters, specialized high-altitude medical kits, satellite communications, and 24/7 standby emergency helicopter evacuation coverage.',
    },
    {
      id: 'faq-2',
      question:
        'What is the difference between standard tea houses and your luxury lodges?',
      answer:
        'We replace cold, drafty tea houses with premium boutique luxury lodges (such as Yeti Mountain Home and Ker & Downey) featuring attached heated bathrooms, electric mattress warmers, and organic fine dining.',
    },
    {
      id: 'faq-3',
      question: 'Can I customize a private itinerary for my family or group?',
      answer:
        'Yes! Our adventure directors design bespoke day-by-day itineraries tailored to your timeframe, physical fitness, dietary requirements, and private helicopter transfer preferences.',
    },
    {
      id: 'faq-4',
      question:
        'What permits are required for trekking in restricted regions like Manaslu?',
      answer:
        'Restricted regions require Special Area Permits issued by the Nepal Department of Immigration, along with TIMS and Conservation Area Permits. Our team handles 100% of government paperwork prior to your arrival.',
    },
  ];

  const testimonials = [
    {
      id: 'test-1',
      author: 'Jonathan Vance',
      role: 'Expedition Member',
      country: 'United States',
      tripName: 'Ama Dablam Expedition',
      content:
        'The 1:1 Sherpa guide ratio and basecamp luxury made our summit push unforgettable. AlpineAce sets the gold standard in high-altitude mountaineering.',
      avatarMediaId: getMediaId('guide-mingma-avatar'),
      avatar: getMediaUrl('guide-mingma-avatar'),
      rating: 5,
    },
    {
      id: 'test-2',
      author: 'Elena Rostova',
      role: 'Luxury Trekker',
      country: 'Germany',
      tripName: 'Everest Luxury Lodge Trek',
      content:
        'Heated mattresses and organic fine dining at 4,000 meters! The Sherpa team looked after our safety with pulse oximeters every evening.',
      avatarMediaId: getMediaId('guide-lakpa-avatar'),
      avatar: getMediaUrl('guide-lakpa-avatar'),
      rating: 5,
    },
    {
      id: 'test-3',
      author: 'Jean-Pierre Dubois',
      role: 'Private Traveler',
      country: 'France',
      tripName: 'Annapurna Circuit & Heli Tour',
      content:
        'Bespoke planning from start to finish. Our private helicopter transfer from Manang back to Kathmandu was seamless and breathtaking.',
      avatarMediaId: getMediaId('guide-pemba-avatar'),
      avatar: getMediaUrl('guide-pemba-avatar'),
      rating: 5,
    },
  ];

  const defaultSettings = [
    { key: 'siteName', value: 'AlpineAce' },
    { key: 'tagline', value: 'Venture Beyond the Ordinary' },
    {
      key: 'siteTitle',
      value: 'AlpineAce | Nepal Trekking, Historical Tours & Peak Expeditions',
    },
    { key: 'contactEmail', value: 'info@alpineace.com' },
    { key: 'contactPhone', value: '+977 1 4700543' },
    { key: 'emergencyPhone', value: '+977 9851000000' },
    { key: 'whatsappNumber', value: '9779851000000' },
    {
      key: 'companyAddress',
      value: 'Thamel Marg, Ward 26, Kathmandu, Nepal 44600',
    },
    {
      key: 'googleMapsUrl',
      value: 'https://maps.google.com/?q=Thamel+Kathmandu+Nepal',
    },
    {
      key: 'officeHours',
      value: 'Sun - Fri: 09:00 AM - 06:00 PM (NPT)',
    },
    {
      key: 'metaTitle',
      value: 'AlpineAce | Nepal Trekking, Historical Tours & Peak Expeditions',
    },
    {
      key: 'metaDescription',
      value:
        "Experience Nepal's spectacular trekking routes, historical tours, and elite peak expeditions under the safe guidance of multi-summit Sherpas.",
    },
    {
      key: 'metaKeywords',
      value:
        'Nepal trekking, Everest Base Camp, Annapurna Circuit, peak climbing, Sherpa guides, luxury mountain lodges',
    },
    { key: 'canonicalUrl', value: 'https://alpineacetreks.com' },
    { key: 'facebookUrl', value: 'https://facebook.com/alpineacenepal' },
    { key: 'instagramUrl', value: 'https://instagram.com/alpineacenepal' },
    { key: 'youtubeUrl', value: 'https://youtube.com/@alpineacenepal' },
    { key: 'tripadvisorUrl', value: 'https://tripadvisor.com' },
    {
      key: 'linkedinUrl',
      value: 'https://linkedin.com/company/alpine-ace-expeditions',
    },
    { key: 'homeStats', value: JSON.stringify(homeStats) },
    { key: 'companyFaqs', value: JSON.stringify(companyFaqs) },
    { key: 'testimonials', value: JSON.stringify(testimonials) },
  ];

  for (const s of defaultSettings) {
    const exists = await settingRepo.findOne({
      where: { key: s.key },
      withDeleted: true,
    });
    if (!exists) {
      await settingRepo.save(settingRepo.create(s));
    }
  }
  console.log('Seeded site settings');

  // 11. Seed Initial Standalone Media
  const defaultMedia = [
    {
      name: 'everest-basecamp.jpg',
      title: 'Everest Basecamp Header',
      mimeType: 'image/jpeg',
      fileSize: '482100',
      mediaType: MediaType.BLOG_THUMBNAIL,
      path: '/uploads/everest-basecamp.jpg',
    },
    {
      name: 'annapurna-circuit.jpg',
      title: 'Annapurna Circuit Header',
      mimeType: 'image/jpeg',
      fileSize: '512000',
      mediaType: MediaType.BLOG_THUMBNAIL,
      path: '/uploads/annapurna-circuit.jpg',
    },
    {
      name: 'ama-dablam-summit.jpg',
      title: 'Ama Dablam Summit Header',
      mimeType: 'image/jpeg',
      fileSize: '620000',
      mediaType: MediaType.BLOG_THUMBNAIL,
      path: '/uploads/ama-dablam-summit.jpg',
    },
  ];
  for (const m of defaultMedia) {
    let media = await mediaRepo.findOne({ where: { path: m.path } });
    if (!media) {
      await mediaRepo.save(mediaRepo.create(m));
    }
  }
  console.log('Seeded initial media records');

  // 12. Seed Associates & Affiliations
  const associateRepo = AppDataSource.getRepository(Associate);
  const associateCount = await associateRepo.count();
  if (associateCount === 0) {
    const defaultAssociates = [
      {
        name: 'Trekking Agencies Association of Nepal (TAAN)',
        role: 'Accredited Member',
        company: 'TAAN Nepal',
        image: getMediaUrl('assoc-taan-logo'),
        websiteUrl: 'https://taan.org.np',
        description:
          'Apex body of trekking agencies in Nepal ensuring certified ethical operations.',
        category: 'Accreditation',
        status: AssociateStatus.ACTIVE,
        order: 1,
      },
      {
        name: 'Nepal Mountaineering Association (NMA)',
        role: 'Certified Expedition Partner',
        company: 'NMA',
        image: getMediaUrl('assoc-nma-logo'),
        websiteUrl: 'https://nepalmountaineering.org',
        description:
          'National governing body for peak climbing permits and Sherpa mountaineering training.',
        category: 'Mountaineering',
        status: AssociateStatus.ACTIVE,
        order: 2,
      },
      {
        name: 'Himalayan Rescue Association (HRA)',
        role: 'Medical Safety Partner',
        company: 'HRA Nepal',
        image: getMediaUrl('assoc-hra-logo'),
        websiteUrl: 'https://hra.org.np',
        description:
          'Volunteer medical stations in Pheriche and Manang dedicated to AMS prevention and high-altitude rescue.',
        category: 'Safety & Rescue',
        status: AssociateStatus.ACTIVE,
        order: 3,
      },
    ];
    for (const a of defaultAssociates) {
      await associateRepo.save(associateRepo.create(a));
    }
    console.log('Seeded initial associate records');
  }

  // 13. Seed Pre-Trip Consultation FAQs
  const faqRepo = AppDataSource.getRepository(Faq);
  const faqCount = await faqRepo.count();
  if (faqCount === 0) {
    const defaultFaqs = [
      {
        question: 'What physical fitness and prior experience is required?',
        answer:
          'For classic trekking routes (such as Everest Base Camp or Annapurna Circuit), strong cardiovascular endurance and regular aerobic training 6–8 weeks in advance is recommended. Prior trekking experience is beneficial but not mandatory. For 6,000m peak expeditions (Island Peak, Mera Peak, Lobuche), basic mountaineering skills with crampons and fixed ropes are taught on-site during basecamp training clinics by our certified master guides.',
        category: 'Preparation & Fitness',
        status: FaqStatus.ACTIVE,
        order: 1,
      },
      {
        question:
          'How does Alpine Ace manage altitude acclimatization and medical safety?',
        answer:
          'All our itineraries follow conservative ascent profiles with dedicated acclimatization days. Guide leaders conduct twice-daily pulse-oximeter biometric checks (SpO2 & heart rate). Every high-altitude group is equipped with supplemental medical oxygen, comprehensive first-aid kits, and 24/7 direct satellite emergency dispatch for immediate helicopter evacuation when warranted.',
        category: 'Safety & Altitude',
        status: FaqStatus.ACTIVE,
        order: 2,
      },
      {
        question: 'What travel permits and government paperwork are needed?',
        answer:
          'Alpine Ace handles 100% of required paperwork including National Park Entry permits (Sagarmatha, Annapurna, Langtang), TIMS cards, Restricted Area permits (Manaslu, Upper Mustang), and NMA peak climbing permits. You only need a passport with at least 6 months validity and valid travel insurance covering high-altitude trekking up to 6,000m.',
        category: 'Permits & Documents',
        status: FaqStatus.ACTIVE,
        order: 3,
      },
      {
        question:
          'When is the optimal season for trekking and peak climbing in Nepal?',
        answer:
          'The two primary seasons are Spring (March to May) and Autumn (September to November). Spring offers pleasant temperatures, blooming rhododendron forests, and active mountaineering summit pushes. Autumn provides the crispest blue skies, stable high-pressure windows, and extraordinary mountain panoramas.',
        category: 'Weather & Seasons',
        status: FaqStatus.ACTIVE,
        order: 4,
      },
      {
        question:
          'What are the accommodations and dietary arrangements on the trail?',
        answer:
          'We partner with the finest boutique lodges and luxury mountain retreats along the Khumbu and Annapurna trails, offering heated electric blankets, en-suite bathrooms, and hot showers. At wilderness basecamps, we provide four-season private tents and a dedicated expedition cook team serving freshly prepared, hygienic, nutrient-dense organic meals.',
        category: 'Lodges & Dining',
        status: FaqStatus.ACTIVE,
        order: 5,
      },
      {
        question: 'What is your booking deposit and rescheduling policy?',
        answer:
          'A 20% advance deposit secures your guide crew, lodge bookings, and government permits. The remaining balance can be settled upon arrival in Kathmandu via bank transfer, credit card, or cash. We offer complimentary trip date transfers up to 30 days prior to departure in the event of unexpected travel changes.',
        category: 'Bookings & Payments',
        status: FaqStatus.ACTIVE,
        order: 6,
      },
    ];
    for (const f of defaultFaqs) {
      await faqRepo.save(faqRepo.create(f));
    }
    console.log('Seeded initial FAQ records');
  }

  console.log('Database seeding finished successfully!');
};

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}
