# 告别宣言乐队官网 - 开发文档

## 项目概述

一个单页滚动风格的乐队官方网站，灵感来自 18trip.jp 的强视觉叙事风格。网站包含乐队介绍、成员轮播、音乐作品、活动演出、留言板和联系方式等模块。

## 技术栈

- **框架**: Next.js 16.2.11 + React 19.2.4 + TypeScript 5
- **路由**: App Router
- **样式**: Tailwind CSS v4
- **动画**: GSAP + ScrollTrigger + Framer Motion + Lenis 平滑滚动
- **轮播**: Embla Carousel
- **数据库**: Prisma 6 + SQLite（本地开发）
- **邮件**: Resend
- **校验**: Zod

## 目录结构

```
band-website/
├── docx/                         # 本文档
├── prisma/
│   ├── schema.prisma             # 数据库模型
│   └── dev.db                    # SQLite 数据文件（未 gitignore，谨慎提交）
├── public/                       # 静态资源
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts  # 联系表单 API
│   │   │   └── guestbook/route.ts # 留言板 API
│   │   ├── members/[id]/page.tsx # 成员详情页
│   │   ├── globals.css           # Tailwind v4 主题与全局样式
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 首页（单页所有 section）
│   ├── components/
│   │   ├── sections/             # 页面区块组件
│   │   │   ├── Hero.tsx          # 首页 hero / logo
│   │   │   ├── News.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Members.tsx
│   │   │   ├── Music.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Guestbook.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/                   # 通用 UI 组件
│   │       ├── Navigation.tsx
│   │       ├── MemberCarousel.tsx
│   │       ├── SectionReveal.tsx
│   │       ├── SmoothScrollProvider.tsx
│   │       └── Footer.tsx
│   ├── content/
│   │   └── band.ts               # 乐队内容数据（可编辑）
│   └── lib/
│       ├── prisma.ts             # Prisma 单例
│       ├── resend.ts             # 邮件发送
│       └── utils.ts              # cn 工具函数
├── .env.example                  # 环境变量模板
├── next.config.ts
├── prisma.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

## 最近开发改动

### 1. 成员详情页

- 新增动态路由 `/members/[id]`，例如 `/members/tianjiu`
- 为每位成员生成独立页面（`generateStaticParams`）
- 详情页展示：头像首字、角色、代表色、简介、返回按钮
- 卡片点击入口：Members 区域轮播卡片底部“查看详情”按钮

### 2. 黑 + 薄荷绿主题

- 主题色 `accent` 从米金 `#e8d5b7` 改为薄荷绿 `#3dd9c0`
- 次主题色 `accent-2` 改为 `#2ab598`
- 所有组件中的米金/古铜色硬编码均替换为薄荷绿系
- 六位成员代表色统一为薄荷绿不同深浅
- 首页 Hero 采用薄荷绿径向光晕 + 中央 logo 式设计

## 常用命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build

# 启动生产服务
npm run start

# 代码检查
npm run lint

# 数据库迁移（首次或 schema 变更后）
npx prisma migrate dev

# 重新生成 Prisma Client
npx prisma generate
```

## 数据库模型

```prisma
model GuestbookEntry {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  isPublic  Boolean  @default(false)
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  createdAt DateTime @default(now())
}
```

## API 路由

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/contact` | 提交联系表单，保存并发送邮件通知 |
| POST | `/api/guestbook` | 提交留言，默认 `isPublic=false`（仅内部查看） |

## 环境变量

复制 `.env.example` 为 `.env`：

```env
DATABASE_URL="file:C:/Users/28211/band-website/prisma/dev.db"
RESEND_API_KEY="your_resend_api_key"
RESEND_TO_EMAIL="your_email@example.com"
```

- `RESEND_API_KEY` 和 `RESEND_TO_EMAIL` 本地可选，未配置时只会跳过邮件发送并打印 warning
- `prisma.config.ts` 已导入 `dotenv/config`，Prisma CLI 会自动读取 `.env`
- `prisma/dev.db` 不在 `.gitignore` 中，**不要提交本地 SQLite 数据**

## 样式约定

- Tailwind v4 主题配置在 `src/app/globals.css` 的 `@theme inline` 中
- **没有** `tailwind.config.ts` 文件
- 颜色优先使用主题变量：`--color-background`、`--color-foreground`、`--color-muted`、`--color-accent`、`--color-accent-2`、`--color-border`
- 路径别名 `@/*` 映射到 `./src/*`

## 开发注意事项

1. **首页是单页滚动结构**：`src/app/page.tsx` 导入所有 `sections` 组件，由 `SmoothScrollProvider` 提供平滑滚动。
2. **Lenis 与 GSAP ScrollTrigger**：`SmoothScrollProvider` 在 `page.tsx` 中包裹首页内容，详情页不使用 Lenis。
3. **Embla 轮播点击**：Members 轮播中整张卡片可点击进入详情页。组件通过监听 `pointerdown` / `pointermove` / `click` 判断用户是轻点还是拖拽，轻点则调用 `router.push(`/members/${id}`)` 跳转，拖拽则留给 Embla 滚动。卡片带有 `cursor-pointer` 和“查看详情”提示。
4. **字体预加载**：`Geist_Mono` 已配置 `preload: false`，避免控制台出现 `was preloaded using link preload but not used` 警告。主字体 `Geist` 仍保持预加载以优化首屏文字渲染。
5. **Hydration 警告**：Lenovo AI Translate 等浏览器扩展会向 `<body>` 注入属性导致 hydration mismatch。已在 `layout.tsx` 的 `<body>` 上加 `suppressHydrationWarning` 抑制。
6. **开发环境 turbopack 警告**：当前环境下 `C:\Users\28211\package-lock.json` 被检测为额外 lockfile，导致 Next.js 推断 workspace root 警告。这是本地环境文件，不影响构建。
7. **生产部署**：Serverless 环境无法持久化 SQLite，生产请切换到 PostgreSQL 并配置 `DATABASE_URL`、`RESEND_API_KEY`、`RESEND_TO_EMAIL`。

## 可编辑内容

乐队名称、标语、成员、新闻、音乐、演出、联系方式等数据都在 `src/content/band.ts` 中直接修改。

## 成员详情页路由

| 成员 ID | 页面路径 |
|---------|----------|
| tianjiu | `/members/tianjiu` |
| atsuka | `/members/atsuka` |
| lazyjam | `/members/lazyjam` |
| ziyu | `/members/ziyu` |
| yixi | `/members/yixi` |
| hudiesha | `/members/hudiesha` |

## 状态

- 构建：通过 (`npm run build`)
- 代码检查：通过 (`npm run lint`)
- 生成页面：12 个（首页 + 6 个成员页 + 404 + 2 API 路由）
- 成员轮播：整张卡片可点击跳转详情页
- 字体预加载：Geist_Mono 已关闭预加载
