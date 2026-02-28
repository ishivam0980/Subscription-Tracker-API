import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes in milliseconds
  max: 10,                    // max 10 requests per windowMs per IP
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes'
  }
});


export default authLimiter