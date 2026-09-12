import { AppDataSource } from '../config/database.config';
import { Admin, AdminRole } from '../entities/admin/Admin.entity';

export const seedDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  console.log('Database initialized for seeding...');

  // Seed Admin User
  const adminRepo = AppDataSource.getRepository(Admin);
  const existingAdmin = await adminRepo.findOne({
    where: { email: 'admin@alpineacetreks.com' },
    withDeleted: true,
  });

  if (!existingAdmin) {
    const admin = adminRepo.create({
      name: 'Alpine Ace Treks Admin',
      email: 'admin@alpineacetreks.com',
      password: 'admin123',
      role: AdminRole.ADMIN,
      phoneNumber: '+977 9841234567',
      isActive: true,
      failedLoginAttempts: 0,
    });
    await adminRepo.save(admin);
    console.log('Seeded admin user: admin@alpineacetreks.com');
  } else {
    existingAdmin.role = AdminRole.ADMIN;
    existingAdmin.isActive = true;
    existingAdmin.failedLoginAttempts = 0;
    await adminRepo.save(existingAdmin);
    console.log('Admin user verified: admin@alpineacetreks.com');
  }

  console.log('Database seeding finished successfully!');
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding script finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}
