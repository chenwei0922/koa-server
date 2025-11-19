import { setupWebRTCSignaling } from "../src/socket/signaling";

export default function handler(req, res) {
  if(!res.socket.server.io) {
    console.log('🚀 初始化 Socket.IO 服务器');
    // 在 Vercel 中，我们需要手动创建 HTTP 服务器
    const httpServer = res.socket.server;
    const io = setupWebRTCSignaling(httpServer);
    res.socket.server.io = io

    // 设置服务器关闭时的清理
    res.socket.server.on('close', () => {
      console.log('🔒 关闭 WebRTC 信令服务');
      io.close();
    });
    return res.end('ok')
  }
  // Socket.IO 会自动处理后续请求
  res.end('WebRTC signaling server is running');
}