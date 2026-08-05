import { AppDataSource } from '../config/database.config';
import { Admin } from '../entities/admin/Admin.entity';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../entities/category/Category.entity';
import { Package } from '../entities/package/Package.entity';
import { Guide } from '../entities/guide/Guide.entity';
import { Booking } from '../entities/booking/Booking.entity';
import { Inquiry } from '../entities/inquiry/Inquiry.entity';
import { BlogArticle } from '../entities/blog/BlogArticle.entity';
import { Setting } from '../entities/setting/Setting.entity';
import { Media } from '../entities/media/media.entity';
import { MediaType } from '../constants/appConstant';

export const seedDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  console.log('Database initialized for seeding...');

  // 1. Seed Admin
  const adminRepo = AppDataSource.getRepository(Admin);
  const existingAdmin = await adminRepo.findOne({
    where: { email: 'admin@alpineace.com' },
  });
  if (!existingAdmin) {
    const admin = adminRepo.create({
      name: 'Sujan Budhathoki',
      email: 'admin@alpineace.com',
      password: 'admin123',
      role: 'Expedition Director',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phoneNumber: '+977 9841-234567',
      isActive: true,
    });
    await adminRepo.save(admin);
    console.log('Seeded admin: admin@alpineace.com');
  }

  // 2. Seed Categories
  const categoryRepo = AppDataSource.getRepository(Category);
  const categoriesData = [
    {
      name: 'Everest & Khumbu Region',
      type: CategoryType.TREKKING,
      description:
        'Trekking packages navigating the iconic Khumbu valley, Lukla, Namche Bazaar, and Everest Base Camp.',
      itemCount: 8,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: '8000m Technical Expeditions',
      type: CategoryType.EXPEDITIONS,
      description:
        'Extreme high-altitude peak climbs requiring IFMGA guide ratios, oxygen systems, and fixed-line logistics.',
      itemCount: 4,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: 'UNESCO Heritage & Resorts',
      type: CategoryType.TOURS,
      description:
        'Cultural sightseeing, boutique heritage hotels, and luxury Pokhara resort stays.',
      itemCount: 6,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: 'High Altitude Physiology & Safety',
      type: CategoryType.BLOGS,
      description:
        'Expert guide insights on AMS prevention, acclimatization schedules, and mountain wellness.',
      itemCount: 12,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: 'Helicopter Charter Photography',
      type: CategoryType.MEDIA,
      description:
        'Aerial mountain imagery, heli-tour photography, and high-resolution marketing banners.',
      itemCount: 24,
      status: CategoryStatus.ACTIVE,
    },
    {
      name: 'Annapurna Sanctuary Circuit',
      type: CategoryType.TREKKING,
      description:
        'Traversing Thorong La pass, Poon Hill sunrises, and Annapurna Base Camp.',
      itemCount: 5,
      status: CategoryStatus.ACTIVE,
    },
  ];

  for (const cat of categoriesData) {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const exists = await categoryRepo.findOne({ where: { slug } });
    if (!exists) {
      await categoryRepo.save(categoryRepo.create({ ...cat, slug }));
    }
  }
  console.log('Seeded categories');

  // 3. Seed Packages
  const packageRepo = AppDataSource.getRepository(Package);
  const packagesData = [
    {
      title: 'Everest Base Camp & Gokyo Lakes Luxury Trek',
      slug: 'everest-base-camp-gokyo',
      categoryType: 'Trekking' as const,
      category: 'Trekking',
      region: 'Everest',
      durationDays: 16,
      maxAltitudeMeters: 5545,
      difficulty: 'Challenging',
      priceUSD: 3200,
      status: 'Featured' as const,
      totalBookings: 142,
      rating: 4.95,
      reviewsCount: 48,
      image:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Experience the ultimate trek to the base of Mt. Everest, staying in handpicked premium luxury lodges with Sherpa legends.',
      bestSeason: 'March - May & September - November',
      permitsRequired: ['Sagarmatha NP Permit', 'Khumbu Pasang Lhamu Entry'],
    },
    {
      title: 'Ama Dablam Technical Expedition (6,812m)',
      slug: 'ama-dablam-expedition',
      categoryType: 'Expedition' as const,
      category: 'Expedition',
      region: 'Everest',
      durationDays: 28,
      maxAltitudeMeters: 6812,
      difficulty: 'Extreme',
      priceUSD: 9800,
      status: 'Active' as const,
      totalBookings: 38,
      rating: 5.0,
      reviewsCount: 22,
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Climb the Matterhorn of the Himalayas with 1:1 IFMGA Sherpa summit leaders and high-altitude luxury basecamp support.',
      bestSeason: 'March - May & September - November',
      permitsRequired: [
        'NMA Climbing Permit',
        'Sagarmatha NP Permit',
        'Garbage Deposit',
      ],
    },
    {
      title: 'Annapurna Circuit & Tilicho Lake High Pass',
      slug: 'annapurna-circuit-tilicho',
      categoryType: 'Trekking' as const,
      category: 'Trekking',
      region: 'Annapurna',
      durationDays: 15,
      maxAltitudeMeters: 5416,
      difficulty: 'Challenging',
      priceUSD: 1650,
      status: 'Active' as const,
      totalBookings: 215,
      rating: 4.88,
      reviewsCount: 35,
      image:
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca913b?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Witness the complete diversity of the Himalayas, from lush tropical valleys and pine-covered ridges to Thorong La pass.',
      bestSeason: 'March - May & September - November',
      permitsRequired: ['ACAP Permit', 'TIMS Card'],
    },
    {
      title: 'Manaslu Circuit Restricted Area Trek',
      slug: 'manaslu-circuit',
      categoryType: 'Trekking' as const,
      category: 'Trekking',
      region: 'Manaslu',
      durationDays: 16,
      maxAltitudeMeters: 5160,
      difficulty: 'Challenging',
      priceUSD: 2100,
      status: 'Featured' as const,
      totalBookings: 89,
      rating: 4.92,
      reviewsCount: 22,
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Circumnavigate Mt. Manaslu (8,163m) across Larkya La Pass (5,106m) in an unspoiled restricted borderland.',
      bestSeason: 'March - May & September - November',
      permitsRequired: [
        'Manaslu Restricted Permit',
        'MCAP Permit',
        'ACAP Permit',
      ],
    },
    {
      title: 'Kathmandu Valley Royal Heritage & Durbar Squares Tour',
      slug: 'kathmandu-valley-royal-heritage',
      categoryType: 'Tour' as const,
      category: 'Tour',
      region: 'Kathmandu & Pokhara',
      durationDays: 5,
      maxAltitudeMeters: 1400,
      difficulty: 'Easy',
      priceUSD: 1650,
      status: 'Featured' as const,
      totalBookings: 41,
      rating: 4.9,
      reviewsCount: 41,
      image:
        'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Explore medieval durbar squares, ancient pagoda palaces, and sacred stupas with private historians.',
      bestSeason: 'Year-round, best October - April',
      permitsRequired: ['Monuments Entrance Fees'],
    },
    {
      title: 'Chitwan Luxury Wildlife Safari',
      slug: 'chitwan-luxury-wildlife-safari',
      categoryType: 'Tour' as const,
      category: 'Tour',
      region: 'Kathmandu & Pokhara',
      durationDays: 3,
      maxAltitudeMeters: 410,
      difficulty: 'Easy',
      priceUSD: 1450,
      status: 'Active' as const,
      totalBookings: 27,
      rating: 4.9,
      reviewsCount: 27,
      image:
        'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'Track one-horned rhinos and Bengal tigers across Chitwan National Park, staying in luxury jungle resort.',
      bestSeason: 'October - March',
      permitsRequired: ['Chitwan NP Entry'],
    },
    {
      title: 'Mount Everest Summit Expedition (8,849m)',
      slug: 'everest-summit-expedition',
      categoryType: 'Expedition' as const,
      category: 'Expedition',
      region: 'Everest',
      durationDays: 63,
      maxAltitudeMeters: 8849,
      difficulty: 'Extreme',
      priceUSD: 48500,
      status: 'Featured' as const,
      totalBookings: 11,
      rating: 5.0,
      reviewsCount: 11,
      image:
        'https://images.unsplash.com/photo-1583870908408-3f9c6f8a9e0f?auto=format&fit=crop&w=1200&q=80',
      shortDesc:
        'The ultimate mountaineering achievement. A full South Col expedition with 1:1 Sherpa support and bottled oxygen.',
      bestSeason: 'April - May',
      permitsRequired: [
        'Everest Summit Permit',
        'Sagarmatha NP Permit',
        'Khumbu Icefall Route Fee',
      ],
    },
  ];

  for (const pkg of packagesData) {
    const exists = await packageRepo.findOne({ where: { slug: pkg.slug } });
    if (!exists) {
      await packageRepo.save(packageRepo.create(pkg));
    }
  }
  console.log('Seeded packages');

  // 4. Seed Guides
  const guideRepo = AppDataSource.getRepository(Guide);
  const guidesData = [
    {
      name: 'Lakpa Tenzing Sherpa',
      role: 'Lead Expedition Leader' as const,
      summitStats: '12x Everest, 4x K2, 6x Lhotse',
      certifications: [
        'IFMGA Mountain Guide',
        'NMA Master Instructor',
        'Wilderness First Responder',
      ],
      status: 'On Mountain' as const,
      phone: '+977 9841-234567',
      email: 'lakpa.sherpa@alpineace.com',
      currentAssignment: 'Everest Base Camp Luxury Trek (ACE-2026-0891)',
      avatarUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mingma Norbu Sherpa',
      role: 'Lead Expedition Leader' as const,
      summitStats: '8x Everest, 9x Ama Dablam',
      certifications: ['IFMGA Mountain Guide', 'NMA Advanced Mountaineer'],
      status: 'Available' as const,
      phone: '+977 9851-876543',
      email: 'mingma.norbu@alpineace.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Pemba Gelje Sherpa',
      role: 'Senior Trekking Guide' as const,
      summitStats: '3x Island Peak, 4x Mera Peak',
      certifications: [
        'NMA Certified Trekking Guide',
        'Emergency Alpine First Aid',
      ],
      status: 'Available' as const,
      phone: '+977 9803-345678',
      email: 'pemba.g@alpineace.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Rohan Tamang',
      role: 'Cultural Tour Guide' as const,
      summitStats: 'Cultural Specialist (10+ Yrs)',
      certifications: ['Nepal Tourism Board License', 'Heritage Historian'],
      status: 'On Mountain' as const,
      phone: '+977 9818-567890',
      email: 'rohan.tamang@alpineace.com',
      currentAssignment: 'Kathmandu & Chitwan Safari (ACE-2026-0894)',
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
  ];

  for (const g of guidesData) {
    const exists = await guideRepo.findOne({ where: { email: g.email } });
    if (!exists) {
      await guideRepo.save(guideRepo.create(g));
    }
  }
  console.log('Seeded guides');

  // 5. Seed Bookings
  const bookingRepo = AppDataSource.getRepository(Booking);
  const bookingsData = [
    {
      reference: 'ACE-2026-0891',
      guestName: 'Marcus Vance',
      guestEmail: 'marcus.vance@example.com',
      guestPhone: '+1 (555) 234-5678',
      country: 'United States',
      packageName: 'Everest Base Camp Luxury Helicopter Trek',
      packageType: 'Trekking' as const,
      startDate: '2026-09-10',
      endDate: '2026-09-24',
      groupSize: 2,
      totalAmountUSD: 7600,
      paymentStatus: 'Deposit Paid' as const,
      bookingStatus: 'Confirmed' as const,
      assignedGuide: 'Lakpa Tenzing Sherpa',
      permitStatus: 'Issued' as const,
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
      packageType: 'Expedition' as const,
      startDate: '2026-10-01',
      endDate: '2026-10-28',
      groupSize: 1,
      totalAmountUSD: 9800,
      paymentStatus: 'Paid' as const,
      bookingStatus: 'Confirmed' as const,
      assignedGuide: 'Mingma Norbu Sherpa',
      permitStatus: 'Issued' as const,
      specialRequests: 'Personal oxygen setup request verified.',
    },
    {
      reference: 'ACE-2026-0893',
      guestName: 'Jean-Pierre Dubois',
      guestEmail: 'jp.dubois@example.fr',
      guestPhone: '+33 6 12 34 56 78',
      country: 'France',
      packageName: 'Annapurna Circuit High Passes',
      packageType: 'Trekking' as const,
      startDate: '2026-09-18',
      endDate: '2026-10-04',
      groupSize: 4,
      totalAmountUSD: 6400,
      paymentStatus: 'Pending' as const,
      bookingStatus: 'In Review' as const,
      assignedGuide: 'Pemba Gelje Sherpa',
      permitStatus: 'Processing' as const,
    },
  ];

  for (const b of bookingsData) {
    const exists = await bookingRepo.findOne({
      where: { reference: b.reference },
    });
    if (!exists) {
      await bookingRepo.save(bookingRepo.create(b));
    }
  }
  console.log('Seeded bookings');

  // 6. Seed Inquiries
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
      status: 'Quote Sent' as const,
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
      status: 'New' as const,
    },
  ];

  for (const inq of inquiriesData) {
    const exists = await inquiryRepo.findOne({
      where: { email: inq.email, interestedTrip: inq.interestedTrip },
    });
    if (!exists) {
      await inquiryRepo.save(inquiryRepo.create(inq));
    }
  }
  console.log('Seeded inquiries');

  // 7. Seed Blog Articles
  const blogRepo = AppDataSource.getRepository(BlogArticle);
  const blogsData = [
    {
      title: 'How to Prepare for High-Altitude Trekking in Nepal',
      slug: 'high-altitude-trekking-preparation',
      category: 'Expedition Prep',
      author: 'Mingma Sherpa',
      authorRole: 'IFMGA Expedition Leader',
      authorAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      readTime: '6 min read',
      status: 'Published' as const,
      publishedDate: '2026-07-12',
      views: 1420,
      excerpt:
        'Essential advice on cardiovascular training, altitude acclimatization schedules, and preventing AMS on the Everest trail.',
      content:
        'Preparing for a Himalayan trek is as much mental as it is physical. Build cardiovascular fitness for at least 8 weeks before departure, prioritize acclimatization days at 3,000m and 4,000m, and watch for early symptoms of acute mountain sickness.',
      image:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Top 5 Essential Packing Items for Everest Base Camp',
      slug: 'packing-list-everest-base-camp',
      category: 'Gear & Equipment',
      author: 'Sujan Budhathoki',
      authorRole: 'Founder & Director',
      authorAvatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      readTime: '4 min read',
      status: 'Published' as const,
      publishedDate: '2026-06-28',
      views: 980,
      excerpt:
        "Don't leave Kathmandu without these critical gear items — from thermal layering to down sleeping bags and solar power packs.",
      content:
        "Don't leave Kathmandu without these critical gear items: a -20°C rated down sleeping bag, moisture-wicking thermal base layers, a reliable headlamp with spare batteries, and broken-in trekking boots.",
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  for (const b of blogsData) {
    const exists = await blogRepo.findOne({ where: { slug: b.slug } });
    if (!exists) {
      await blogRepo.save(blogRepo.create(b));
    }
  }
  console.log('Seeded blog articles');

  // 8. Seed Settings
  const settingRepo = AppDataSource.getRepository(Setting);
  const defaultSettings = [
    { key: 'siteName', value: 'Alpine Ace Expeditions' },
    { key: 'contactEmail', value: 'expeditions@alpineace.com' },
    { key: 'contactPhone', value: '+977 1 4545890' },
    { key: 'companyAddress', value: 'Thamel, Kathmandu, Nepal' },
    {
      key: 'metaTitle',
      value: 'Alpine Ace | Premium Himalayan Expeditions & Luxury Treks',
    },
    {
      key: 'metaDescription',
      value: 'Leading high-altitude expedition operator in Nepal.',
    },
    { key: 'enableBookings', value: 'true' },
    { key: 'currency', value: 'USD' },
  ];

  for (const s of defaultSettings) {
    const exists = await settingRepo.findOne({ where: { key: s.key } });
    if (!exists) {
      await settingRepo.save(settingRepo.create(s));
    }
  }
  console.log('Seeded site settings');

  // 9. Seed Media
  const mediaRepo = AppDataSource.getRepository(Media);
  const mediaCount = await mediaRepo.count();
  if (mediaCount === 0) {
    const defaultMedia = [
      {
        name: 'everest-basecamp.jpg',
        mimeType: 'image/jpeg',
        fileSize: '482100',
        mediaType: MediaType.BLOG_THUMBNAIL,
        path: '/uploads/everest-basecamp.jpg',
      },
      {
        name: 'annapurna-circuit.jpg',
        mimeType: 'image/jpeg',
        fileSize: '512000',
        mediaType: MediaType.BLOG_THUMBNAIL,
        path: '/uploads/annapurna-circuit.jpg',
      },
    ];
    for (const m of defaultMedia) {
      await mediaRepo.save(mediaRepo.create(m));
    }
    console.log('Seeded initial media records');
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
