const { expect } = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');

chai.use(chaiHttp);

describe('API Endpoints', () => {
  // Test cases for API endpoints
  it('should respond with a shortened URL when posting to /shorten', (done) => {
    // Test POST /shorten endpoint
    chai.request(app)
      .post('/shorten')
      .send({ originalUrl: 'http://example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('shortUrl');
        done();
      });
  });

  it('should redirect to the original URL when accessing a shortened URL', (done) => {
    // Test GET /:shortUrl endpoint
    chai.request(app)
      .get('/shortened-url')
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.redirectTo('http://example.com');
        done();
      });
  });

  // Test cases for error handling
  it('should handle errors when posting to /shorten with invalid input', (done) => {
    // Test error handling for invalid input to /shorten endpoint
    chai.request(app)
      .post('/shorten')
      .send({ originalUrl: 'invalid-url' }) // Sending an invalid URL
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle errors when accessing a non-existent shortened URL', (done) => {
    // Test error handling for accessing a non-existent shortened URL
    chai.request(app)
      .get('/non-existent-short-url')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
