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

  const orderId = payment.transactionId || payment.orderId || `ord_${Date.now()}`;
  const courseDates = 'November 1st – November 6th, 2026';
  const courseTime = '5:00 PM – 6:30 PM IST Daily';
  const whatsappUrl = 'https://chat.whatsapp.com/invite-placeholder';
  const calendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=ChatGPT+Astra+%2B+AI+Co-pilot+in+KiCad+Masterclass&dates=20261101T113000Z/20261101T130000Z&recur=RRULE:FREQ=DAILY;COUNT=6&details=Live+6-Day+Hardware+Masterclass+by+AronLabz+Tech+Pvt+Ltd.+Daily+at+5:00+PM+IST.&location=Online+Live+Stream';

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
      phone: data.phone,
      student_phone: data.phone,
      student_org: data.organization || 'Independent Engineer',
      organization: data.organization || 'Independent Engineer',
      
      // Order & Course details
      order_id: orderId,
      payment_id: payment.transactionId || orderId,
      course_title: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass',
      course_dates: courseDates,
      course_time: courseTime,
      amount_paid: '₹399.00',
      price: '399',
      units: '1',
      item: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass (6 Live Sessions)',
      
      // Legacy order template compatibility (so existing templates never crash)
      cost: {
        shipping: '0.00',
        tax: '0.00',
        total: '399.00',
      },
      orders: [
        {
          name: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass (6 Live Sessions)',
          price: '399',
          units: '1',
          image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
        },
      ],

      // Action links
      whatsapp_link: whatsappUrl,
      calendar_link: calendarUrl,
      course_url: 'https://emmibot123.github.io/pcbcourse/',

      // Company info
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
    return { success: false, message: err.message || 'Network request failed' };
  }
}
