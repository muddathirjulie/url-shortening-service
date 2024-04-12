How to Set Up and Run the Project
Clone this repository to your local machine:

git clone https://github.com/your-username/url-shortening-service.git
Navigate to the project directory:

cd url-shortening-service

Install dependencies:
npm install

Start the server:
npm start
The server will start running on http://localhost:3000.

How to Use the API
Shorten a URL:
Endpoint: POST /shorten
Request Body: JSON object with the original URL.
Response: JSON object with the shortened URL.
Redirect to the Original URL:

Endpoint: GET /:shortUrl
Accessing the shortened URL will redirect you to the original URL.
