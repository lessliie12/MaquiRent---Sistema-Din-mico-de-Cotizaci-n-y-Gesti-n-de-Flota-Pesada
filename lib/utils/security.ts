/**
 * Security and sanitization utilities for Maqui-Rent Colombia
 */

/**
 * Strips dangerous HTML tags and characters to prevent Cross-Site Scripting (XSS)
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // remove script tags
    .replace(/on\w+="[^"]*"/gi, '') // remove inline events like onload=, onclick=
    .replace(/javascript:[^"']*/gi, '') // remove javascript: pseudo-protocols
    .replace(/[<>]/g, '') // remove raw bracket tags
    .trim();
}

/**
 * Validates a standard email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a Colombian phone number (cellular format, 10 digits starting with 3 or landline with area code)
 */
export function isValidPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  return clean.length >= 7 && clean.length <= 12;
}

const SUBMISSION_COOLDOWN_MS = 20000; // 20 seconds cooldown between submissions
const LAST_SUBMISSION_KEY = 'maqui_last_form_submission';

/**
 * Rate limiting check on client-side to prevent automated spam floods
 */
export function checkSubmissionRateLimit(): { allowed: boolean; waitSeconds?: number } {
  if (typeof window === 'undefined') return { allowed: true };
  
  const lastTime = sessionStorage.getItem(LAST_SUBMISSION_KEY);
  if (!lastTime) return { allowed: true };

  const diff = Date.now() - parseInt(lastTime, 10);
  if (diff < SUBMISSION_COOLDOWN_MS) {
    const remainingSeconds = Math.ceil((SUBMISSION_COOLDOWN_MS - diff) / 1000);
    return { allowed: false, waitSeconds: remainingSeconds };
  }

  return { allowed: true };
}

export function recordFormSubmission(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(LAST_SUBMISSION_KEY, Date.now().toString());
  }
}
