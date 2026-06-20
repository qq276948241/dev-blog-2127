import { useMemo } from 'react';
import { useBlogStore } from '../store/useBlogStore';
import type { SortOrder } from '../types';

export function useFilteredArticles() {
  const {
    filter,
    categories,
    tags,
    setCategory,
    toggleTag,
    setSort,
    resetFilter,
    getFilteredArticles,
  } = useBlogStore();

  const filtered = useMemo(() => getFilteredArticles(), [filter, getFilteredArticles]);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === filter.category),
    [categories, filter.category]
  );

  const activeTagList = useMemo(
    () => tags.filter((t) => filter.tags.includes(t.slug)),
    [tags, filter.tags]
  );

  const hasFilter = useMemo(
    () => filter.category || filter.tags.length > 0 || filter.sort !== 'latest',
    [filter]
  );

  const handleSetCategory = (slug: string | null) => setCategory(slug);
  const handleToggleTag = (slug: string) => toggleTag(slug);
  const handleSetSort = (sort: SortOrder) => setSort(sort);
  const handleReset = () => resetFilter();

  return {
    filtered,
    filter,
    categories,
    tags,
    activeCategory,
    activeTagList,
    hasFilter,
    setCategory: handleSetCategory,
    toggleTag: handleToggleTag,
    setSort: handleSetSort,
    resetFilter: handleReset,
  };
}
