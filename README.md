# 告别宣言 | FAREWELL PROCLAMATION 官方网站

一个具有 18trip.jp 风格的单页滚动乐队网站，包含乐队介绍、成员横向轮播、音乐作品、活动/演出、留言板和联系方式。

## 技术栈

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS 4**
- **GSAP + ScrollTrigger** — 滚动触发动画
- **Lenis** — 平滑滚动
- **Framer Motion** — 组件动画
- **Embla Carousel** — 成员横向轮播
- **Prisma 6 + SQLite** — 数据存储
- **Resend** — 邮件通知

## 功能

- 单页长滚动，顶部固定导航锚点跳转
- 每个 section 进入视口时的滚动触发动画
- 成员介绍横向轮播（BACK / NEXT / 指示器 / 拖拽）
- 留言板（仅内部查看）
- 联系方式表单
- 表单提交后自动发送邮件通知

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填写 RESEND_API_KEY 和 RESEND_TO_EMAIL

# 初始化数据库
npx prisma migrate dev
npx prisma generate

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000。

## 数据库

默认使用 SQLite 本地文件 `prisma/dev.db`。生产环境建议迁移到 PostgreSQL（如 Vercel Postgres、Neon 或 Railway）。

## 邮件配置

在 `.env` 中填入：

```env
RESEND_API_KEY="re_xxxxxxxx"
RESEND_TO_EMAIL="your_email@example.com"
```

> Resend 免费额度足够个人网站使用。发送域名需先在 Resend 控制台验证。

## 自定义内容

乐队名称、成员、新闻、音乐、演出等内容都在 `src/content/band.ts` 中修改。

## 部署

推荐部署到 **Vercel**：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（DATABASE_URL、RESEND_API_KEY、RESEND_TO_EMAIL）
4. 部署

> 注意：Vercel 的 Serverless 环境默认无法持久化 SQLite 文件。生产环境请使用 PostgreSQL 数据库。

## 项目结构

```
src/
  app/
    api/
      guestbook/     # 留言板 API
      contact/       # 联系方式 API
    page.tsx         # 首页（单页所有 section）
    layout.tsx       # 根布局
  components/
    sections/        # 页面各区块
    ui/              # 导航、平滑滚动、轮播、动画等
  lib/               # Prisma、Resend、工具函数
  content/           # 乐队内容数据
prisma/              # 数据库 schema 和迁移
```

## 许可证

MIT
