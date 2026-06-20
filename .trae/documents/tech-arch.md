## 1. 架构设计

```mermaid
graph TD
    "浏览器" --> "Vite Dev Server"
    "Vite Dev Server" --> "React SPA"
    "React SPA" --> "路由层 (React Router)"
    "路由层" --> "页面组件"
    "页面组件" --> "UI 组件"
    "页面组件" --> "数据层 (Zustand Store)"
    "数据层" --> "Mock 数据"
    "UI 组件" --> "Markdown 渲染器"
    "Markdown 渲染器" --> "代码高亮 (Prism)"
    "UI 组件" --> "样式层 (Tailwind CSS)"
```

## 2. 技术说明

- **前端框架**：React@18 + TypeScript
- **构建工具**：Vite@5
- **样式方案**：TailwindCSS@3 + CSS 变量
- **路由管理**：React Router DOM@6
- **状态管理**：Zustand
- **图标库**：Lucide React
- **Markdown 渲染**：react-markdown + remark-gfm
- **代码高亮**：react-syntax-highlighter (Prism 风格)
- **数据来源**：本地 Mock 数据（无后端）
- **初始化工具**：vite-init (react-ts 模板)

## 3. 路由定义

| 路由 | 页面组件 | 用途 |
|-------|---------|------|
| `/` | HomePage | 首页 - 文章列表 + Hero 区域 + 筛选 |
| `/article/:id` | ArticleDetailPage | 文章详情页 - Markdown 内容 + 代码高亮 |
| `/categories` | CategoriesPage | 分类页面 - 分类列表 + 分类文章 |
| `/category/:slug` | CategoryArticlesPage | 指定分类下的文章列表 |
| `/tags` | TagsPage | 标签页面 - 标签云 + 标签文章 |
| `/tag/:slug` | TagArticlesPage | 指定标签下的文章列表 |
| `/archive` | ArchivePage | 归档页面 - 时间线文章列表 |
| `/about` | AboutPage | 关于我页面 - 简历风格展示 |
| `/search` | SearchPage | 搜索结果页面 |

## 4. 数据模型

### 4.1 类型定义

```typescript
interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  content: string; // Markdown 内容
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: number; // 分钟
  author: string;
  views: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  cover?: string;
}

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'other';
}

interface Profile {
  name: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  signature: string;
  email: string;
  github: string;
  social: { name: string; url: string; icon: string }[];
  skills: Skill[];
  experiences: WorkExperience[];
  projects: Project[];
}
```

### 4.2 Mock 数据内容

- **文章数据**：10-15 篇技术文章，包含前端、后端、DevOps 等分类，每篇含完整 Markdown 内容与代码示例
- **分类数据**：6-8 个分类（前端开发、后端开发、数据库、DevOps、算法、工具推荐等）
- **标签数据**：20-30 个技术标签（React、Vue、TypeScript、Node.js、Docker 等）
- **个人资料**：完整的个人信息、10+ 技能、3-4 段工作经历、3-5 个项目

## 5. 项目目录结构

```
src/
├── components/          # 可复用 UI 组件
│   ├── layout/         # 布局组件 (Header, Footer, Sidebar, Layout)
│   ├── article/        # 文章相关组件 (ArticleCard, ArticleList, FilterBar)
│   ├── markdown/       # Markdown 渲染组件 (CodeBlock, TOC, MarkdownView)
│   └── common/         # 通用组件 (TagChip, CategoryBadge, SearchBar)
├── pages/              # 页面组件
│   ├── HomePage.tsx
│   ├── ArticleDetailPage.tsx
│   ├── CategoriesPage.tsx
│   ├── TagsPage.tsx
│   ├── ArchivePage.tsx
│   ├── AboutPage.tsx
│   └── SearchPage.tsx
├── store/              # Zustand 状态管理
│   └── useBlogStore.ts
├── data/               # Mock 数据
│   ├── articles.ts
│   ├── categories.ts
│   ├── tags.ts
│   └── profile.ts
├── hooks/              # 自定义 Hooks
│   ├── useScrollProgress.ts
│   └── useTypewriter.ts
├── types/              # TypeScript 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── date.ts
│   └── text.ts
├── App.tsx
├── main.tsx
└── index.css
```
