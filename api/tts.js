const https = require('https');

module.exports = (req, res) => {
  return new Promise((resolve) => {
    try {
      let q = '';
      let lang = 'ar';

      if (req.query && req.query.q) {
        q = req.query.q;
        lang = req.query.tl || 'ar';
      } else if (req.url) {
        try {
          const u = new URL(req.url, 'http://localhost');
          q = u.searchParams.get('q') || '';
          lang = u.searchParams.get('tl') || 'ar';
        } catch (e) {}
      }

      if (!q || !q.trim()) {
        res.status(400).send('Missing text parameter');
        return resolve();
      }

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
          const data = [];
          ttsRes.on('data', c => data.push(c));
          ttsRes.on('end', () => {
            const buffer = Buffer.concat(data);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Length', buffer.length);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(buffer);
            resolve();
          });
          ttsRes.on('error', (err) => {
            res.status(500).send(`Stream Error: ${err.message}`);
            resolve();
          });
        } else {
          res.status(ttsRes.statusCode || 500).send(`TTS Upstream Error: ${ttsRes.statusCode}`);
          resolve();
        }
      }).on('error', (err) => {
        res.status(500).send(`TTS Proxy Error: ${err.message}`);
        resolve();
      });
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
      resolve();
    }
  });
};
