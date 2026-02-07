import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  category: string;
  date: Date;
  venue: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationFee: number;
  rules: string[];
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    registrationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    rules: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
eventSchema.index({ category: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ isActive: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema);
