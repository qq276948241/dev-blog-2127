import { create } from 'zustand';
import { articles as mockArticles } from '../data/articles';
import { categories as mockCategories } from '../data/categories';
import { tags as mockTags } from '../data/tags';
import { profile as mockProfile } from '../data/profile';
import type { Article, BlogFilter, SortOrder } from '../types';

interface BlogState {
  articles: Article[];
  categories: typeof mockCategories;
  tags: typeof mockTags;
  profile: typeof mockProfile;
  filter: BlogFilter;
  setCategory: (slug: string | null) => void;
  toggleTag: (slug: string) => void;
  setSort: (sort: SortOrder) => void;
  setKeyword: (keyword: string) => void;
  resetFilter: () => void;
  getFilteredArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  getArticleBySlug: (slug: string) => Article | undefined;
  getPopularArticles: (limit?: number) => Article[];
  getRelatedArticles: (articleId: string, limit?: number) => Article[];
  incrementViews: (id: string) => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  articles: mockArticles,
  categories: mockCategories,
  tags: mockTags,
  profile: mockProfile,
  filter: {
    category: null,
    tags: [],
    sort: 'latest',
    keyword: '',
  },
  setCategory: (slug) =>
    set((state) => ({ filter: { ...state.filter, category: slug } })),
  toggleTag: (slug) =>
    set((state) => {
      const exists = state.filter.tags.includes(slug);
      return {
        filter: {
          ...state.filter,
          tags: exists
            ? state.filter.tags.filter((t) => t !== slug)
            : [...state.filter.tags, slug],
        },
      };
    }),
  setSort: (sort) =>
    set((state) => ({ filter: { ...state.filter, sort } })),
  setKeyword: (keyword) =>
    set((state) => ({ filter: { ...state.filter, keyword } })),
  resetFilter: () =>
    set({
      filter: { category: null, tags: [], sort: 'latest', keyword: '' },
    }),
  getFilteredArticles: () => {
    const { articles, filter } = get();
    let result = [...articles];

    if (filter.category) {
      result = result.filter((a) => a.category === filter.category);
    }

    if (filter.tags.length > 0) {
      result = result.filter((a) =>
        filter.tags.some((t) => a.tags.includes(t)),
      );
    }

    if (filter.keyword.trim()) {
      const kw = filter.keyword.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(kw) ||
          a.summary.toLowerCase().includes(kw) ||
          a.tags.some((t) => t.toLowerCase().includes(kw)),
      );
    }

    if (filter.sort === 'latest') {
      result.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
    } else {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  },
  getArticleById: (id) => get().articles.find((a) => a.id === id),
  getArticleBySlug: (slug) => get().articles.find((a) => a.slug === slug),
  getPopularArticles: (limit = 5) =>
    [...get().articles].sort((a, b) => b.views - a.views).slice(0, limit),
  getRelatedArticles: (articleId, limit = 3) => {
    const { articles } = get();
    const current = articles.find((a) => a.id === articleId);
    if (!current) return [];

    return articles
      .filter((a) => a.id !== articleId)
      .map((a) => ({
        article: a,
        score:
          (a.category === current.category ? 2 : 0) +
          a.tags.filter((t) => current.tags.includes(t)).length,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((x) => x.article);
  },
  incrementViews: (id) =>
    set((state) => ({
      articles: state.articles.map((a) =>
        a.id === id ? { ...a, views: a.views + 1 } : a,
      ),
    })),
}));
