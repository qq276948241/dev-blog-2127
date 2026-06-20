import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const devopsArticles: Article[] = [
  {
    id: '3',
    title: 'Docker 容器化部署最佳实践：从入门到生产',
    slug: 'docker-best-practices',
    summary: '涵盖 Dockerfile 编写、镜像优化、多阶段构建、Compose 编排、安全加固等核心内容，附完整的生产级配置模板。',
    cover: `${coverBase}/docker/800/450`,
    category: 'devops',
    tags: ['Docker', 'Kubernetes', 'CI/CD'],
    publishDate: '2024-03-05',
    readingTime: 18,
    author: '星空漫步者',
    views: 2134,
    content: `# Docker 容器化部署最佳实践

本文总结了从开发环境到生产环境的 Docker 完整实践经验。

## Dockerfile 最佳实践

### 多阶段构建

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
\`\`\`

### 镜像优化技巧

1. **使用 Alpine 基础镜像**：体积小，安全性高
2. **合并 RUN 指令**：减少镜像层数
3. **清理缓存**：apt-get clean
4. **使用 .dockerignore**：排除 node_modules 等

## Docker Compose 生产配置

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    image: myapp:\\
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      db:
        condition: service_healthy
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \\
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
\`\`\`

容器化是现代部署的基础，掌握最佳实践能让你的服务更稳定！
`,
  },
];
