import { AppDataSource } from '../config/database.config';
import { Admin } from '../entities/admin/Admin.entity';

async function resetFailedLogins() {
  const targetEmail = process.argv[2];

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected successfully.');
    }

    const adminRepo = AppDataSource.getRepository(Admin);

    if (targetEmail) {
      const admin = await adminRepo.findOne({
        where: { email: targetEmail },
        select: ['id', 'email', 'isActive', 'failedLoginAttempts'],
      });

      if (!admin) {
        console.error(`Admin with email "${targetEmail}" not found.`);
        process.exit(1);
      }

      admin.failedLoginAttempts = 0;
      admin.isActive = true;
      await adminRepo.save(admin);

      console.log(
        `Successfully reset failedLoginAttempts to 0 and reactivated admin: ${admin.email}`,
      );
    } else {
      const result = await adminRepo
        .createQueryBuilder()
        .update(Admin)
        .set({ failedLoginAttempts: 0, isActive: true })
        .execute();

      console.log(
        `Successfully reset failedLoginAttempts to 0 and reactivated all admin accounts (${result.affected || 0} affected).`,
      );
    }
  } catch (error) {
    console.error('Error resetting failed login attempts:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}

resetFailedLogins();
