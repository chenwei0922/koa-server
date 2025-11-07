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

## 部署到 Vercel

项目已配置为支持 Vercel serverless 部署。

### 部署步骤：

1. **安装 Vercel CLI**（如果还没有）：
```bash
npm i -g vercel
```

2. **登录 Vercel**：
```bash
vercel login
```

3. **在项目根目录部署**：
```bash
vercel
```

4. **设置环境变量**：
在 Vercel 项目设置中添加以下环境变量：
- `MONGODB_URI` - MongoDB 连接字符串（例如：`mongodb+srv://user:password@cluster.mongodb.net/dbname`）
- `JWT_SECRET` - JWT 密钥（用于 token 签名）

5. **生产环境部署**：
```bash
vercel --prod
```

### 注意事项：

- 确保使用云 MongoDB（如 MongoDB Atlas），而不是本地 MongoDB
- 数据库连接已优化为 serverless 环境，会自动重用连接
- 所有路由都会通过 `/api/*` 路径访问