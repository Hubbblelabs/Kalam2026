import crypto from 'crypto';
import { config } from '../config/env.js';
import { Payment } from '../models/payment.model.js';
import { Registration } from '../models/registration.model.js';
import { Event } from '../models/event.model.js';

interface InitiatePaymentInput {
  userId: string;
  eventId: string;
  amount: number;
}

interface PaymentResult {
  merchantTransactionId: string;
  redirectUrl: string;
}

// PhonePe API endpoints
const PHONEPE_API = {
  UAT: 'https://api-preprod.phonepe.com/apis/pg-sandbox',
  PRODUCTION: 'https://api.phonepe.com/apis/hermes',
};

export const paymentService = {
  async initiatePayment(input: InitiatePaymentInput): Promise<PaymentResult> {
    const { userId, eventId, amount } = input;

    // Generate unique transaction ID
    const merchantTransactionId = `KALAM_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Create payment record
    await Payment.create({
      user: userId,
      event: eventId,
      transactionId: merchantTransactionId, // Will be updated with PhonePe transaction ID
      merchantTransactionId,
      amount,
      status: 'pending',
    });

    // Prepare PhonePe payload
    const payload = {
      merchantId: config.PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${config.PHONEPE_CALLBACK_URL}?txnId=${merchantTransactionId}`,
      redirectMode: 'POST',
      callbackUrl: config.PHONEPE_CALLBACK_URL,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksum = this.generateChecksum(base64Payload, '/pg/v1/pay');

    // In real implementation, make API call to PhonePe
    // const response = await fetch(`${PHONEPE_API[config.PHONEPE_ENV]}/pg/v1/pay`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-VERIFY': checksum,
    //   },
    //   body: JSON.stringify({ request: base64Payload }),
    // });

    // For now, return mock response
    return {
      merchantTransactionId,
      redirectUrl: `${PHONEPE_API[config.PHONEPE_ENV]}/pay/${merchantTransactionId}`,
    };
  },

  generateChecksum(payload: string, endpoint: string): string {
    const data = payload + endpoint + config.PHONEPE_SALT_KEY;
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return `${hash}###${config.PHONEPE_SALT_INDEX}`;
  },

  async verifyCallback(body: unknown, headers: Record<string, unknown>): Promise<boolean> {
    // Verify PhonePe callback signature
    const xVerify = headers['x-verify'] as string;
    if (!xVerify) return false;

    // In real implementation, verify the checksum
    // const [receivedHash, saltIndex] = xVerify.split('###');
    // const computedHash = this.generateChecksum(JSON.stringify(body), '');
    // return receivedHash === computedHash;

    return true; // Placeholder
  },

  async processCallback(body: Record<string, unknown>): Promise<void> {
    const { merchantTransactionId, transactionId, code, status } = body.response as {
      merchantTransactionId: string;
      transactionId: string;
      code: string;
      status: string;
    };

    // Idempotency check - don't process already completed payments
    const payment = await Payment.findOne({ merchantTransactionId });
    if (!payment || payment.status !== 'pending') {
      return;
    }

    // Update payment status
    const paymentStatus = code === 'PAYMENT_SUCCESS' ? 'success' : 'failed';
    payment.status = paymentStatus;
    payment.transactionId = transactionId;
    payment.providerResponse = body;
    await payment.save();

    // If payment successful, confirm registration
    if (paymentStatus === 'success') {
      await Registration.findOneAndUpdate(
        { user: payment.user, event: payment.event },
        { status: 'confirmed', payment: payment._id }
      );

      // Increment participant count
      await Event.findByIdAndUpdate(payment.event, {
        $inc: { currentParticipants: 1 },
      });
    }
  },

  async checkStatus(transactionId: string) {
    const payment = await Payment.findOne({
      $or: [{ transactionId }, { merchantTransactionId: transactionId }],
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return {
      transactionId: payment.transactionId,
      merchantTransactionId: payment.merchantTransactionId,
      amount: payment.amount,
      status: payment.status,
    };
  },
};
