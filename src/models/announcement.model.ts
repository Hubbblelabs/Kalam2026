import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'urgent' | 'event';
  targetAudience: 'all' | 'registered' | 'department';
  department?: mongoose.Types.ObjectId;
  event?: mongoose.Types.ObjectId;
  isActive: boolean;
  publishAt?: Date;
  expiresAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'urgent', 'event'],
      default: 'info',
    },
    targetAudience: {
      type: String,
      enum: ['all', 'registered', 'department'],
      default: 'all',
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    publishAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

announcementSchema.index({ isActive: 1 });
announcementSchema.index({ type: 1 });
announcementSchema.index({ createdAt: -1 });
announcementSchema.index({ publishAt: 1 });
announcementSchema.index({ expiresAt: 1 });

export const Announcement =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>('Announcement', announcementSchema);
