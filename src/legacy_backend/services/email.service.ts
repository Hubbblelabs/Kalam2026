import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

// Transporter for transactional emails (products@)
const productsTransporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false, // TLS
  auth: {
    user: config.SMTP_USER_PRODUCTS,
    pass: config.SMTP_PASS_PRODUCTS,
  },
});

// Transporter for support emails
const supportTransporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  auth: {
    user: config.SMTP_USER_SUPPORT,
    pass: config.SMTP_PASS_SUPPORT,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const emailService = {
  async sendTransactional(options: EmailOptions): Promise<void> {
    await productsTransporter.sendMail({
      from: `"${config.SMTP_FROM_NAME}" <${config.SMTP_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  },

  async sendSupport(options: EmailOptions): Promise<void> {
    await supportTransporter.sendMail({
      from: `"${config.SMTP_FROM_NAME} Support" <${config.SMTP_USER_SUPPORT}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  },

  // Pre-built email templates
  async sendRegistrationConfirmation(email: string, data: {
    userName: string;
    eventName: string;
    eventDate: string;
    venue: string;
    registrationId: string;
  }): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Registration Confirmed</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Registration Confirmed! 🎉</h1>
          <p>Hello ${data.userName},</p>
          <p>Your registration for <strong>${data.eventName}</strong> has been confirmed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Event Details</h3>
            <p><strong>Event:</strong> ${data.eventName}</p>
            <p><strong>Date:</strong> ${data.eventDate}</p>
            <p><strong>Venue:</strong> ${data.venue}</p>
            <p><strong>Registration ID:</strong> ${data.registrationId}</p>
          </div>
          
          <p>Please keep this email for your records.</p>
          
          <p>Best regards,<br>Kalam 2026 Team</p>
        </div>
      </body>
      </html>
    `;

    await this.sendTransactional({
      to: email,
      subject: `Registration Confirmed: ${data.eventName} - Kalam 2026`,
      html,
    });
  },

  async sendPaymentReceipt(email: string, data: {
    userName: string;
    amount: number;
    transactionId: string;
    eventName: string;
  }): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Receipt</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Payment Receipt</h1>
          <p>Hello ${data.userName},</p>
          <p>Your payment has been successfully processed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Payment Details</h3>
            <p><strong>Amount:</strong> ₹${data.amount}</p>
            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
            <p><strong>Event:</strong> ${data.eventName}</p>
          </div>
          
          <p>Thank you for your payment!</p>
          
          <p>Best regards,<br>Kalam 2026 Team</p>
        </div>
      </body>
      </html>
    `;

    await this.sendTransactional({
      to: email,
      subject: `Payment Receipt - Kalam 2026`,
      html,
    });
  },
};
