import { rateLimit } from 'express-rate-limit';

/**
 * Strict Rate Limiter for Authentication / Login endpoints
 * Protects against brute-force and credential stuffing attacks.
 * Allows 10 attempts per 15-minute window per IP.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
    status: 429,
  },
});

/**
 * Rate Limiter for Public Leads / Inquiries & Contact Forms
 * Prevents automated bot spam while allowing genuine users to submit multiple inquiries.
 */
export const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 POST inquiries per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: (req) => req.method !== 'POST',
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP. Please wait a few minutes before submitting another.',
    status: 429,
  },
});

/**
 * General API Limiter
 * Provides DDoS and abusive traffic protection across all standard routes.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
