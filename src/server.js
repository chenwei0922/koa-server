import 'dotenv/config';
import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 5050;

const server = http.createServer(app.callback());

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Koa server running on port ${PORT}`);
});


