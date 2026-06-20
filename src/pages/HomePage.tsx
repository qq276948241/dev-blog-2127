import { Link } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Github,
  Mail,
  Code,
  Zap,
  Terminal,
  Braces,
} from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { useTypewriter } from '../hooks/useTypewriter';
import ArticleCard from '../components/article/ArticleCard';
import FilterBar from '../components/article/FilterBar';

export default function HomePage() {
  const { profile, getFilteredArticles, articles } = useBlogStore();
  const filtered = getFilteredArticles();
  const typed = useTypewriter(profile.signature, 90, 800);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Hero Section */}
      <section className="glass-card p-8 md:p-12 relative overflow-hidden mb-2">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gradient-to-tr from-accent-secondary/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none">
            <div className="absolute inset-0 border border-accent-primary/10 rounded-full animate-pulse-slow" />
            <div className="absolute inset-8 border border-accent-secondary/10 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-20 border border-accent-tertiary/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary via-accent-tertiary to-accent-secondary rounded-3xl blur-xl opacity-50 animate-pulse-slow" />
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-2 border-accent-primary/40 bg-bg-tertiary animate-float">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '0.5s' }}>
                <Braces className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="chip bg-accent-success/15 border border-accent-success/40 text-accent-success">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success" />
                  </span>
                  在线状态
                </span>
                <span className="chip bg-bg-tertiary border border-border text-text-secondary">
                  <Sparkles className="w-3 h-3 text-accent-warm" />
                  {articles.length} 篇原创文章
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                你好，我是{' '}
                <span className="gradient-text">{profile.name}</span>
              </h1>

              <div className="h-8 mb-4">
                <span className="font-mono text-sm md:text-base text-text-secondary">
                  <span className="text-accent-primary">const</span>{' '}
                  <span className="text-accent-secondary">signature</span>{' '}
                  <span className="text-text-tertiary">=</span>{' '}
                  <span className="text-accent-warm">"</span>
                  <span className="text-text-primary">{typed}</span>
                  <span className="text-accent-warm">"</span>
                  <span className="inline-block w-2 h-5 ml-1 -mb-1 bg-accent-primary animate-typewriter" style={{ borderBottom: '0', animation: 'blink 0.8s step-end infinite' }} />
                </span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/categories" className="btn-primary">
                  <BookOpen className="w-4 h-4" />
                  浏览文章
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  <Code className="w-4 h-4" />
                  关于我
                </Link>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-secondary"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-secondary"
                >
                  <Mail className="w-4 h-4" />
                  联系我
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-border-subtle">
            {[
              { label: '发布文章', value: articles.length, icon: BookOpen, color: 'text-accent-primary' },
              { label: '累计阅读', value: articles.reduce((s, a) => s + a.views, 0).toLocaleString(), icon: Zap, color: 'text-accent-secondary' },
              { label: '技术标签', value: useBlogStore.getState().tags.length, icon: Code, color: 'text-accent-tertiary' },
              { label: '编写行数', value: '50,000+', icon: Terminal, color: 'text-accent-warm' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group p-4 rounded-2xl bg-bg-tertiary/40 border border-border-subtle hover:bg-bg-tertiary hover:border-accent-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-bg-hover flex items-center justify-center mb-3 group-hover:shadow-glow/30 transition-all ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-bold text-2xl text-text-primary group-hover:gradient-text transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-tertiary mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar />

      {/* Articles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title !mb-0">
            <span>文章列表</span>
            <span className="ml-3 text-sm font-normal text-text-tertiary">
              共 {filtered.length} 篇
            </span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
              暂无匹配的文章
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              尝试调整筛选条件或重置筛选
            </p>
            <button
              onClick={() => useBlogStore.getState().resetFilter()}
              className="btn-primary !py-2 text-sm"
            >
              重置筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article, idx) => (
              <ArticleCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
