import {
  Filter,
  SortAsc,
  SortDesc,
  X,
  Clock,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { useBlogStore } from '../../store/useBlogStore';
import type { SortOrder } from '../../types';

export default function FilterBar() {
  const { filter, setCategory, toggleTag, setSort, resetFilter, categories, tags } =
    useBlogStore();

  const sortOptions: { value: SortOrder; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'latest', label: '最新发布', icon: Clock },
    { value: 'popular', label: '最多阅读', icon: TrendingUp },
  ];

  const activeTagList = tags.filter((t) => filter.tags.includes(t.slug));
  const activeCategory = categories.find((c) => c.slug === filter.category);
  const hasFilter = filter.category || filter.tags.length > 0 || filter.sort !== 'latest';

  return (
    <div className="glass-card p-5 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent-primary" />
          <span className="font-display font-semibold">文章筛选</span>
          {hasFilter && (
            <button
              onClick={resetFilter}
              className="ml-2 text-xs chip-outline !py-0.5 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              重置筛选
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {sortOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = filter.sort === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-primary/15 border border-accent-primary/40 text-accent-secondary shadow-glow/20'
                    : 'bg-bg-tertiary border border-border text-text-secondary hover:border-accent-primary/30 hover:text-text-primary'
                }`}
              >
                {isActive ? <SortDesc className="w-3.5 h-3.5" /> : <SortAsc className="w-3.5 h-3.5" />}
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-tertiary flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5" />
            分类
          </span>
          <button
            onClick={() => setCategory(null)}
            className={`chip ${!filter.category ? 'chip-active' : 'chip-outline'}`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(filter.category === cat.slug ? null : cat.slug)}
              className={`chip ${filter.category === cat.slug ? 'chip-active' : 'chip-outline'}`}
              style={filter.category === cat.slug ? { borderColor: `${cat.color}60`, boxShadow: `0 0 15px ${cat.color}20` } : {}}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
              <span className="text-[10px] opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Active Tags */}
        {(filter.tags.length > 0 || activeCategory) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border-subtle">
            <span className="text-xs text-text-tertiary">当前筛选：</span>
            {activeCategory && (
              <span className="chip chip-active !px-2 !py-0.5 text-[11px]">
                分类: {activeCategory.name}
                <button
                  onClick={() => setCategory(null)}
                  className="ml-1 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {activeTagList.map((tag) => (
              <span key={tag.id} className="chip chip-active !px-2 !py-0.5 text-[11px]">
                标签: {tag.name}
                <button
                  onClick={() => toggleTag(tag.slug)}
                  className="ml-1 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
