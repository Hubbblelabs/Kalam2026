import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  college?: string;
  department?: string;
  passwordHash?: string;
  role: 'user' | 'admin';
  hasPaidEntryFee: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    college: {
      type: String,
    },
    department: {
      type: String,
    },
    passwordHash: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    hasPaidEntryFee: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true, sparse: true });
userSchema.index({ college: 1 });
userSchema.index({ department: 1 });
userSchema.index({ hasPaidEntryFee: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
