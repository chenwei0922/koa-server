import { Server as SocketIOServer } from 'socket.io';

export function setupWebRTCSignaling(server) {
  //创建Socket.IO服务器，附加到现有的HTTP服务器
  const io = new SocketIOServer(server, {
    // path: '/api/socket.io/',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })
  //webrtc 信令逻辑
  const rooms = new Map() //房间列表{roomId: Set<userId>}

  /**
   * socket 相关方法
   * socket.id: 用户唯一标识
   * socket.rooms: 用户加入的房间列表
   * socket.currentRoom: 用户当前所在的房间
   * socket.join(roomId | [roomId1, roomId2]): 用户加入房间
   * socket.leave(roomId | [roomId1, roomId2]): 用户离开房间
   * socket.to(roomId).emit(eventName, data): 向指定房间广播消息
   * socket.to(userId).emit(eventName, data): 向指定用户发送消息
   * socket.broadcast.emit(eventName, data): 向除自己外的所有用户广播消息
   * socket.emit(eventName, data): 向自己发送消息
   * socket.disconnect(): 用户断开连接
   * socket.on(eventName, callback): 监听事件
   * socket.off(eventName, callback): 取消监听事件
   * socket.removeAllListeners(eventName): 移除所有监听事件
   * socket.onAny(callback): 监听所有事件
   * socket.offAny(callback): 取消监听所有事件
   * socket.handshake: 客户端握手信息
   */
  io.on('connection', (socket) => {
    console.log('🔗 WebRTC 用户连接:', socket.id);
    console.log('socket=', Object.keys(socket));
   
    // 处理加入房间
    socket.on('join-room', (data) => {
      const { roomId, userId=socket.id } = data
      console.log(`🎪 用户 ${userId} 加入房间 ${roomId}`);
  
      //离开之前的所有房间
      if(socket.currentRoom){
        leaveRoom(socket, socket.currentRoom)
      }
  
      //加入新房间
      socket.join(roomId)
      socket.currentRoom = roomId
      
      //初始化房间信息
      if(!rooms.has(roomId)){
        rooms.set(roomId, new Set())
      }
      rooms.get(roomId).add(userId)
  
      //通知房间内其他用户
      socket.to(roomId).emit('user-connected', {userId, roomId})
  
      // 发送当前房间用户列表给新用户
      const users = Array.from(rooms.get(roomId)).filter(id => id !== userId);
      socket.emit('current-users', {
        roomId: roomId,
        users: users
      });
    });
  
    // 转发 WebRTC 信令
    socket.on('webrtc-offer', (data) => {
      const { targetUserId, offer, roomId } = data;
      
      console.log(`📨 Offer from ${socket.id} to ${targetUserId}`);
      
      socket.to(targetUserId).emit('webrtc-offer', {
        offer: offer,
        from: socket.id,
        roomId: roomId
      });
    });
  
    // WebRTC Answer
    socket.on('webrtc-answer', (data) => {
      const { targetUserId, answer, roomId } = data;
  
      console.log(`📨 Answer from ${socket.id} to ${targetUserId}`);
  
      socket.to(targetUserId).emit('webrtc-answer', {
        answer: answer,
        from: socket.id,
        roomId: roomId
      });
    })
  
    // WebRTC Candidate
    socket.on('webrtc-candidate', (data) => {
      const { targetUserId, candidate, roomId } = data;
  
      console.log(`📨 Candidate from ${socket.id} to ${targetUserId}`);
  
      socket.to(targetUserId).emit('webrtc-candidate', {
        candidate: candidate,
        from: socket.id,
        roomId: roomId
      });
    })
  
    //离开房间
    socket.on('leave-room', (data) => {
      const { roomId = socket.currentRoom } = data;
      if (roomId) {
        leaveRoom(socket, roomId);
      }
    })
  
    //断开连接
    socket.on('disconnect', () => {
      console.log(`🔗 WebRTC 用户断开连接: ${socket.id}`);
      if(socket.currentRoom){
        leaveRoom(socket, socket.currentRoom)
      }
    })
  
    //房间列表查询
    socket.on('get-rooms', () => {
      const roomList = Array.from(rooms.entries()).map(([roomId, users]) => ({
        roomId,
        userCount: users.size,
        users: Array.from(users)
      }));
      
      socket.emit('room-list', roomList);
    })
  })

  function leaveRoom(socket, roomId) {
    if(rooms.has(roomId)){
      const roomUsers = rooms.get(roomId)
      roomUsers.delete(socket.id) 

      //通知其他用户
      socket.to(roomId).emit('user-disconnected', {userId: socket.id, roomId})

      //清理空房间
      if(roomUsers.size === 0){
        rooms.delete(roomId)
        console.log(`🗑️ 清理空房间: ${roomId}`);
      }
      socket.leave(roomId)
      socket.currentRoom = null
      console.log(`🚪 用户 ${socket.id} 离开房间 ${roomId}`);
    }
  }
  return io
}