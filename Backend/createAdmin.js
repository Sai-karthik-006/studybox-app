const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// User Schema (matches your existing User model)
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

// Create User model
const User = mongoose.model('User', userSchema);

// Admin user data
const adminUser = {
  firstName: 'Karthik',
  lastName: 'Attisi',
  email: 'attisivasaikarthik@gmail.com',
  phone: '8919472701',
  gender: 'male',
  password: 'Jaishu@1117', // This will be hashed
  role: 'admin'
};

async function createAdminUser() {
  try {
    console.log('🚀 Starting admin user creation...');
    
    // Connect to database
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('✅ Admin user already exists in database:');
      console.log(`   Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    console.log('🔑 Hashing password...');
    // Hash password
    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    console.log('👤 Creating admin user...');
    // Create admin user
    const user = await User.create(adminUser);
    
    console.log('🎉 ADMIN USER CREATED SUCCESSFULLY!');
    console.log('=====================================');
    console.log(`👤 Name: ${user.firstName} ${user.lastName}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Password: Jaishu@1117 (original)`);
    console.log(`🎯 Role: ${user.role}`);
    console.log(`📞 Phone: ${user.phone}`);
    console.log(`👤 Gender: ${user.gender}`);
    console.log(`🆔 User ID: ${user._id}`);
    console.log('=====================================');
    console.log('✅ You can now login with these credentials!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the function
createAdminUser();