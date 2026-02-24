const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// DuckDuckGo Instant Answer API endpoint
const DDG_API_URL = 'https://api.duckduckgo.com/';

// Search endpoint
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const response = await axios.get(DDG_API_URL, {
      params: {
        q: query,
        format: 'json',
        no_html: 1,
        pretty: 1,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching results from DuckDuckGo' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
