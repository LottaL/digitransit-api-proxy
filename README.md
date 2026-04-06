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

### Environment Variables

The app uses publicly available API. The Digitransit API **requires authentication** and needs to be proxied to hide the API key:

- **Digitransit API Key** (Required): `DIGITRANSIT_API_KEY`
  - Register at https://portal-api.digitransit.fi/
  - Add to `.env.local`: `DIGITRANSIT_API_KEY=your_key_here`
  - See [DIGITRANSIT_API_KEY.md](DIGITRANSIT_API_KEY.md) for detailed instructions
- **Allowed origin** (Required):
  - Client that is allowed to consume this proxy
  - This is to avoid overusing the free, personal-project API key

### Digitransit Router

This proxy uses the HSL routing API. Other APIs available for example:

- HSL (Helsinki): `https://api.digitransit.fi/routing/v2/hsl/gtfs/v1`
- Waltti (Other Finnish cities): `https://api.digitransit.fi/routing/v2/waltti/gtfs/v1`
- Finland (Nationwide): `https://api.digitransit.fi/routing/v2/finland/gtfs/v1`
