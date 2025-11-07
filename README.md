## 配置MongoDB

```
https://www.mongodb.com/try/download/enterprise

手动将内容 copy /usr/local/mongdb
配置变量： export PATH=$PATH:/usr/local/mongodb-6.0.26/bin
验证： mongod -version

启动: mongod --dbpath <path>
比如：mongod --dbpath /Users/chen/working/chen/react-next-app/koa-server/src/config
浏览器访问：http://localhost:27017/
看到：It looks like you are trying to access MongoDB over HTTP on the native driver port. 
即表示成功
```

## Koa 电商后端 (新)
位于 `koa-server/`。提供基础接口：`/api/auth`、`/api/products`、`/api/orders`、`/api/users`。

运行步骤：

```bash
cd koa-server
# 安装依赖（推荐 pnpm）
pnpm install

# 设置环境变量（创建 .env 文件）
# MONGODB_URI=mongodb://localhost:27017/koa_ecommerce
# JWT_SECRET=your_secure_secret
# PORT=5050

# 启动开发服务
pnpm dev
# 或生产模式
pnpm start
```

基础接口：
- POST `/api/auth/register` 注册
- POST `/api/auth/login` 登录
- GET `/api/products` 列表；GET `/api/products/:id` 详情
- 需要登录：
  - POST `/api/products` 新建商品；PUT/DELETE `/api/products/:id`
  - POST `/api/orders` 下单；GET `/api/orders/mine` 我的订单；GET `/api/orders/:id` 订单详情
  - GET `/api/users/me` 个人信息