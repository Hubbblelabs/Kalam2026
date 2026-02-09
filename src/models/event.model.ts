import mongoose, { Schema, Document } from 'mongoose';

interface IEventSchedule {
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
}

interface IEventFee {
  amount?: number;
  description?: string;
}

interface IEventContact {
  phone?: string;
  email?: string;
}

export interface IEvent extends Document {
  name: string;
  slug: string;
  shortDetail?: string;
  description?: string;
  category: mongoose.Types.ObjectId;
  department?: mongoose.Types.ObjectId;
  schedule?: IEventSchedule;
  venue?: string;
  fee?: IEventFee;
  bannerImage?: string;
  contact?: IEventContact;
  requiresTeam: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortDetail: String,
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'EventCategory',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    schedule: {
      startDate: Date,
      startTime: String,
      endDate: Date,
      endTime: String,
    },
    venue: String,
    fee: {
      amount: Number,
      description: String,
    },
    bannerImage: String,
    contact: {
      phone: String,
      email: String,
    },
    requiresTeam: {
      type: Boolean,
      default: false,
    },
    minTeamSize: {
      type: Number,
      required: function (this: IEvent) {
        return this.requiresTeam === true;
      },
    },
    maxTeamSize: {
      type: Number,
      required: function (this: IEvent) {
        return this.requiresTeam === true;
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ category: 1 });
eventSchema.index({ department: 1 });
eventSchema.index({ 'schedule.startDate': 1 });
eventSchema.index({ createdAt: -1 });
eventSchema.index({
  name: 'text',
  shortDetail: 'text',
  description: 'text',
});

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
