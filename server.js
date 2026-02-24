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
    console.log("Error: No query provided.");
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  console.log(`Received search query: ${query}`);

  const url = `${DDG_API_URL}?q=${encodeURIComponent(query)}&format=json&no_html=1&pretty=1`;

  try {
    console.log(`Making request to DuckDuckGo API with URL: ${url}`);
    const response = await axios.get(url);

    // Log the full response data
    console.log("DuckDuckGo API Response: ", response.data);

    if (response.data && response.data.RelatedTopics) {
      console.log(`Found ${response.data.RelatedTopics.length} related topics.`);
    } else {
      console.log("No related topics found in response.");
    }

    res.json(response.data);  // Send response back to the frontend
  } catch (error) {
    console.error("Error fetching results from DuckDuckGo:", error.message);
    res.status(500).json({ error: 'Error fetching results from DuckDuckGo' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
