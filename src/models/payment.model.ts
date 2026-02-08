import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  gateway: 'razorpay' | 'cashfree' | 'phonepe';
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  amount: number;
  currency: 'INR';
  status: 'CREATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  rawResponse?: any;
  initiatedAt: Date;
  completedAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    gateway: {
      type: String,
      enum: ['razorpay', 'cashfree', 'phonepe'],
      required: true,
    },
    gatewayOrderId: {
      type: String,
    },
    gatewayPaymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['CREATED', 'SUCCESS', 'FAILED', 'REFUNDED'],
      default: 'CREATED',
    },
    rawResponse: {
      type: Schema.Types.Mixed,
    },
    initiatedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: false, // using initiatedAt/completedAt
  }
);

// Indexes
paymentSchema.index({ order: 1 }, { unique: true });
paymentSchema.index({ gatewayOrderId: 1 });
paymentSchema.index({ gatewayPaymentId: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ amount: 1 });

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', paymentSchema);
