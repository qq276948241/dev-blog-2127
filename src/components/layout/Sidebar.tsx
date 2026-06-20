import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Layers,
  Tags,
  Calendar,
  Eye,
  ChevronRight,
  Layers as LayersIcon,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { useBlogStore } from '../../store/useBlogStore';
import { formatDate } from '../../utils/date';

export default function Sidebar() {
  const { profile, getPopularArticles, categories, tags } = useBlogStore();
  const popular = getPopularArticles(5);
  const hotTags = [...tags].sort((a, b) => b.count - a.count).slice(0, 12);

  const tagColors = [
    'from-accent-primary/15 to-accent-primary/5 border-accent-primary/30 text-accent-primary',
    'from-accent-secondary/15 to-accent-secondary/5 border-accent-secondary/30 text-accent-secondary',
    'from-accent-tertiary/15 to-accent-tertiary/5 border-accent-tertiary/30 text-accent-tertiary',
    'from-accent-warm/15 to-accent-warm/5 border-accent-warm/30 text-accent-warm',
    'from-accent-danger/15 to-accent-danger/5 border-accent-danger/30 text-accent-danger',
    'from-accent-success/15 to-accent-success/5 border-accent-success/30 text-accent-success',
  ];

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Profile Card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-2xl border-2 border-accent-primary/40 shadow-glow/30"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-success border-2 border-bg-secondary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-lg">{profile.name}</div>
              <div className="text-xs text-text-tertiary">{profile.title}</div>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {profile.signature}
          </p>
          <Link
            to="/about"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/30 text-accent-secondary text-sm font-medium hover:bg-accent-primary/20 hover:shadow-glow/20 transition-all duration-300"
          >
            查看完整简历
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-accent-danger" />
          <h3 className="font-display font-bold">热门文章</h3>
        </div>
        <ul className="space-y-4">
          {popular.map((article, idx) => (
            <li key={article.id}>
              <Link
                to={`/article/${article.id}`}
                className="group flex gap-3"
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    idx === 0
                      ? 'bg-gradient-to-br from-accent-danger to-accent-warm text-white shadow-lg shadow-accent-danger/25'
                      : idx === 1
                      ? 'bg-gradient-to-br from-accent-warm to-accent-primary text-white'
                      : idx === 2
                      ? 'bg-gradient-to-br from-accent-secondary to-accent-primary text-white'
                      : 'bg-bg-tertiary text-text-secondary'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-primary group-hover:text-accent-secondary transition-colors line-clamp-2 leading-snug mb-1">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </span>
                    <span>{formatDate(article.publishDate, 'relative')}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent-primary" />
            <h3 className="font-display font-bold">文章分类</h3>
          </div>
          <Link to="/categories" className="text-xs text-text-tertiary hover:text-accent-secondary flex items-center gap-0.5 transition-colors">
            全部
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/category/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary group transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <LayersIcon className="w-4 h-4 group-hover:text-accent-primary transition-colors" style={{ color: cat.color }} />
                  {cat.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-bg-tertiary text-[11px] font-mono text-text-tertiary group-hover:bg-accent-primary/15 group-hover:text-accent-secondary transition-all">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tag Cloud */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5 text-accent-secondary" />
            <h3 className="font-display font-bold">热门标签</h3>
          </div>
          <Link to="/tags" className="text-xs text-text-tertiary hover:text-accent-secondary flex items-center gap-0.5 transition-colors">
            全部
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {hotTags.map((tag, idx) => {
            const sizes = ['text-xs', 'text-sm', 'text-base'];
            const sizeIdx = Math.min(Math.floor((tag.count / 5)), sizes.length - 1);
            return (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className={`chip bg-gradient-to-br ${tagColors[idx % tagColors.length]} border font-medium`}
                style={{ fontSize: sizes[sizeIdx] }}
              >
                <Tag className="w-3 h-3" />
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Archive */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-accent-tertiary" />
          <h3 className="font-display font-bold">时间归档</h3>
        </div>
        <Link
          to="/archive"
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-accent-tertiary/10 to-accent-primary/10 border border-accent-tertiary/20 text-sm text-text-primary hover:shadow-glow/20 hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="font-medium">查看全部文章</span>
          <ChevronRight className="w-4 h-4 text-accent-tertiary" />
        </Link>
      </div>
    </aside>
  );
}
