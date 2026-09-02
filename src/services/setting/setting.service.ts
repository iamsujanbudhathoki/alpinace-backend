import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Setting } from '../../entities/setting/Setting.entity';
import { Media } from '../../entities/media/media.entity';
import { UpdateSettingsDto } from '../../schemas/setting.schema';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class SettingService {
  private repo = AppDataSource.getRepository(Setting);

  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(): Promise<Record<string, string>> {
    const settings = await this.repo.find();
    const map: Record<string, string> = {
      // General Info
      siteName: 'Alpine Ace Expeditions',
      tagline: 'Venture Beyond the Ordinary',
      contactEmail: 'info@alpineace.com',
      contactPhone: '+977 1 4700543',
      emergencyPhone: '+977 9851000000',
      whatsappNumber: '9779851000000',
      companyAddress: 'Thamel Marg, Ward 26, Kathmandu, Nepal',
      googleMapsUrl: 'https://maps.google.com/?q=Thamel+Kathmandu+Nepal',
      officeHours: 'Sun - Fri: 09:00 AM - 06:00 PM (NPT)',

      // SEO & Analytics
      metaTitle:
        'Alpine Ace | Nepal Trekking, Historical Tours & Peak Expeditions',
      metaDescription:
        "Experience Nepal's spectacular trekking routes, historical tours, and elite peak expeditions under the safe guidance of multi-summit Sherpas.",
      metaKeywords:
        'Nepal trekking, Everest Base Camp, Annapurna Circuit, peak climbing, Sherpa guides, luxury mountain lodges',
      canonicalUrl: 'https://alpineacetreks.com',
      googleAnalyticsId: '',
      googleSiteVerification: '',

      // Social Links
      facebookUrl: 'https://facebook.com/alpineacenepal',
      instagramUrl: 'https://instagram.com/alpineacenepal',
      youtubeUrl: 'https://youtube.com/@alpineacenepal',
      tripadvisorUrl: 'https://tripadvisor.com',
      linkedinUrl: 'https://linkedin.com/company/alpine-ace-expeditions',

      // Legal & Compliance Content
      privacyPolicy: `<h2>1. Our Commitment to Your Privacy</h2><p>AlpineAce Treks &amp; Expeditions Pvt. Ltd. ("AlpineAce", "we", "our", or "us") respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy details how we gather, utilize, disclose, and guard your personal details when you access our website, make inquiries, or book high-altitude treks, cultural tours, and peak climbing expeditions in Nepal.</p><h2>2. Information We Collect</h2><p>To process expedition permits, arrange domestic aviation/helicopter shuttles, and reserve high-altitude lodges, we collect personal details provided directly by you during inquiry or booking:</p><ul><li><strong>Personal Identifiers:</strong> Full legal name, date of birth, passport number, nationality, and gender.</li><li><strong>Contact Information:</strong> Email address, telephone/WhatsApp number, physical residential address.</li><li><strong>Expedition &amp; Medical Details:</strong> Dietary preferences, physical fitness background, previous high-altitude experience, pre-existing medical conditions, emergency contact details, and travel insurance policy numbers.</li><li><strong>Payment Data:</strong> Transaction references and billing addresses processed securely via certified banking partners.</li></ul><h2>3. How We Use Your Information</h2><p>We utilize your information exclusively for legitimate travel operations and safety compliance, including procuring official trek permits, securing national park entries, and coordinating emergency medical evacuation readiness.</p><h2>4. Information Sharing &amp; Third Parties</h2><p>We never sell, rent, or trade your personal data. We share data strictly on a need-to-know basis with government authorities, national park checkpoints, rescue operators, and certified Sherpa guides for legal permit issuance and safety.</p><h2>5. Data Security &amp; Storage</h2><p>We implement industry-standard encryption, strict access controls, and secure server architecture to safeguard your personal data from unauthorized access, alteration, or disclosure.</p><h2>6. Your Legal Rights</h2><p>You maintain the right to access, update, or request the deletion of your personal data stored in our systems at any time by contacting us at info@alpineace.com.</p>`,

      termsAndConditions: `<h2>1. Booking &amp; Contract Agreement</h2><p>By submitting a trip deposit or booking confirmation with AlpineAce Treks &amp; Expeditions Pvt. Ltd. ("AlpineAce"), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms &amp; Conditions. All bookings become active upon receipt of your initial deposit and official booking confirmation email from our Kathmandu concierge.</p><h2>2. Deposit &amp; Payment Schedule</h2><ul><li><strong>Initial Booking Deposit:</strong> A non-refundable 25% deposit per person is required to confirm your reservation and secure permit processing, domestic flight seats, and lodge reservations.</li><li><strong>Final Balance Payment:</strong> The remaining 75% balance must be settled in full at least 14 days prior to your trip start date in Kathmandu or upon arrival during your pre-trip briefing.</li><li><strong>Peak Expeditions:</strong> Major peak climbing expeditions require a 40% deposit due to advance non-refundable royalty payments to the Nepal Ministry of Culture, Tourism and Civil Aviation.</li></ul><h2>3. Cancellation &amp; Refund Policy</h2><p>Cancellations must be submitted in writing to info@alpineace.com. Refund percentages depend on the timing of written notice prior to departure.</p><h2>4. Mandatory Travel &amp; High-Altitude Rescue Insurance</h2><p>Comprehensive travel insurance is strictly <strong>MANDATORY</strong> for all participants on treks and expeditions operating above 3,000 meters altitude in Nepal. Your insurance policy MUST explicitly cover high-altitude trekking/mountaineering AND emergency helicopter search, rescue, and medical evacuation.</p><h2>5. High-Altitude Risk &amp; Personal Health</h2><p>Himalayan trekking and high-altitude mountaineering involve inherent risks, including Acute Mountain Sickness (AMS), extreme weather fluctuations, landslides, flight delays, and physical exertion.</p><h2>6. Sherpa Guide Authority &amp; Route Flexibility</h2><p>Your safety is our highest priority. The designated Expedition Director or IFMGA/NMA Senior Lead Sherpa Guide holds full authority to modify day-to-day itineraries, turn back participants, or alter schedules if safety requires.</p><h2>7. Governing Law &amp; Jurisdiction</h2><p>This agreement is governed by and construed in accordance with the laws of Nepal. Any legal disputes shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.</p>`,
    };

    const mediaRepo = AppDataSource.getRepository(Media);

    for (const s of settings) {
      if (s.key === 'currency') {
        delete map.currency;
        await this.repo.delete({ key: 'currency' });
        continue;
      }
      if (s.key === 'testimonials' && s.value) {
        try {
          const list = JSON.parse(s.value);
          if (Array.isArray(list)) {
            const updatedList = await Promise.all(
              list.map(async (item: any) => {
                if (item.avatarMediaId) {
                  const media = await mediaRepo.findOne({
                    where: { id: item.avatarMediaId },
                  });
                  if (media) {
                    item.avatar = media.path;
                  }
                }
                return item;
              }),
            );
            map[s.key] = JSON.stringify(updatedList);
            continue;
          }
        } catch {
          // ignore parse error
        }
      }
      map[s.key] = s.value;
    }

    delete map.currency;

    return map;
  }

  async update(dto: UpdateSettingsDto): Promise<Record<string, string>> {
    const oldSettings = await this.getAll();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) {
        const valStr =
          typeof value === 'object' && value !== null
            ? JSON.stringify(value)
            : String(value);
        let setting = await this.repo.findOne({ where: { key } });
        if (!setting) {
          setting = this.repo.create({ key, value: valStr });
        } else {
          setting.value = valStr;
        }
        await this.repo.save(setting);
      }
    }

    const newSettings = await this.getAll();
    await this.auditLogService.logUpdate(
      AuditEntityType.SETTING,
      'global',
      oldSettings,
      newSettings,
    );

    return newSettings;
  }
}
