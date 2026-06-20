import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import {
  Search,
  FileText,
  X,
  TrendingUp,
  Layers,
  Tags,
  Sparkles,
} from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { formatDate } from '../utils/date';

function highlight(text: string, keyword: string) {
  if (!keyword.trim()) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    regex.test(part) ? (
      <mark
        key={idx}
        className="bg-accent-warm/25 text-accent-warm px-0.5 rounded font-medium"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const { articles, categories, tags, getPopularArticles } = useBlogStore();

  useEffect(() => {
    useBlogStore.getState().setKeyword(q);
  }, [q]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const kw = q.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(kw) ||
        a.summary.toLowerCase().includes(kw) ||
        a.tags.some((t) => t.toLowerCase().includes(kw)) ||
        a.category.toLowerCase().includes(kw),
    );
  }, [q, articles]);

  const popular = getPopularArticles(5);
  const matchedCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()),
  );
  const matchedTags = tags.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase()),
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem('q') as HTMLInputElement)?.value;
    if (input?.trim()) setSearchParams({ q: input.trim() });
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Search Header */}
      <section className="glass-card p-6 md:p-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            name="q"
            defaultValue={q}
            autoFocus
            type="text"
            placeholder="输入关键词搜索文章、分类、标签..."
            className="w-full pl-14 pr-14 py-4 bg-bg-tertiary border border-border rounded-2xl text-lg outline-none placeholder-text-tertiary focus:border-accent-primary/60 focus:ring-2 focus:ring-accent-primary/20 transition-all"
          />
          {q && (
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-bg-hover text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary !py-2 !px-5 text-sm"
          >
            搜索
          </button>
        </form>

        {q && (
          <div className="mt-5 flex items-center gap-3 text-sm">
            <Sparkles className="w-4 h-4 text-accent-warm" />
            <span className="text-text-secondary">
              搜索 “<span className="text-accent-secondary font-medium">{q}</span>” 共找到{' '}
              <span className="text-accent-primary font-mono font-bold">{results.length}</span> 篇文章
              {matchedCategories.length > 0 && `，${matchedCategories.length} 个分类`}
              {matchedTags.length > 0 && `，${matchedTags.length} 个标签`}
            </span>
          </div>
        )}
      </section>

      {q.trim() ? (
        <>
          {/* Matched Categories */}
          {matchedCategories.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-primary" />
                匹配的分类
              </h2>
              <div className="flex flex-wrap gap-3">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="chip-outline !px-4 !py-2 text-sm"
                    style={{ color: cat.color, borderColor: `${cat.color}50` }}
                  >
                    {highlight(cat.name, q)}
                    <span className="ml-1 text-text-tertiary font-mono text-xs">
                      ({cat.count})
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Matched Tags */}
          {matchedTags.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Tags className="w-5 h-5 text-accent-secondary" />
                匹配的标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {matchedTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className="chip-outline !text-xs !px-3 !py-1.5"
                  >
                    #{highlight(tag.name, q)}
                    <span className="ml-1 text-text-tertiary font-mono text-[10px]">
                      ({tag.count})
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Article Results */}
          <section>
            <h2 className="section-title !mb-4">
              文章结果
              <span className="ml-3 text-sm font-normal text-text-tertiary">
                {results.length} 篇匹配
              </span>
            </h2>

            {results.length === 0 ? (
              <div className="glass-card p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                  未找到相关文章
                </h3>
                <p className="text-text-secondary mb-6">
                  试试其他关键词，或浏览下方热门文章
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((article, idx) => {
                  const cat = categories.find((c) => c.slug === article.category);
                  return (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="group block glass-card glass-card-hover p-5 md:p-6"
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-48 flex-shrink-0 rounded-xl overflow-hidden aspect-[16/10] md:aspect-auto bg-bg-tertiary">
                          <img
                            src={article.cover}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {cat && (
                              <span
                                className="chip !text-[11px] !py-0.5 font-medium"
                                style={{
                                  backgroundColor: `${cat.color}15`,
                                  color: cat.color,
                                  borderColor: `${cat.color}40`,
                                }}
                              >
                                {cat.name}
                              </span>
                            )}
                            {article.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[11px] text-text-tertiary font-mono"
                              >
                                #{highlight(t, q)}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-display font-bold text-lg md:text-xl text-text-primary group-hover:gradient-text transition-all mb-2 leading-snug">
                            {highlight(article.title, q)}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
                            {highlight(article.summary, q)}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-text-tertiary">
                            <span>{formatDate(article.publishDate, 'short')}</span>
                            <span>阅读 {article.readingTime} 分钟</span>
                            <span className="hidden sm:inline">
                              {article.views.toLocaleString()} 阅读
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </>
      ) : (
        /* Empty State - Popular Articles */
        <section>
          <h2 className="section-title">
            <TrendingUp className="w-6 h-6 text-accent-danger" />
            试试看看热门文章
          </h2>
          <div className="glass-card p-6 md:p-8">
            <ul className="space-y-5">
              {popular.map((article, idx) => (
                <li key={article.id}>
                  <Link
                    to={`/article/${article.id}`}
                    className="group flex gap-5 p-3 -mx-3 rounded-xl hover:bg-bg-tertiary/50 transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono flex-shrink-0 ${
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <FileText className="w-4 h-4 text-text-tertiary mt-1 flex-shrink-0 hidden sm:block" />
                        <p className="font-medium text-text-primary group-hover:text-accent-secondary transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-tertiary">
                        <span>{formatDate(article.publishDate, 'relative')}</span>
                        <span>{article.readingTime} 分钟阅读</span>
                        <span>{article.views.toLocaleString()} 阅读</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
