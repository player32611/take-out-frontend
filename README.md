# take-out-frontend

外卖管理系统前端，基于 Next.js 构建的餐饮企业管理后台，提供员工管理、菜品管理、分类管理、套餐管理、订单处理、数据报表与工作台概览等功能。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 组件库**: Ant Design 6 + @ant-design/icons
- **语言**: TypeScript 5
- **HTTP 请求**: Axios
- **图表**: ECharts 6
- **日期处理**: dayjs
- **样式方案**: SCSS Modules
- **实时通信**: WebSocket

## 项目结构

```
take-out-frontend/
├── app/                        # 页面路由 (App Router)
│   ├── (auth)/                 # 认证路由组
│   │   └── login/              # 登录页
│   └── (home)/                 # 主页路由组（含布局）
│       ├── layout.tsx          # 主页布局（WebSocket 通知 + 侧边栏 + 顶栏）
│       ├── page.tsx            # 工作台首页
│       ├── category/           # 分类管理页
│       ├── dish/               # 菜品管理页
│       ├── employee/           # 员工管理页
│       ├── order/              # 订单管理页
│       ├── report/             # 数据报表页
│       └── setmeal/            # 套餐管理页
├── components/                 # 可复用组件
│   ├── category/               # 分类相关组件
│   ├── dish/                   # 菜品相关组件
│   ├── employee/               # 员工相关组件
│   ├── home/                   # 主页布局组件（Header / Sider / SetModal）
│   ├── login/                  # 登录表单组件
│   ├── order/                  # 订单相关组件
│   ├── provider/               # 全局 Provider（Antd 配置、路由注入）
│   ├── report/                 # 报表相关组件（图表）
│   ├── setmeal/                # 套餐相关组件
│   └── workspace/              # 工作台概览组件
├── hooks/                      # 自定义 Hooks
│   └── useWebSocket.ts         # WebSocket Hook（自动连接/重连/消息管理）
├── lib/                        # 工具库
│   ├── auth.ts                 # Token 管理（localStorage）
│   ├── constants.ts            # 常量定义（状态枚举、口味选项等）
│   └── file.ts                 # 文件上传工具
├── services/                   # API 服务层
│   ├── axios.ts                # Axios 实例（拦截器、Token 注入、错误处理）
│   ├── categoryService.ts      # 分类相关 API
│   ├── commonService.ts        # 通用 API（文件上传）
│   ├── dishService.ts          # 菜品相关 API
│   ├── employeeService.ts      # 员工相关 API
│   ├── orderService.ts         # 订单相关 API
│   ├── reportService.ts        # 报表相关 API
│   ├── setmealService.ts       # 套餐相关 API
│   ├── shopService.ts          # 店铺状态 API
│   ├── websocketClient.ts      # WebSocket 客户端类
│   └── workspaceService.ts     # 工作台数据 API
├── types/                      # TypeScript 类型定义
│   ├── common.ts               # 通用业务模型
│   ├── components.ts           # 组件 Props 类型
│   ├── services.ts             # API 请求/响应参数类型
│   └── hook.ts                 # Hook 参数类型
└── .env.local                  # 环境变量（API 地址）
```

## 功能模块

### 1. 登录认证
- 员工账号密码登录
- Token 持久化存储，自动注入请求头
- 401 自动跳转登录页

### 2. 工作台
- 营业数据概览（营业额、订单量、新用户数、客单价）
- 订单状态看板（待接单、待配送、配送中、已完成、已取消）
- 菜品/套餐在售与停售数量

### 3. 店铺管理
- 查看/切换店铺营业状态（营业中 / 打烊）
- 营业状态通过 WebSocket 实时推送通知

### 4. 分类管理
- 菜品分类和套餐分类的增删改查
- 分页查询、按名称/类型筛选
- 启售/停售状态切换

### 5. 菜品管理
- 菜品的增删改查
- 菜品图片上传
- 口味配置（甜味、温度、忌口、辣度）
- 分页查询、按分类/名称/状态筛选

### 6. 套餐管理
- 套餐的增删改查
- 套餐包含菜品明细管理
- 套餐图片上传
- 分页查询、按分类/名称/状态筛选

### 7. 员工管理
- 员工的增删改查
- 账号启用/禁用
- 分页查询、按姓名搜索

### 8. 订单管理
- 订单状态 tabs 切换（待确认、已确认、配送中、已完成、已取消）
- 订单查询（按订单号/手机号/时间范围）
- 订单详情查看
- 接单、拒单、派送、完成、取消订单操作
- 实时 WebSocket 推送新订单和催单通知

### 9. 数据报表
- 时间范围选择（昨日 / 近7日 / 近30日 / 本周 / 本月）
- 营业额趋势图
- 用户增长趋势图
- 订单统计（总订单、有效订单、订单完成率）
- 销量 Top10 排行
- Excel 报表导出

## 快速开始

### 环境要求

- Node.js >= 18
- yarn / npm / pnpm

### 安装

```bash
yarn install
```

### 配置环境变量

创建 `.env.local` 文件（已提供示例）：

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 启动开发服务器

```bash
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
yarn build
yarn start
```

## API 设计

项目采用 RESTful API 风格，所有接口以 `/admin/` 为前缀。请求头自动注入 `token` 参数进行鉴权。

通用响应格式：

```typescript
interface Response<T = unknown> {
  code: number;
  data: T;
  msg: string;
}
```

分页接口统一返回：

```typescript
interface PageResult<T = unknown> {
  total: number;
  records: T[];
}
```

## 实时通信

项目使用 WebSocket 实现订单实时推送：
- 新订单提醒（待接单通知）
- 用户催单提醒
- 支持自动重连（最多 5 次，间隔 3 秒）

## 样式约定

- 使用 SCSS Modules 进行样式隔离
- 全局样式在 `app/globals.scss` 中定义
- 组件级样式与页面文件同级放置 `*.module.scss`