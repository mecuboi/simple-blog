const sequelize = require('../config/connection');

const seedUsers = require('./userSeed');
const seedBlogs = require('./blogSeed');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();

  console.log('\n----- Users SEEDED -----\n');

  await seedBlogs();

  console.log('\n----- Blogs SEEDED-----\n');


  process.exit(0);

};

seedDatabase();
