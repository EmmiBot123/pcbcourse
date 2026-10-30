import { RegistrationData } from '../types';

/**
 * Razorpay Payment Gateway Service
 * Company: AronLabz Tech Pvt Ltd
 * Product: ChatGPT Astra + AI Co-pilot in KiCad (₹399 Masterclass)
 */

export interface RazorpayConfig {
  keyId: string;
  currency: string;
  amount: number; // in INR (₹399)
}

export const defaultRazorpayConfig: RazorpayConfig = {
  keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Tu1mspEp8uQLFq',
  currency: 'INR',
  amount: 399,
};

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  orderId?: string;
  paymentMethod?: string;
  error?: string;
  timestamp: string;
}

// Dynamically load official Razorpay checkout script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const src = 'https://checkout.razorpay.com/v1/checkout.js';
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Process Razorpay Checkout
 * Opens the native Razorpay modal for UPI, Cards, NetBanking, and Wallets
 */
export async function processRazorpayPayment(
  data: RegistrationData,
  config: RazorpayConfig = defaultRazorpayConfig
): Promise<PaymentResult> {
  const amountInPaise = config.amount * 100;

  // If Razorpay Key is provided in environment, launch Razorpay Checkout.js
  if (config.keyId) {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load. Please verify your network connection.');
    }

    return new Promise((resolve) => {
      const options = {
        key: config.keyId,
        amount: amountInPaise,
        currency: config.currency,
        name: 'AronLabz Tech Pvt Ltd',
        description: 'ChatGPT Astra + AI Co-pilot in KiCad Masterclass',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          organization: data.organization || 'Individual',
          experienceLevel: data.experienceLevel,
          course: 'KiCad Astra AI Masterclass',
          company: 'AronLabz Tech Pvt Ltd',
        },
        theme: {
          color: '#2563eb', // AronLabz Precision Cobalt brand color
          backdrop_color: 'rgba(15, 23, 42, 0.85)',
        },
        handler: function (response: any) {
          const result: PaymentResult = {
            success: true,
            transactionId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || `order_ALZ_${Date.now()}`,
            paymentMethod: 'Razorpay',
            timestamp: new Date().toISOString(),
          };
          saveEnrollment(data, result, config.amount);
          resolve(result);
        },
        modal: {
          ondismiss: function () {
            resolve({
              success: false,
              error: 'Razorpay payment was cancelled by user.',
              timestamp: new Date().toISOString(),
            });
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        resolve({
          success: false,
          error: response.error?.description || 'Razorpay transaction failed.',
          timestamp: new Date().toISOString(),
        });
      });
      rzp.open();
    });
  }

  // Fallback Sandbox Simulation if VITE_RAZORPAY_KEY_ID is not configured yet
  // Simulates the exact Razorpay payment verification response
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const mockPaymentId = `pay_rzp_${Math.random().toString(36).substring(2, 11)}_${Date.now().toString().slice(-4)}`;
  const mockOrderId = `order_rzp_${Date.now().toString().slice(-6)}`;

  const result: PaymentResult = {
    success: true,
    transactionId: mockPaymentId,
    orderId: mockOrderId,
    paymentMethod: 'Razorpay (UPI / Card / NetBanking)',
    timestamp: new Date().toISOString(),
  };

  saveEnrollment(data, result, config.amount);
  return result;
}

function saveEnrollment(data: RegistrationData, result: PaymentResult, amount: number) {
  try {
    const existing = JSON.parse(localStorage.getItem('aronlabz_enrollments') || '[]');
    existing.push({
      ...data,
      transactionId: result.transactionId,
      orderId: result.orderId,
      amount: amount,
      currency: 'INR',
      timestamp: result.timestamp,
      company: 'AronLabz Tech Pvt Ltd',
    });
    localStorage.setItem('aronlabz_enrollments', JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not persist registration locally', err);
  }
}
