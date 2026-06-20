import type { Article } from '../../types';

const coverBase = 'https://picsum.photos/seed';

export const frontendArticles: Article[] = [
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
];
