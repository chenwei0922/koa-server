import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { setupWebRTCSignaling } from './socket/signaling.js';

const PORT = process.env.PORT || 5050;

//创建 http 服务器
const server = http.createServer(app.callback());
//设置webrtc信令
const io = setupWebRTCSignaling(server);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Koa server running on port ${PORT}`);
  console.log(`🔗 WebRTC 信令服务已启用`);
  console.log(`📊 Socket.IO 路径: /socket.io/`);
});

export {server, io}
