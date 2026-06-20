import { Link, useParams } from 'react-router-dom';
import { Hash, ChevronLeft, BookOpen } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import ArticleCard from '../components/article/ArticleCard';

export default function TagArticlesPage() {
  const { slug } = useParams<{ slug: string }>();
  const { tags, articles } = useBlogStore();
  const tag = tags.find((t) => t.slug === slug);
  const tagArticles = articles.filter((a) => a.tags.includes(tag?.name || ''));

  if (!tag) {
    return (
      <div className="glass-card p-16 text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
          <Hash className="w-10 h-10" />
        </div>
        <h3 className="font-display font-semibold text-xl mb-2">标签不存在</h3>
        <p className="text-text-secondary mb-6">您访问的标签不存在或已被移除</p>
        <Link to="/tags" className="btn-primary">返回标签云</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-tertiary">
        <Link to="/" className="hover:text-accent-secondary transition-colors">首页</Link>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <Link to="/tags" className="hover:text-accent-secondary transition-colors">标签</Link>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-text-primary">#{tag.name}</span>
      </div>

      {/* Tag Header */}
      <section className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-accent-secondary/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-accent-secondary/25 to-accent-primary/15 border-2 border-accent-secondary/40 flex items-center justify-center shadow-glow-cyan animate-float">
            <Hash className="w-10 h-10 md:w-12 md:h-12 text-accent-secondary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="chip bg-accent-secondary/15 border border-accent-secondary/40 text-accent-secondary font-bold">
                标签筛选
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-accent-secondary">
                #{tag.name}
              </h1>
            </div>
            <p className="text-text-secondary max-w-2xl leading-relaxed mb-4">
              所有带有 <span className="text-accent-secondary font-medium">#{tag.name}</span> 标签的技术文章集合，
              帮你快速找到相关的学习内容。
            </p>
            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>共 <span className="font-mono font-bold text-text-primary">{tagArticles.length}</span> 篇文章</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section>
        <h2 className="section-title">
          带 <span className="text-accent-secondary">#{tag.name}</span> 的文章
        </h2>

        {tagArticles.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">该标签暂无文章</h3>
            <p className="text-text-secondary mb-6">敬请期待更多精彩内容</p>
            <Link to="/tags" className="btn-primary">浏览所有标签</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tagArticles.map((article, idx) => (
              <ArticleCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Back to tags */}
      <Link to="/tags" className="inline-flex items-center gap-2 text-sm chip-outline">
        <ChevronLeft className="w-4 h-4" />
        返回所有标签
      </Link>
    </div>
  );
}
