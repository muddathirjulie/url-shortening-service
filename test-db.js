const { expect } = require('chai');
const { saveUrl, getOriginalUrl } = require('../src/database');

describe('Database Operations', () => {
  // Existing test case
  it('should save and retrieve URLs from the database', () => {
    // Test saving and retrieving URLs
    const originalUrl = 'http://example.com';
    const shortUrl = 'abcdef';
    saveUrl(originalUrl, shortUrl);

    const retrievedUrl = getOriginalUrl(shortUrl);
    expect(retrievedUrl).to.equal(originalUrl);
  });

  // New test cases for error handling
  it('should handle errors when saving URLs to the database', () => {
    // Test error handling when saving URLs
    const originalUrl = 'http://example.com';
    const shortUrl = 'abcdef';
  
    // Simulate an error by passing invalid arguments to saveUrl
    saveUrl(null, shortUrl, (err) => {
      expect(err).to.exist;
    });
  });

  it('should handle errors when retrieving URLs from the database', () => {
    // Test error handling when retrieving URLs
    const shortUrl = 'nonexistent';
  
    // Simulate an error by passing an invalid short URL to getOriginalUrl
    getOriginalUrl(shortUrl, (err, result) => {
      expect(err).to.exist;
      expect(result).to.be.null;
    });
  });
});
