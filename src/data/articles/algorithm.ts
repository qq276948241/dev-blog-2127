import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const algorithmArticles: Article[] = [
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
];
