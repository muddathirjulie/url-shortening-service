const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./urls.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY AUTOINCREMENT, original_url TEXT, shortened_url TEXT)");
});

function saveUrl(originalUrl, shortUrl, callback) {
  db.run("INSERT INTO urls (original_url, shortened_url) VALUES (?, ?)", [originalUrl, shortUrl], function(err) {
    if (err) {
      console.error("Error saving URL:", err);
      callback(err);
    } else {
      console.log("URL saved successfully:", originalUrl, "->", shortUrl);
      callback(null);
    }
  });
}

function getOriginalUrl(shortUrl, callback) {
  // Ignore favicon requests
  if (shortUrl === 'favicon.ico') return callback(null, null);

  db.get("SELECT original_url FROM urls WHERE shortened_url = ?", [shortUrl], (err, row) => {
    if (err) {
      console.error("Error retrieving URL:", err);
      callback(err, null);
    } else if (row) {
      callback(null, row.original_url);
    } else {
      console.log("Short URL not found:", shortUrl);
      callback(null, null);
    }
  });
}

module.exports = {
  saveUrl,
  getOriginalUrl
};
