const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/auth/authModel');

const [name, email, password] = process.argv.slice(2);

const run = async () => {
  if (!name || !email || !password) {
    console.log('Use: node createAdmin.js "Naam" email@example.com password');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ name, email, password: hashed });

  console.log('Admin ban gaya:', email);
  process.exit(0);
};

run().catch((err) => {
  console.log('Error:', err.message);
  process.exit(1);
});