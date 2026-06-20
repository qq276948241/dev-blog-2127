import { Link } from 'react-router-dom';
import { Tags, Hash, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

export default function TagsPage() {
  const { tags, articles } = useBlogStore();
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  const maxCount = sortedTags[0]?.count || 1;

  const tagColors = [
    { from: 'from-accent-primary/20', to: 'to-accent-primary/5', border: 'border-accent-primary/40', text: 'text-accent-primary' },
    { from: 'from-accent-secondary/20', to: 'to-accent-secondary/5', border: 'border-accent-secondary/40', text: 'text-accent-secondary' },
    { from: 'from-accent-tertiary/20', to: 'to-accent-tertiary/5', border: 'border-accent-tertiary/40', text: 'text-accent-tertiary' },
    { from: 'from-accent-warm/20', to: 'to-accent-warm/5', border: 'border-accent-warm/40', text: 'text-accent-warm' },
    { from: 'from-accent-danger/20', to: 'to-accent-danger/5', border: 'border-accent-danger/40', text: 'text-accent-danger' },
    { from: 'from-accent-success/20', to: 'to-accent-success/5', border: 'border-accent-success/40', text: 'text-accent-success' },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Page Header */}
      <section className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-accent-secondary/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-secondary to-accent-primary flex items-center justify-center shadow-glow-cyan">
              <Tags className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text">标签云</h1>
          </div>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            共 <span className="text-accent-secondary font-mono font-bold">{tags.length}</span> 个技术标签，
            点击标签快速筛选相关文章，发现更多同主题内容。
          </p>
        </div>
      </section>

      {/* Tag Cloud */}
      <section className="glass-card p-8 md:p-10">
        <h2 className="font-display font-bold text-xl mb-8 flex items-center gap-2">
          <Hash className="w-5 h-5 text-accent-secondary" />
          全部标签
          <span className="ml-2 text-sm font-normal text-text-tertiary">按使用频率排序</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 py-6">
          {sortedTags.map((tag, idx) => {
            const color = tagColors[idx % tagColors.length];
            const ratio = tag.count / maxCount;
            const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
            const sizeIdx = Math.min(Math.floor(ratio * fontSizes.length), fontSizes.length - 1);
            const rotations = ['rotate-0', 'rotate-[-1deg]', 'rotate-[1deg]', 'rotate-[-2deg]', 'rotate-[2deg]'];
            const rotation = rotations[idx % rotations.length];

            return (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-br ${color.from} ${color.to} border ${color.border} ${color.text} ${fontSizes[sizeIdx]} ${rotation} font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105`}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <Hash className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span>{tag.name}</span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">
                  {tag.count}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tag Stats */}
      <section>
        <h2 className="section-title">
          标签排行榜
          <span className="ml-3 text-sm font-normal text-text-tertiary">文章数量 TOP 10</span>
        </h2>

        <div className="glass-card p-6 md:p-8">
          <div className="space-y-4">
            {sortedTags.slice(0, 10).map((tag, idx) => {
              const color = tagColors[idx % tagColors.length];
              const width = (tag.count / maxCount) * 100;
              return (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.slug}`}
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-bg-tertiary/50 transition-all duration-200"
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-sm flex-shrink-0 ${
                      idx < 3
                        ? `bg-gradient-to-br ${color.from} ${color.border} ${color.text} shadow-lg`
                        : 'bg-bg-tertiary text-text-tertiary'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-medium group-hover:${color.text.split('-')[0]}-${color.text.split('-')[1]} transition-colors`}>
                        #{tag.name}
                      </span>
                      <span className="text-sm font-mono text-text-tertiary">{tag.count} 篇</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${color.from.replace('/20', '')} to-${color.text.replace('text-', '')} transition-all duration-700`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
