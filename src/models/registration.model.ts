import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  payment: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'cancelled';
  teamName?: string;
  teamMembers?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    teamName: {
      type: String,
      trim: true,
    },
    teamMembers: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export const Registration = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', registrationSchema);
