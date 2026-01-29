import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  transactionId: string;
  merchantTransactionId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethod?: string;
  providerResponse?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
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
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    merchantTransactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
    providerResponse: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ merchantTransactionId: 1 });
paymentSchema.index({ user: 1, status: 1 });

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
