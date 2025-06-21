const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
  const streamUrl = req.query.url;

  if (!streamUrl) {
    return res.status(400).send('Missing url query parameter');
  }

  const headers = {
    'Referer': 'https://pl.buzkora.online',
    'Origin': 'https://pl.buzkora.online',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
  };

  request({ url: streamUrl, headers }).on('error', (err) => {
    res.status(500).send('Error fetching stream');
  }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Proxy server running on port ${PORT});
});