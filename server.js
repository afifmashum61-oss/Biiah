const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;
const HOST = '127.0.0.1';
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  // TTS Proxy Endpoint for authentic Arabic audio without Referer blocking
  if (req.url.startsWith('/api/tts')) {
    try {
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
      const q = urlObj.searchParams.get('q') || '';
      const lang = urlObj.searchParams.get('tl') || 'ar';
      if (!q.trim()) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing text parameter');
      }

      const cleanText = q.replace(/[•١٢٣\.\,\:\-\!\?]/g, ' ').trim();
      const chunk = cleanText.substring(0, 200);
      const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(chunk)}`;

      https.get(googleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      }, (ttsRes) => {
        if (ttsRes.statusCode === 200) {
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          });
          ttsRes.pipe(res);
        } else {
          res.writeHead(ttsRes.statusCode || 500, { 'Content-Type': 'text/plain' });
          res.end(`TTS Upstream Error: ${ttsRes.statusCode}`);
        }
      }).on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`TTS Proxy Error: ${err.message}`);
      });
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end(`Server Error: ${err.message}`);
    }
  }

  // Static File Serving
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
