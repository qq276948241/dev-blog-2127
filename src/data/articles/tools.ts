import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const toolsArticles: Article[] = [
  {
    id: '9',
    title: 'Git 高级工作流：团队协作的最佳实践',
    slug: 'git-advanced-workflow',
    summary: '从 Git Flow 到 Trunk Based，详解多种开发工作流的适用场景，配合 rebase、cherry-pick 等高级命令的使用技巧。',
    cover: `${coverBase}/git/800/450`,
    category: 'tools',
    tags: ['Git', 'Linux', 'CI/CD'],
    publishDate: '2024-01-28',
    readingTime: 11,
    author: '星空漫步者',
    views: 1312,
    content: `# Git 高级工作流

## Rebase 深度解析

### 交互式 Rebase

\`\`\`bash
# 压缩最近 3 个 commit
git rebase -i HEAD~3

# 结果：
pick   a1b2c3d feat: 登录功能
squash e4f5g6h fix: 登录bug
squash h7i8j9k docs: 更新文档
\`\`\`

### Pull Rebase（推荐配置）

\`\`\`bash
git config --global pull.rebase true
git config --global rebase.autoStash true
\`\`\`

## Cherry-pick

\`\`\`bash
# pick 单个 commit
git cherry-pick abc1234

# pick 但不自动提交
git cherry-pick -n abc1234

# 解决冲突后继续
git cherry-pick --continue
\`\`\`

## Bisect 二分查错

\`\`\`bash
git bisect start
git bisect bad HEAD
git bisect good v2.0.0
# 测试每个版本，标记 good/bad
git bisect reset
\`\`\`

## 神级 Alias

\`\`\`bash
# 写到 ~/.gitconfig
[alias]
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'
    st = status -sb
    pl = pull --rebase --autostash
    psf = push --force-with-lease
    wip = !git add -A && git commit -m 'WIP'
\`\`\`
`,
  },
  {
    id: '12',
    title: 'Webpack vs Vite：构建工具深度对比与迁移指南',
    slug: 'webpack-vs-vite',
    summary: '从原理层面对比 Webpack 和 Vite 的差异，详解 Vite 为什么快，以及 Webpack 项目如何无痛迁移到 Vite。',
    cover: `${coverBase}/vite/800/450`,
    category: 'tools',
    tags: ['Vite', 'Webpack', '性能优化'],
    publishDate: '2024-01-10',
    readingTime: 9,
    author: '星空漫步者',
    views: 1056,
    content: `# Webpack vs Vite：构建工具深度对比

## 为什么 Vite 这么快？

### 原生 ESM

Webpack：开发时需要打包所有模块 -> bundle -> 浏览器请求

Vite：浏览器原生支持 ESM -> 按需请求文件 -> 实时编译

### 按需编译

\`\`\`
Webpack 启动流程：
入口 -> 分析依赖图 -> 编译所有模块 -> 打包 -> 启动服务器

Vite 启动流程：
启动开发服务器 (esbuild 预构建依赖) -> 浏览器请求 -> 按需编译
\`\`\`

## 核心差异对比

| 维度 | Webpack | Vite |
|------|---------|------|
| 冷启动 | 慢（全量打包） | 快（按需加载） |
| HMR 速度 | 随项目变大变慢 | 始终快速 |
| 生产构建 | 稳定、生态成熟 | 基于 Rollup、效率高 |
| 配置复杂度 | 高，插件多 | 低，约定大于配置 |
| 生态兼容性 | 完美 | 基本兼容 |

## Webpack 迁移 Vite 指南

\`\`\`bash
# 1. 安装
npm uninstall webpack webpack-cli webpack-dev-server
npm install -D vite @vitejs/plugin-react

# 2. 创建 vite.config.ts
\`\`\`

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
\`\`\`

**推荐新项目直接用 Vite，老项目迁移带来的开发体验提升是值得的！**
`,
  },
];
