import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, Layers, Tag } from 'lucide-react';
import { useBlogStore } from '../../store/useBlogStore';
import { formatDate } from '../../utils/date';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const { categories, tags } = useBlogStore();
  const category = categories.find((c) => c.slug === article.category);
  const articleTags = tags.filter((t) => article.tags.includes(t.name));

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block glass-card glass-card-hover overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-tertiary">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        
        {category && (
          <div
            className="absolute top-4 left-4 chip bg-black/50 backdrop-blur border-white/10 text-white"
            style={{ boxShadow: `0 0 20px ${category.color}30` }}
          >
            <Layers className="w-3 h-3" style={{ color: category.color }} />
            {category.name}
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[11px] text-white/90">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            {article.readingTime} 分钟
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-5">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {articleTags.slice(0, 4).map((tag) => (
            <span
              key={tag.id}
              className="chip-outline !text-[11px] !py-0.5 !px-2 flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-xs text-text-tertiary">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-accent-secondary transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishDate, 'short')}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString()}
            </span>
          </div>
          <span className="text-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center gap-1">
            阅读全文
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
