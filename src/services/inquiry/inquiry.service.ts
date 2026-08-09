import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Inquiry } from '../../entities/inquiry/Inquiry.entity';
import {
  CreateInquiryDto,
  UpdateInquiryDto,
} from '../../schemas/inquiry.schema';
import { AppError } from '../../utils/appError.util';
import emailUtil from '../../utils/email.util';

@autoInjectable()
export class InquiryService {
  private repo = AppDataSource.getRepository(Inquiry);

  async getAll(): Promise<Inquiry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getById(id: string): Promise<Inquiry> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Inquiry with ID ${id} not found`);
    return item;
  }

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    const inquiry = this.repo.create({
      guestName: dto.guestName,
      email: dto.email,
      phone: dto.phone,
      country: dto.country,
      interestedTrip: dto.interestedTrip,
      travelDates: dto.travelDates,
      groupSize: Number(dto.groupSize),
      message: dto.message,
      status: 'New',
    });

    const saved = await this.repo.save(inquiry);

    // Asynchronously dispatch emails to Client and Admin via Nodemailer
    emailUtil
      .sendInquiryEmails({
        guestName: dto.guestName,
        email: dto.email,
        phone: dto.phone,
        interestedTrip: dto.interestedTrip,
        travelDates: dto.travelDates,
        groupSize: Number(dto.groupSize),
        message: dto.message,
      })
      .catch((err) => console.error('[Nodemailer] Background email send error:', err));

    return saved;
  }

  async update(id: string, dto: UpdateInquiryDto): Promise<Inquiry> {
    const inquiry = await this.getById(id);
    if (dto.status) inquiry.status = dto.status;
    if (dto.notes !== undefined) inquiry.notes = dto.notes;
    return this.repo.save(inquiry);
  }

  async delete(id: string): Promise<boolean> {
    const inquiry = await this.getById(id);
    await this.repo.remove(inquiry);
    return true;
  }
}
