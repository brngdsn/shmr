#!/usr/bin/env node

// server.js
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { WebSocketServer } from 'ws';

// HMR client-side script to be injected
const hmrClientScript = `
<script type="module">
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const socket = new WebSocket(\`\${protocol}://\${location.host}\`);
  socket.addEventListener('message', (event) => {
    if (event.data === 'reload') {
      console.clear();
      location.reload();
    }
  });
</script>
`;

// Create an HTTP server to serve static files
const server = http.createServer(async (req, res) => {
  let filePath = '.' + decodeURI(req.url);
  if (filePath === './') filePath = './index.html';

  try {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js':   'text/javascript',
      '.css':  'text/css',
      '.json': 'application/json',
      '.png':  'image/png',
      '.jpg':  'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif':  'image/gif',
      '.svg':  'image/svg+xml',
      '.ico':  'image/x-icon',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    let data;
    if (['.html', '.css', '.js', '.json', '.svg'].includes(ext)) {
      // Read as text for text files
      data = await fs.promises.readFile(filePath, 'utf-8');
      if (ext === '.html') {
        // Inject the HMR client script before the closing </body> tag
        data = data.replace('</body>', `${hmrClientScript}</body>`);
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data, 'utf-8');
    } else {
      // Read as binary for other files (e.g., images)
      data = await fs.promises.readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  } catch (err) {
    console.error(err);
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

// Start the HTTP server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Set up the WebSocket server
const wss = new WebSocketServer({ server });

// Function to broadcast messages to all connected clients
const broadcast = (message) => {
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  }
};

// Watch for file changes in the current directory recursively
fs.watch('.', { recursive: true }, (eventType, filename) => {
  if (filename && !filename.startsWith('.')) {
    console.log(`File changed: ${filename}`);
    broadcast('reload');
  }
});


