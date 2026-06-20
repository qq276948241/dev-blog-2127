import { Link, useParams } from 'react-router-dom';
import { Layers, ChevronLeft, BookOpen, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import ArticleCard from '../components/article/ArticleCard';

export default function CategoryArticlesPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categories, articles } = useBlogStore();
  const category = categories.find((c) => c.slug === slug);
  const categoryArticles = articles.filter((a) => a.category === slug);

  if (!category) {
    return (
      <div className="glass-card p-16 text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
          <Layers className="w-10 h-10" />
        </div>
        <h3 className="font-display font-semibold text-xl mb-2">分类不存在</h3>
        <p className="text-text-secondary mb-6">您访问的分类不存在或已被移除</p>
        <Link to="/categories" className="btn-primary">返回分类列表</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-tertiary">
        <Link to="/" className="hover:text-accent-secondary transition-colors">首页</Link>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <Link to="/categories" className="hover:text-accent-secondary transition-colors">分类</Link>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-text-primary">{category.name}</span>
      </div>

      {/* Category Header */}
      <section className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 80% at 100% 0%, ${category.color}18, transparent 60%)` }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-glow animate-float"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
              border: `2px solid ${category.color}45`,
            }}
          >
            <Layers className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: category.color }}>
              {category.name}
            </h1>
            <p className="text-text-secondary max-w-2xl leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>共 <span className="font-mono font-bold text-text-primary">{categoryArticles.length}</span> 篇文章</span>
              </span>
              <span className="flex items-center gap-2">
                <span>累计阅读 <span className="font-mono font-bold text-text-primary">{categoryArticles.reduce((s, a) => s + a.views, 0).toLocaleString()}</span> 次</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section>
        <h2 className="section-title">
          该分类下的文章
          <span className="ml-3 text-sm font-normal text-text-tertiary">
            最新发布优先
          </span>
        </h2>

        {categoryArticles.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">该分类暂无文章</h3>
            <p className="text-text-secondary mb-6">敬请期待更多精彩内容</p>
            <Link to="/" className="btn-primary">浏览全部文章</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryArticles.map((article, idx) => (
              <ArticleCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Back to categories */}
      <Link
        to="/categories"
        className="inline-flex items-center gap-2 text-sm chip-outline"
      >
        <ChevronLeft className="w-4 h-4" />
        返回所有分类
        <ArrowRight className="w-3 h-3 hidden" />
      </Link>
    </div>
  );
}
