// Database initialization script
import db from './index.js';

console.log('🔧 Initializing database...');

try {
  // Run schema (it's in index.js)
  console.log('✓ Database schema created');
  console.log(`✓ Database location: ${db.name}`);
  console.log('✓ Database initialized successfully!');
  console.log('');
  console.log('To seed with initial data, run: npm run db:seed');

  process.exit(0);
} catch (error) {
  console.error('✗ Error initializing database:', error);
  process.exit(1);
}
