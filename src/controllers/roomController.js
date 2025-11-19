
//获取房间列表
export const getRooms = async (ctx) => {
  ctx.body = {
    data: []
  }
}
//创建房间
export const createRoom = async (ctx) => {
  const {roomId} = ctx.request.body || {};
  ctx.body = {
    data: {
      roomId
    }
  }
}
//获取房间详情
export const getRoom = async (ctx) => {
  const {roomId} = ctx.params || {};
  
  ctx.body = {
    data: {
      roomId
    }
  }
}
