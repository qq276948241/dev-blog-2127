import type { Article } from '../types';

const coverBase = 'https://picsum.photos/seed';

export const articles: Article[] = [
  {
    id: '1',
    title: 'React 18 并发特性深度解析：从原理到实战',
    slug: 'react-18-concurrent-features',
    summary: '深入理解 React 18 并发模式的核心原理，包括 Fiber 架构、时间切片、优先级调度，并通过实际案例演示 useTransition、useDeferredValue 等新 API 的最佳实践。',
    cover: `${coverBase}/react18/800/450`,
    category: 'frontend',
    tags: ['React', 'TypeScript', '性能优化'],
    publishDate: '2024-03-15',
    readingTime: 15,
    author: '星空漫步者',
    views: 3256,
    content: `# React 18 并发特性深度解析

React 18 带来了革命性的并发特性，彻底改变了我们构建用户界面的方式。

## 并发模式的核心原理

### Fiber 架构回顾

Fiber 将渲染工作拆分为可中断的小单元：

\`\`\`typescript
interface FiberNode {
  type: any;
  key: string | null;
  stateNode: any;
  child: Fiber | null;
  sibling: Fiber | null;
  return: Fiber | null;
  pendingProps: any;
  memoizedProps: any;
  memoizedState: any;
  lanes: Lanes;
  flags: Flags;
}
\`\`\`

### 时间切片机制

时间切片允许 React 在每一帧中执行部分渲染工作：

\`\`\`javascript
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  } else if (wipRoot) {
    commitRoot();
  }
}
\`\`\`

> 并发模式下，渲染阶段是可中断的，但提交阶段是同步且不可中断的。

## 核心 API 实战

### useTransition

用于标记非紧急更新，适用于搜索建议等场景：

\`\`\`tsx
import { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setResults(filterData(value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultList data={results} />
    </div>
  );
}
\`\`\`

### useDeferredValue

延迟更新某个值，常用于列表渲染优化：

\`\`\`tsx
import { useDeferredValue, useMemo } from 'react';

function LargeList({ items, filter }) {
  const deferredFilter = useDeferredValue(filter);
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(deferredFilter));
  }, [items, deferredFilter]);

  return (
    <div className={filter !== deferredFilter ? 'opacity-60' : ''}>
      {filteredItems.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
}
\`\`\`

## 性能对比

| 场景 | React 17 | React 18 (并发) | 提升 |
|------|----------|-----------------|------|
| 大列表筛选 (10000项) | 320ms | 45ms | 86% |
| 搜索建议实时响应 | 180ms | 12ms | 93% |
| 路由切换动画 | 掉帧 | 60fps | 流畅 |

## 最佳实践总结

1. **合理使用 useTransition**：只用于真正需要延迟的更新
2. **结合 Suspense**：并发模式 + Suspense 是最佳搭档
3. **避免阻塞渲染**：长任务用 Web Worker 处理
4. **性能度量**：使用 React DevTools Profiler 分析

并发模式是 React 发展的重要里程碑！
`,
  },
  {
    id: '2',
    title: 'TypeScript 类型体操入门到精通：20个高级技巧',
    slug: 'typescript-type-gymnastics',
    summary: '从条件类型、映射类型到模板字面量类型，20个实战技巧带你掌握 TypeScript 高级类型编程，写出更安全、更智能的代码。',
    cover: `${coverBase}/typescript/800/450`,
    category: 'frontend',
    tags: ['TypeScript', '设计模式'],
    publishDate: '2024-03-10',
    readingTime: 12,
    author: '星空漫步者',
    views: 2876,
    content: `# TypeScript 类型体操入门到精通

TypeScript 的类型系统非常强大，本文整理了实用的高级类型技巧。

## 基础进阶

### 条件类型分发

\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;
type A = ToArray<string | number>; // string[] | number[]

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type B = ToArrayNonDist<string | number>; // (string | number)[]
\`\`\`

### 递归类型约束

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function ? T[K] : DeepReadonly<T[K]>
    : T[K];
};
\`\`\`

## 实用工具类型

### 函数参数推断

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

const fetchData = (): Promise<User[]> => fetch('/api').then(r => r.json());
type Data = Awaited<ReturnType<typeof fetchData>>; // User[]
\`\`\`

### 模板字面量类型

\`\`\`typescript
type CSSUnits = 'px' | 'rem' | 'em' | '%';
type CSSLength = \`\${number}\${CSSUnits}\`;

type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'
\`\`\`

## 实战案例

### 类型安全的 Object.keys

\`\`\`typescript
type Keys<T> = keyof T & (string | number | symbol);
function typedKeys<T extends object>(obj: T): Keys<T>[] {
  return Object.keys(obj) as Keys<T>[];
}

const user = { name: 'Tom', age: 25 };
const keys = typedKeys(user); // ('name' | 'age')[]
\`\`\`

类型体操不是炫技，合理使用可以提升代码安全性！
`,
  },
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

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
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
    image: myapp:\
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
      POSTGRES_PASSWORD: \
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
  {
    id: '4',
    title: 'Node.js 性能优化实战：让你的服务快到飞起',
    slug: 'nodejs-performance-optimization',
    summary: '从异步编程、内存管理到集群部署，全方位剖析 Node.js 性能瓶颈定位与优化方案，附真实项目优化案例。',
    cover: `${coverBase}/nodejs/800/450`,
    category: 'backend',
    tags: ['Node.js', '性能优化', 'Redis'],
    publishDate: '2024-02-28',
    readingTime: 14,
    author: '星空漫步者',
    views: 1987,
    content: `# Node.js 性能优化实战

本文分享在千万级项目中总结的 Node.js 性能优化经验。

## 异步编程优化

### Promise 并发控制

\`\`\`typescript
import pLimit from 'p-limit';

async function processItems(items, concurrency = 10) {
  const limit = pLimit(concurrency);
  return Promise.all(items.map(item => limit(() => processOne(item))));
}
\`\`\`

## 内存优化

### 对象池模式

\`\`\`typescript
class ObjectPool<T> {
  private pool: T[] = [];
  constructor(
    private factory: () => T,
    private reset: (obj: T) => void,
    private maxSize = 100
  ) {}

  acquire(): T { return this.pool.pop() ?? this.factory(); }
  release(obj: T): void {
    if (this.pool.length < this.maxSize) {
      this.reset(obj);
      this.pool.push(obj);
    }
  }
}
\`\`\`

## 集群部署

\`\`\`typescript
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', () => cluster.fork());
} else {
  require('./app');
}
\`\`\`

## 多级缓存策略

\`\`\`typescript
class MultiLevelCache {
  private l1 = new Map<string, { value: any; expire: number }>();

  constructor(
    private redis: Redis,
    private l1TTL = 30_000,
    private l2TTL = 300_000
  ) {}

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const l1Item = this.l1.get(key);
    if (l1Item && l1Item.expire > Date.now()) return l1Item.value;

    const l2Value = await this.redis.get(key);
    if (l2Value) {
      const parsed = JSON.parse(l2Value);
      this.l1.set(key, { value: parsed, expire: Date.now() + this.l1TTL });
      return parsed;
    }

    const value = await fetcher();
    await this.redis.setex(key, this.l2TTL / 1000, JSON.stringify(value));
    this.l1.set(key, { value, expire: Date.now() + this.l1TTL });
    return value;
  }
}
\`\`\`

性能优化需要结合监控数据持续迭代改进。
`,
  },
  {
    id: '5',
    title: 'MySQL 索引优化全攻略：从原理到实战调优',
    slug: 'mysql-index-optimization',
    summary: '深入理解 B+ 树索引原理，掌握 EXPLAIN 分析方法，解决慢查询问题，让你的数据库飞起来。',
    cover: `${coverBase}/mysql/800/450`,
    category: 'database',
    tags: ['MySQL', '算法', '性能优化'],
    publishDate: '2024-02-20',
    readingTime: 16,
    author: '星空漫步者',
    views: 1756,
    content: `# MySQL 索引优化全攻略

索引是数据库性能调优的基础。

## EXPLAIN 分析方法

\`\`\`sql
EXPLAIN SELECT * FROM orders
WHERE user_id = 123 AND status = 'paid'
ORDER BY created_at DESC LIMIT 20;
\`\`\`

| 列 | 优化目标 |
|----|----------|
| type | 从 ALL → index → range → ref → eq_ref → const |
| rows | 越小越好 |
| Extra | 避免 Using filesort / Using temporary |

## 索引设计实战

### 联合索引顺序

最左前缀原则：区分度高的列放前面

\`\`\`sql
CREATE INDEX idx_user_status ON orders(user_id, status);
\`\`\`

### 覆盖索引

查询列全部包含在索引中，避免回表：

\`\`\`sql
CREATE INDEX idx_user_status_created
ON orders(user_id, status, created_at, amount);

SELECT user_id, status, created_at, amount
FROM orders
WHERE user_id = 123 AND status = 'paid'
ORDER BY created_at DESC;
\`\`\`

## 慢查询优化案例

### 深分页优化

\`\`\`sql
-- 游标分页
SELECT * FROM orders
WHERE user_id = 123
  AND created_at < '2024-02-01 00:00:00'
ORDER BY created_at DESC
LIMIT 20;

-- 子查询优化
SELECT o.* FROM orders o
INNER JOIN (
  SELECT id FROM orders
  WHERE user_id = 123
  ORDER BY created_at DESC
  LIMIT 1000000, 20
) tmp ON o.id = tmp.id;
\`\`\`

**索引设计三原则：**
1. 高频查询优先建索引
2. 尽量使用覆盖索引
3. 控制索引数量（写性能）
`,
  },
  {
    id: '6',
    title: 'CSS 现代布局完全指南：Flexbox vs Grid vs Container',
    slug: 'css-modern-layout-guide',
    summary: '全面解析 CSS 三种主流布局方案的适用场景，配合大量实战案例，写出简洁优雅的响应式布局代码。',
    cover: `${coverBase}/css/800/450`,
    category: 'frontend',
    tags: ['CSS', 'TailwindCSS'],
    publishDate: '2024-02-15',
    readingTime: 10,
    author: '星空漫步者',
    views: 1634,
    content: `# CSS 现代布局完全指南

## Flexbox 经典布局

\`\`\`css
/* 完美居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 粘性页脚 */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.footer { margin-top: auto; }

/* 自动换行卡片 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.card {
  flex: 1 1 300px;
  min-width: 0;
}
\`\`\`

## Grid 圣杯布局

\`\`\`css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main ads"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header" "nav" "main" "ads" "footer";
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Container Queries

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}
\`\`\`

**一句话总结：** Flex 管一行，Grid 管一片，Container Query 让组件更智能。
`,
  },
  {
    id: '7',
    title: 'NestJS 企业级架构设计：DDD + CQRS + 微服务',
    slug: 'nestjs-enterprise-architecture',
    summary: '如何用 NestJS 搭建可维护、可扩展的企业级后端系统？本文分享 DDD 分层架构、CQRS 模式、微服务实践的完整方案。',
    cover: `${coverBase}/nestjs/800/450`,
    category: 'backend',
    tags: ['NestJS', 'Node.js', '微服务', 'GraphQL'],
    publishDate: '2024-02-10',
    readingTime: 20,
    author: '星空漫步者',
    views: 1543,
    content: `# NestJS 企业级架构设计

## 分层架构设计

\`\`\`
src/modules/user/
├── application/     # 应用层（用例、DTO、命令）
├── domain/          # 领域层（实体、仓储接口）
├── infrastructure/  # 基础设施层（仓储实现、ORM）
├── interface/       # 接口层（Controller、Resolver）
└── user.module.ts
\`\`\`

## 领域层实现

\`\`\`typescript
import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    public readonly id: string,
    private email: string,
    private status: UserStatus = UserStatus.PENDING,
  ) { super(); }

  activate(): void {
    if (this.status !== UserStatus.PENDING) {
      throw new BusinessException('用户状态异常');
    }
    this.status = UserStatus.ACTIVE;
    this.apply(new UserActivatedEvent(this.id));
  }
}
\`\`\`

## CQRS CommandHandler

\`\`\`typescript
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const { email, password, name } = command;
    const exists = await this.userRepo.existsByEmail(email);
    if (exists) throw new ConflictException('邮箱已注册');

    const user = new User(generateId(), email, await this.passwordService.hash(password), name);
    await this.userRepo.save(user);
    user.commit();
    return user.id;
  }
}
\`\`\`

企业级架构的核心是：**高内聚低耦合**。
`,
  },
  {
    id: '8',
    title: '算法面试高频：动态规划五大套路模板',
    slug: 'dynamic-programming-templates',
    summary: '总结 DP 问题的五种常见类型：线性 DP、区间 DP、背包 DP、树形 DP、状态压缩 DP，附万能模板和典型例题。',
    cover: `${coverBase}/algorithm/800/450`,
    category: 'algorithm',
    tags: ['算法', 'TypeScript'],
    publishDate: '2024-02-05',
    readingTime: 22,
    author: '星空漫步者',
    views: 1423,
    content: `# 算法面试：动态规划五大套路模板

## 套路一：线性 DP - LIS

\`\`\`typescript
function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}
\`\`\`

## 套路二：区间 DP - 戳气球

\`\`\`typescript
function maxCoins(nums: number[]): number {
  const val = [1, ...nums, 1];
  const n = val.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 1; len <= n - 2; len++) {
    for (let i = 0; i < n - len - 1; i++) {
      const j = i + len + 1;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + val[i] * val[k] * val[j]
        );
      }
    }
  }
  return dp[0][n - 1];
}
\`\`\`

## 套路三：0-1 背包模板

\`\`\`typescript
function knapsack01(W: number, w: number[], v: number[]): number {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < w.length; i++) {
    for (let j = W; j >= w[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
    }
  }
  return dp[W];
}
\`\`\`

## DP 万能解题步骤

1. **确定状态**：最后一步是什么？
2. **状态转移**：子问题怎么关联？
3. **初始条件**：最小子问题答案？
4. **计算顺序**：自顶向下还是自底向上？
5. **空间优化**：滚动数组？
`,
  },
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
    id: '10',
    title: 'MongoDB 实战：从 CRUD 到聚合管道优化',
    slug: 'mongodb-crud-to-aggregation',
    summary: '系统学习 MongoDB 核心操作，掌握聚合管道的高级用法（分组、关联、性能调优），对比 SQL 快速上手 NoSQL。',
    cover: `${coverBase}/mongodb/800/450`,
    category: 'database',
    tags: ['MongoDB', 'Node.js', '安全'],
    publishDate: '2024-01-20',
    readingTime: 13,
    author: '星空漫步者',
    views: 1189,
    content: `# MongoDB 实战

## SQL vs MongoDB 对照

| SQL | MongoDB |
|-----|---------|
| SELECT * FROM users | db.users.find({}) |
| SELECT name FROM users WHERE age>18 | db.users.find({age:{\$gt:18}},{name:1}) |
| INSERT INTO users | db.users.insertOne({...}) |
| UPDATE SET age=21 WHERE | db.users.updateOne(where, {\$set:{age:21}}) |
| DELETE WHERE | db.users.deleteMany(where) |
| ORDER BY age DESC | .sort({age:-1}) |

## 聚合管道 - 分组统计

\`\`\`javascript
db.orders.aggregate([
  { $match: { status: 'paid' } },
  {
    $group: {
      _id: '$category',
      count: { $count: {} },
      total: { $sum: '$amount' },
      avgAmount: { $avg: '$amount' }
    }
  },
  { $match: { total: { $gt: 10000 } } },
  { $sort: { total: -1 } }
]);
\`\`\`

## 聚合管道 - 关联查询

\`\`\`javascript
db.orders.aggregate([
  {
    $lookup: {
      from: 'order_items',
      localField: '_id',
      foreignField: 'orderId',
      as: 'items'
    }
  },
  { $addFields: { totalAmount: { $sum: '$items.price' } } }
]);
\`\`\`

## 索引策略

\`\`\`javascript
// 复合索引
db.orders.createIndex({ userId: 1, createdAt: -1 });

// 文本索引
db.articles.createIndex({ title: 'text', content: 'text' });
db.articles.find(
  { $text: { $search: 'mongodb' } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } });
\`\`\`
`,
  },
  {
    id: '11',
    title: 'Vue 3 组合式 API 实战：Pinia + VueUse 打造高效应用',
    slug: 'vue3-composition-api-pinia',
    summary: 'Vue 3 组合式 API 完全指南，包括 setup 语法糖、响应式原理、Pinia 状态管理、VueUse 实用 Hooks 合集。',
    cover: `${coverBase}/vue3/800/450`,
    category: 'frontend',
    tags: ['Vue', 'TypeScript'],
    publishDate: '2024-01-15',
    readingTime: 12,
    author: '星空漫步者',
    views: 1098,
    content: `# Vue 3 组合式 API 实战

## 响应式核心

### ref vs reactive

\`\`\`typescript
import { ref, reactive, toRefs, computed, watch } from 'vue';

const count = ref(0);
count.value++;

const state = reactive({
  user: null,
  loading: false,
  error: null,
});

// 解构不丢失响应式
const { user, loading } = toRefs(state);
\`\`\`

### computed + watch

\`\`\`typescript
const fullName = computed(() => firstName.value + ' ' + lastName.value);

watch(count, (newVal, oldVal) => {
  console.log(oldVal, '->', newVal);
}, { immediate: true });

watchEffect(() => {
  localStorage.setItem('theme', theme.value);
});
\`\`\`

## 自定义 Hooks

### useUser

\`\`\`typescript
export function useUser(id: string) {
  const state = reactive({
    user: null as User | null,
    loading: false,
    error: null as Error | null,
  });

  const fetchUser = async () => {
    state.loading = true;
    try {
      state.user = await fetch(\`/api/users/\${id}\`).then(r => r.json());
    } catch (e) {
      state.error = e as Error;
    } finally {
      state.loading = false;
    }
  };

  watchEffect(() => id && fetchUser());

  return { ...toRefs(state), refresh: fetchUser };
}
\`\`\`

## Pinia 状态管理

\`\`\`typescript
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref<User | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  async function login(credentials: LoginDto) {
    const res = await api.login(credentials);
    token.value = res.token;
    user.value = res.user;
    localStorage.setItem('token', res.token);
  }

  function logout() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('token');
  }

  return { token, user, isLoggedIn, login, logout };
});
\`\`\`

Composition API 让逻辑复用更自然！
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
