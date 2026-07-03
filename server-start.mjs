import http from 'http';
import { pipeline } from 'stream';

import serverModule from './dist/server/server.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handler(req, res) {
  try {
    const url = `http://${req.headers.host || `localhost:${PORT}`}${req.url}`;
    const init = { method: req.method, headers: req.headers };
    const body = await getRawBody(req);
    const request = new Request(url, { ...init, body: body.length ? body : undefined });

    const response = await serverModule.fetch(request, {}, {});

    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('Server error');
  }
}

const server = http.createServer(handler);
server.listen(PORT, () => console.log(`SSR server listening on http://localhost:${PORT}`));

export default server;
