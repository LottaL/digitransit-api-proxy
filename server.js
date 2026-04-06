const express = require('express');
const cors = require('cors');

(async () => {
  const fetch = (await import('node-fetch')).default;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.post('/graphql', async (req, res) => {
    // Check if the request is from the allowed client
    const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'; // Set your allowed origin here
    if (req.headers.origin !== allowedOrigin) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    try {
      const response = await fetch('https://api.digitransit.fi/routing/v2/hsl/gtfs/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'digitransit-subscription-key': process.env.DIGITRANSIT_API_KEY || '' // Add your API key here if not using env var
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error proxying request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();