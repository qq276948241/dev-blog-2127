import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Eye,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { useBlogStore } from '../store/useBlogStore';
import { groupByYearMonth, formatDate } from '../utils/date';

export default function ArchivePage() {
  const { articles } = useBlogStore();
  const groups = groupByYearMonth(articles);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set(groups.map((g) => g.year)),
  );
  const sortedArticles = [...articles].sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  // 按年份分组
  const yearGroups: Record<string, typeof groups> = {};
  groups.forEach((g) => {
    if (!yearGroups[g.year]) yearGroups[g.year] = [];
    yearGroups[g.year].push(g);
  });

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const years = Object.keys(yearGroups).sort((a, b) => b.localeCompare(a));

  const totalWords = sortedArticles.reduce((s, a) => s + (a.content.length / 2), 0).toFixed(0);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Page Header */}
      <section className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-accent-tertiary/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-tertiary to-accent-primary flex items-center justify-center shadow-glow">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text">时间归档</h1>
          </div>
          <p className="text-text-secondary max-w-2xl leading-relaxed mb-6">
            共 <span className="text-accent-primary font-mono font-bold">{articles.length}</span> 篇技术文章，
            <span className="text-accent-secondary font-mono font-bold"> {groups.length}</span> 个月的持续输出，
            记录技术学习的点点滴滴。
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border-subtle">
            {[
              { label: '最早发布', value: formatDate(sortedArticles[sortedArticles.length - 1].publishDate, 'short'), icon: Sparkles },
              { label: '最近更新', value: formatDate(sortedArticles[0].publishDate, 'short'), icon: Calendar },
              { label: '总阅读量', value: articles.reduce((s, a) => s + a.views, 0).toLocaleString(), icon: Eye },
              { label: '总字数', value: `${Math.round(Number(totalWords) / 1000)}K+`, icon: FileText },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-4 rounded-2xl bg-bg-tertiary/40 border border-border-subtle">
                  <Icon className="w-4 h-4 text-text-tertiary mb-2" />
                  <div className="font-display font-bold text-lg text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-tertiary">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="section-title">
          文章时间线
          <span className="ml-3 text-sm font-normal text-text-tertiary">按时间倒序排列</span>
        </h2>

        <div className="space-y-8">
          {years.map((year) => {
            const yearArticles = yearGroups[year].reduce(
              (acc, g) => acc + g.items.length,
              0,
            );
            const isExpanded = expandedYears.has(year);
            return (
              <div key={year}>
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between p-5 glass-card hover:bg-bg-tertiary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary/25 to-accent-secondary/15 border border-accent-primary/40 flex items-center justify-center text-accent-primary shadow-glow/30">
                      <span className="font-display font-bold text-lg">{year.slice(-2)}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-display font-bold text-2xl text-text-primary group-hover:gradient-text transition-all">
                        {year} 年
                      </h3>
                      <p className="text-sm text-text-tertiary">
                        {yearGroups[year].length} 个月，{yearArticles} 篇文章
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-text-tertiary group-hover:text-accent-secondary transition-colors">
                    <span className="text-sm hidden sm:inline">{isExpanded ? '收起' : '展开'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Months */}
                {isExpanded && (
                  <div className="mt-4 relative pl-6 md:pl-10">
                    <div className="absolute left-3 md:left-5 top-2 bottom-4 w-0.5 bg-gradient-to-b from-accent-primary via-accent-tertiary to-accent-secondary/30" />

                    <div className="space-y-6">
                      {yearGroups[year].map((monthGroup, monthIdx) => (
                        <div key={`${year}-${monthGroup.month}`} className="relative">
                          {/* Dot */}
                          <div className="absolute -left-[22px] md:-left-[30px] top-5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-bg-secondary border-2 border-accent-primary flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary" />
                          </div>
                          <div className="absolute -left-[22px] md:-left-[30px] top-5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent-primary/25 blur-md" />

                          <div className="glass-card glass-card-hover p-5 md:p-6">
                            <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-subtle">
                              <h4 className="font-display font-bold text-lg text-text-primary">
                                {monthGroup.label}
                              </h4>
                              <span className="chip bg-bg-tertiary border border-border text-text-tertiary font-mono text-xs">
                                {monthGroup.items.length} 篇
                              </span>
                            </div>

                            <ul className="space-y-3.5">
                              {monthGroup.items.map((article, articleIdx) => (
                                <li key={(article as any).id}>
                                  <Link
                                    to={`/article/${(article as any).id}`}
                                    className="group flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-bg-tertiary/50 transition-all duration-200"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-tertiary group-hover:text-accent-secondary group-hover:bg-accent-primary/10 transition-all">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-text-primary group-hover:text-accent-secondary transition-colors line-clamp-2 leading-snug mb-1.5">
                                        {(article as any).title}
                                      </div>
                                      <div className="flex items-center gap-4 text-xs text-text-tertiary">
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {(article as any).readingTime} 分钟
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Eye className="w-3 h-3" />
                                          {(article as any).views.toLocaleString()}
                                        </span>
                                        <span>
                                          {(article as any).tags?.slice(0, 2)?.map((t: string) => `#${t}`).join(' ')}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="hidden sm:block text-xs text-text-muted group-hover:text-accent-secondary transition-colors">
                                      #{(monthIdx + 1)}-{(articleIdx + 1)}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
