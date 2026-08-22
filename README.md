# 胡文悦｜个人作品集

这是胡文悦的个人作品集，包含 AI 产品与 Vibe Coding 项目、实习与教育经历、内容创作和纪录片作品。

线上地址：<https://wenyueh8.github.io/>

英文版本：<https://wenyueh8.github.io/en/>

## 主要内容

- ArcProof：面向纪录片创作者的本地素材分析与叙事编排 Agent
- RoomMood：租房软装风格与采购建议 Demo
- IELTS Listening Spelling：听力定位句与单词拼写练习工具
- AI 产品、海外内容创作与纪录片经历

## 本地运行

```bash
npm install
npm run build
```

英文页面由 `scripts/translate-portfolio-en.mjs` 从主页面生成；更新中文内容或翻译表后，先运行：

```bash
node scripts/translate-portfolio-en.mjs
```

GitHub Actions 会在 `main` 分支更新后自动构建并部署到 GitHub Pages。
