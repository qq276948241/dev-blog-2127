import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const databaseArticles: Article[] = [
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
];
