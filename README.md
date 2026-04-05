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

Send POST requests to `/graphql/:user` with the GraphQL query in the request body. The server will check that the request originates from the allowed client (specified in env secrets) and then forward it to the Digitransit API.

Example:

```javascript
fetch("https://your-render-app.onrender.com/graphql/someuser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `{
      stops {
        name
      }
    }`,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```
