import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  event: mongoose.Types.ObjectId;
  amount: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  entryFee?: number;
  totalAmount: number;
  status: 'CREATED' | 'PAID' | 'FAILED' | 'CANCELLED';
  payment?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date; // implicit
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        event: {
          type: Schema.Types.ObjectId,
          ref: 'Event',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    entryFee: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['CREATED', 'PAID', 'FAILED', 'CANCELLED'],
      default: 'CREATED',
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // schema says createdAt only? keeping standard timestamps probably safer but schema says createdAt
  }
);

// Indexes
orderSchema.index({ user: 1 });
orderSchema.index({ payment: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ totalAmount: 1 });

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
