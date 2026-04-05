# Digitransit API Proxy

A simple Node.js backend to proxy GraphQL requests to the Digitransit API without exposing the API key to the client.

## Setup

1. Clone or download this repository.
2. Run `npm install` to install dependencies.
3. Set the environment variable `DIGITRANSIT_API_KEY` to your Digitransit API key (if required).
4. Run `npm start` to start the server locally.

## Deployment to Heroku

1. Create a new Heroku app.
2. Set the `DIGITRANSIT_API_KEY` environment variable in Heroku (if required).
3. Deploy the code to Heroku (using Git or Heroku CLI).

## Usage

Send POST requests to `/graphql` with the GraphQL query in the request body. The server will forward the request to the Digitransit API and return the response.

Example:

```javascript
fetch('https://your-heroku-app.herokuapp.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: `{
      stops {
        name
      }
    }`
  })
})
.then(response => response.json())
.then(data => console.log(data));
```