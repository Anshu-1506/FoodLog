const rateLimit = require('express-rate-limit');
const demoRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: {
    message: 'Demo limit reached — sign up for unlimited AI meal analysis.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = demoRateLimit;