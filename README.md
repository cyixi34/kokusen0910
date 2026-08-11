# 告别宣言 | FAREWELL PROCLAMATION 官方网站

一个具有 18trip.jp 风格的单页滚动乐队网站，包含乐队介绍、成员卡片、留言板、关于我们和联系方式。

## 技术栈

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS 4**
- **GSAP + ScrollTrigger** — 滚动触发动画
- **Lenis** — 平滑滚动
- **Framer Motion** — 组件动画

完全静态站点，无数据库、无 API、无需任何环境变量。

## 功能

- 单页长滚动，顶部固定导航锚点跳转
- 每个 section 进入视口时的滚动触发动画
- 成员介绍卡片网格（点击首屏头像可平滑滚动到对应成员卡片）
- 留言板（展示二维码图片，指向外部平台；图片为 `public/qr-placeholder.svg`，替换文件即可更新）
- 关于我们（粉丝群 + B站账号二维码，图片为 `public/qr-fan-group.svg` / `public/qr-bilibili.svg`）
- 联系方式（仅邮箱，静态展示 + 一键复制，无跳转链接）

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000。

## 自定义内容

- 乐队名称、成员、新闻、音乐、演出等内容都在 `src/content/band.ts` 中修改。
- 留言板二维码图片在 `public/qr-placeholder.svg`，替换成你的二维码文件即可（保持同名无需改代码）。
- 关于我们区的粉丝群 / B站二维码分别在 `public/qr-fan-group.svg`、`public/qr-bilibili.svg`。

## 部署

完全静态，可部署到任意静态托管平台（Vercel / Netlify / GitHub Pages）：

- **Vercel**：导入 GitHub 仓库，无需配置任何环境变量，直接部署。
- **GitHub Pages**：运行 `npm run build` 后将 `out/` 目录部署为静态站点。

## 项目结构

```
src/
  app/
    page.tsx         # 首页（单页所有 section）
    layout.tsx       # 根布局
  components/
    sections/        # 页面各区块
    ui/              # 导航、平滑滚动、动画等
  content/           # 乐队内容数据
public/              # 静态资源（图片等）
```

## 许可证

MIT
