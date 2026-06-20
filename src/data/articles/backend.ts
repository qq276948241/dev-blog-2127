import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const backendArticles: Article[] = [
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
];
