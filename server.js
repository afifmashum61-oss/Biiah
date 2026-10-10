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
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

// In-Memory Duel Rooms Store for LAN / Classroom Multi-device Play
const inMemoryDuelRooms = new Map();

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

  // 1v1 Fast Duel Multiplayer API Endpoints (Local LAN / Multi-device Sync)
  if (req.url.startsWith('/api/duel')) {
    try {
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
      }

      const pathname = urlObj.pathname;

      // GET /api/duel/room?pin=1234
      if (req.method === 'GET' && pathname === '/api/duel/room') {
        const pin = String(urlObj.searchParams.get('pin') || '');
        const room = inMemoryDuelRooms.get(pin);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (room) {
          return res.end(JSON.stringify({ success: true, room }));
        } else {
          return res.end(JSON.stringify({ success: false, message: 'Room not found' }));
        }
      }

      // POST Endpoints
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = body ? JSON.parse(body) : {};
            const pin = String(data.pin || '');

            if (pathname === '/api/duel/create') {
              const newRoom = {
                pin,
                hostName: data.hostName || 'Siswa Host',
                hostClass: data.hostClass || 'IX-A',
                hostScore: 0,
                hostQ: 0,
                guestName: null,
                guestClass: null,
                guestScore: 0,
                guestQ: 0,
                setIdx: typeof data.setIdx === 'number' ? data.setIdx : 0,
                status: 'waiting',
                createdAtTime: Date.now(),
                updatedAtTime: Date.now()
              };
              inMemoryDuelRooms.set(pin, newRoom);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, room: newRoom }));
            }

            if (pathname === '/api/duel/join') {
              const room = inMemoryDuelRooms.get(pin);
              if (!room) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Kamar dengan PIN ' + pin + ' tidak ditemukan!' }));
              }
              room.guestName = data.guestName || 'Siswa Lawan';
              room.guestClass = data.guestClass || 'IX-A';
              room.status = 'playing';
              room.updatedAtTime = Date.now();
              inMemoryDuelRooms.set(pin, room);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, room }));
            }

            if (pathname === '/api/duel/update') {
              const room = inMemoryDuelRooms.get(pin);
              if (room) {
                if (data.isHost) {
                  if (typeof data.score === 'number') room.hostScore = data.score;
                  if (typeof data.currentQ === 'number') room.hostQ = data.currentQ;
                } else {
                  if (typeof data.score === 'number') room.guestScore = data.score;
                  if (typeof data.currentQ === 'number') room.guestQ = data.currentQ;
                }
                if (data.status) room.status = data.status;
                room.updatedAtTime = Date.now();
                inMemoryDuelRooms.set(pin, room);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, room }));
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Room not found' }));
              }
            }

            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, message: 'Endpoint not found' }));
          } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, message: 'Invalid JSON body' }));
          }
        });
        return;
      }
    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: err.message }));
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
