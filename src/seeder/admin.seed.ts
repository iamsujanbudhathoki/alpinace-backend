import { seedDatabase } from './seed';

seedDatabase()
  .then(() => console.log('Seeding completed!'))
  .catch((err) => console.error('Seeding failed:', err));
