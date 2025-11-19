import Router from 'koa-router';
import { getRooms, createRoom, getRoom } from '../../controllers/roomController.js';

const router = new Router({ prefix: '/webrtc' });

//获取房间列表
router.get('/rooms', getRooms);
//创建房间
router.post('/rooms', createRoom);
//获取房间详情
router.get('/rooms/:roomId', getRoom);

export default router;


