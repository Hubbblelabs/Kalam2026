/**
 * Script to create initial admin user
 * Run with: pnpm create-admin
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import argon2 from 'argon2';

// Database connection
async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalam2026';
  
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');
}

// Admin schema (defined here to avoid server-only imports)
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  passwordHash: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  role: {
    type: String,
    enum: ['superadmin', 'event_manager', 'department_manager'],
    required: true,
  },
  assignedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: { createdAt: true, updatedAt: false } });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@kalam2026.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const name = process.env.ADMIN_NAME || 'System Admin';

    // Check if admin already exists
    const existing: any = await Admin.findOne({ email }).lean();
    if (existing) {
      console.log(`✅ Admin already exists with email: ${email}`);
      console.log(`   Current Role: ${existing.role}`);
      
      // Update role if it's using old/invalid values
      const validRoles = ['superadmin', 'event_manager', 'department_manager'];
      if (!validRoles.includes(existing.role)) {
        console.log(`   ⚠️  Invalid role detected: "${existing.role}"`);
        
        // Use updateOne to bypass schema validation issues
        await Admin.updateOne(
          { _id: existing._id },
          { 
            $set: { 
              role: 'superadmin',
              department: null  // Superadmin shouldn't have a department
            } 
          }
        );
        console.log(`   ✓ Updated role to: superadmin`);
        console.log(`   ✓ Cleared department field`);
      } else if (existing.role === 'department_admin' || existing.role === 'event_admin') {
        const newRole = existing.role === 'department_admin' ? 'department_manager' : 'event_manager';
        await Admin.updateOne(
          { _id: existing._id },
          { $set: { role: newRole } }
        );
        console.log(`   ✓ Updated role from old value to ${newRole}`);
      }
      
      console.log(`\n✅ Admin is ready to use!`);
      console.log(`   Email: ${email}`);
      console.log(`   Role: superadmin\n`);
      return;
    }

    // Create new superadmin
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
    
    const admin = await Admin.create({
      name,
      email,
      passwordHash,
      role: 'superadmin',
      department: null,
      assignedEvents: [],
    });

    console.log('\n✅ Superadmin created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: ${admin.role}`);
    console.log('\n⚠️  Please change the password after first login!\n');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
