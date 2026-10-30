import { RegistrationData } from '../types';
import { PaymentResult } from './payment';

/**
 * EmailJS Automated Confirmation Dispatch Service
 * Company: AronLabz Tech Pvt Ltd
 * Sends immediate confirmation email to student upon payment capture
 */

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const defaultEmailJSConfig: EmailJSConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_bfu9is8',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_v30dplj',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '25m02sQQ9YzU3GnLY',
};

export interface EmailSendResult {
  success: boolean;
  message?: string;
}

/**
 * Sends automated welcome and confirmation email to the enrolled student
 */
export async function sendStudentConfirmationEmail(
  data: RegistrationData,
  payment: PaymentResult,
  config: EmailJSConfig = defaultEmailJSConfig
): Promise<EmailSendResult> {
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    console.warn('[EmailJS] Configuration missing (serviceId / templateId / publicKey). Skipping live dispatch.');
    return {
      success: false,
      message: 'EmailJS credentials not configured yet in environment.',
    };
  }

  const payload = {
    service_id: config.serviceId,
    template_id: config.templateId,
    user_id: config.publicKey,
    template_params: {
      // Standard recipient aliases
      email: data.email,
      to_email: data.email,
      name: data.name,
      to_name: data.name,
      student_phone: data.phone,
      student_org: data.organization || 'Independent Engineer',
      
      // Order & Course details
      order_id: payment.transactionId || payment.orderId || `order_${Date.now()}`,
      payment_id: payment.transactionId || 'pay_demo',
      course_title: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass',
      course_dates: 'November 1st – November 6th, 2026',
      course_time: '5:00 PM – 6:30 PM IST Daily',
      amount_paid: '₹399',
      price: '399',
      units: '1',
      item: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass',
      cost: { shipping: '0.00', tax: '0.00' },
      orders: [
        {
          name: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass Pass',
          price: '399',
          units: '1'
        }
      ],
      company_name: 'AronLabz Tech Pvt Ltd',
      company_email: 'support@aronlabz.com',
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.info('[EmailJS] Confirmation email successfully dispatched to:', data.email);
      return { success: true };
    } else {
      const errText = await response.text();
      console.error('[EmailJS] Dispatch failed:', errText);
      return { success: false, message: errText };
    }
  } catch (err: any) {
    console.error('[EmailJS] Network error during dispatch:', err);
    return { success: false, message: err.message };
  }
}

