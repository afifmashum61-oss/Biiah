const https = require('https');

module.exports = (req, res) => {
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'biiah.vercel.app';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const urlObj = new URL(req.url, `${proto}://${host}`);
    const q = urlObj.searchParams.get('q') || (req.query && req.query.q) || '';
    const lang = urlObj.searchParams.get('tl') || (req.query && req.query.tl) || 'ar';

    if (!q || !q.trim()) {
      if (res.status) {
        return res.status(400).send('Missing text parameter');
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing text parameter');
      }
    }

    // Clean text for Google TTS without breaking Arabic diacritics
    const cleanText = q.replace(/[\u060C\u061F\.\,\:\-\!\?]/g, ' ').trim();
    const chunk = cleanText.substring(0, 200);
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(chunk)}`;

    https.get(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (ttsRes) => {
      if (ttsRes.statusCode === 200) {
        if (res.setHeader) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('Access-Control-Allow-Origin', '*');
          if (res.status) res.status(200);
          else res.writeHead(200);
        } else {
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*'
          });
        }
        ttsRes.pipe(res);
      } else {
        if (res.status) {
          res.status(ttsRes.statusCode || 500).send(`TTS Upstream Error: ${ttsRes.statusCode}`);
        } else {
          res.writeHead(ttsRes.statusCode || 500, { 'Content-Type': 'text/plain' });
          res.end(`TTS Upstream Error: ${ttsRes.statusCode}`);
        }
      }
    }).on('error', (err) => {
      if (res.status) {
        res.status(500).send(`TTS Proxy Error: ${err.message}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`TTS Proxy Error: ${err.message}`);
      }
    });
  } catch (err) {
    if (res.status) {
      res.status(500).send(`Server Error: ${err.message}`);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.message}`);
    }
  }
};
