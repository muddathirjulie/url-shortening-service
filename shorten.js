const crypto = require('crypto');
const { getOriginalUrl } = require('./db');

async function generateShortUrl(originalUrl) {
  const hash = crypto.createHash('sha256');
  hash.update(originalUrl);
  const shortUrl = hash.digest('hex').substring(0, 6);

  const existingUrl = await getOriginalUrl(shortUrl);
  if (existingUrl) {
    return generateShortUrl(originalUrl); // Retry if collision occurs
  }

  return shortUrl;
}

module.exports = {
  generateShortUrl
};
