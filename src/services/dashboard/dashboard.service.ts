import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Booking,
  BookingPackageType,
  BookingPaymentStatus,
  BookingPermitStatus,
  BookingStepStatus,
} from '../../entities/booking/Booking.entity';
import { Inquiry, InquiryStepStatus } from '../../entities/inquiry/Inquiry.entity';
import { Trek, TrekStatus } from '../../entities/trek/Trek.entity';
import { Tour, TourStatus } from '../../entities/tour/Tour.entity';
import {
  Expedition,
  ExpeditionStatus,
} from '../../entities/expedition/Expedition.entity';

export interface DashboardMetricsResponse {
  totalRevenueUSD: number;
  revenueChangePercent: number;
  activeExpeditions: number;
  climbersOnMountain: number;
  pendingBookings: number;
  pendingInquiries: number;
  timsPermitsProcessing: number;
  recentBookings: Booking[];
  featuredPackages: any[];
}

@autoInjectable()
export class DashboardService {
  private bookingRepo = AppDataSource.getRepository(Booking);
  private inquiryRepo = AppDataSource.getRepository(Inquiry);
  private trekRepo = AppDataSource.getRepository(Trek);
  private tourRepo = AppDataSource.getRepository(Tour);
  private expeditionRepo = AppDataSource.getRepository(Expedition);

  async getMetrics(): Promise<DashboardMetricsResponse> {
    const bookings = await this.bookingRepo.find({
      order: { createdAt: 'DESC' },
    });
    const inquiries = await this.inquiryRepo.find();
    const treks = await this.trekRepo.find();
    const tours = await this.tourRepo.find();
    const expeditions = await this.expeditionRepo.find();

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + Number(b.totalAmountUSD || 0),
      0,
    );

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentMonthRevenue = bookings
      .filter((b) => b.createdAt && new Date(b.createdAt) >= currentMonthStart)
      .reduce((sum, b) => sum + Number(b.totalAmountUSD || 0), 0);

    const prevMonthRevenue = bookings
      .filter(
        (b) =>
          b.createdAt &&
          new Date(b.createdAt) >= prevMonthStart &&
          new Date(b.createdAt) < currentMonthStart,
      )
      .reduce((sum, b) => sum + Number(b.totalAmountUSD || 0), 0);

    let revenueChangePercent = 0;
    if (prevMonthRevenue > 0) {
      revenueChangePercent = Number(
        (((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1),
      );
    } else if (currentMonthRevenue > 0) {
      revenueChangePercent = 100;
    }

    const activeExpeditionsCount = expeditions.filter(
      (e) => e.status === ExpeditionStatus.ACTIVE,
    ).length;

    const climbersCount = bookings
      .filter((b) => {
        if (b.packageType !== BookingPackageType.EXPEDITION) return false;
        const steps = b.steps;
        if (!Array.isArray(steps) || steps.length === 0) return false;
        const s3 = steps[2]?.status;
        const s4 = steps[3]?.status;
        return (
          s3 === BookingStepStatus.COMPLETED ||
          s4 === BookingStepStatus.IN_PROGRESS ||
          s4 === BookingStepStatus.COMPLETED ||
          s4 === BookingStepStatus.ACTIVE
        );
      })
      .reduce((sum, b) => sum + Number(b.groupSize || 1), 0);

    const pendingBookingsCount = bookings.filter((b) => {
      if (b.paymentStatus === BookingPaymentStatus.PENDING) return true;
      const steps = b.steps;
      if (!Array.isArray(steps) || steps.length === 0) return true;
      const s1 = steps[0]?.status;
      const s2 = steps[1]?.status;
      return (
        s1 === BookingStepStatus.PENDING ||
        s2 === BookingStepStatus.PENDING ||
        s2 === BookingStepStatus.IN_PROGRESS
      );
    }).length;

    const pendingInquiriesCount = inquiries.filter((inq) => {
      const steps = inq.steps;
      if (!Array.isArray(steps) || steps.length === 0) return true;
      const s1 = steps[0]?.status;
      const s2 = steps[1]?.status;
      return (
        s1 === InquiryStepStatus.PENDING ||
        s2 === InquiryStepStatus.PENDING ||
        s2 === InquiryStepStatus.IN_PROGRESS
      );
    }).length;

    const timsProcessingCount = bookings.filter(
      (b) => b.permitStatus === BookingPermitStatus.PROCESSING,
    ).length;

    const featuredTreks = treks
      .filter((t) => Boolean(t.isFeatured))
      .map((t) => ({ ...t, categoryType: BookingPackageType.TREKKING }));
    const featuredExpeditions = expeditions
      .filter((e) => Boolean(e.isFeatured))
      .map((e) => ({ ...e, categoryType: BookingPackageType.EXPEDITION }));
    const featuredTours = tours
      .filter((tr) => Boolean(tr.isFeatured))
      .map((tr) => ({ ...tr, categoryType: BookingPackageType.TOUR }));

    const featuredPackages = [
      ...featuredTreks,
      ...featuredExpeditions,
      ...featuredTours,
    ].slice(0, 4);

    return {
      totalRevenueUSD: totalRevenue,
      revenueChangePercent,
      activeExpeditions: activeExpeditionsCount,
      climbersOnMountain: climbersCount,
      pendingBookings: pendingBookingsCount,
      pendingInquiries: pendingInquiriesCount,
      timsPermitsProcessing: timsProcessingCount,
      recentBookings: bookings.slice(0, 5),
      featuredPackages,
    };
  }
}
