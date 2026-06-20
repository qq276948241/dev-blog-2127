import { Link } from 'react-router-dom';
import {
  Layers,
  FileText,
  ArrowRight,
  Layout,
  Server,
  Database,
  Container,
  Binary,
  Wrench,
} from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout, Server, Database, Container, Binary, Wrench, Layers,
};

export default function CategoriesPage() {
  const { categories, articles } = useBlogStore();

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Page Header */}
      <section className="glass-card p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text">文章分类</h1>
          </div>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            共 <span className="text-accent-secondary font-mono font-bold">{categories.length}</span> 个分类，
            <span className="text-accent-primary font-mono font-bold"> {articles.length}</span> 篇技术文章，
            按主题分类浏览，快速找到你感兴趣的内容。
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Layers;
            const catArticles = articles.filter((a) => a.category === cat.slug);
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group glass-card glass-card-hover p-6 md:p-7 relative overflow-hidden"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${cat.color}12, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-glow-lg group-hover:-translate-y-1"
                      style={{
                        backgroundColor: `${cat.color}18`,
                        color: cat.color,
                        border: `1px solid ${cat.color}35`,
                        boxShadow: `0 0 30px ${cat.color}15`,
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h3 className="font-display font-bold text-xl text-text-primary group-hover:gradient-text transition-all">
                          {cat.name}
                        </h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                          style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                        >
                          {catArticles.length} 篇
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Preview Articles */}
                  {catArticles.length > 0 && (
                    <div className="pt-4 border-t border-border-subtle space-y-2">
                      {catArticles.slice(0, 3).map((article) => (
                        <div
                          key={article.id}
                          className="flex items-center gap-3 text-sm group/article"
                        >
                          <FileText className="w-3.5 h-3.5 text-text-muted flex-shrink-0 group-hover/article:text-accent-secondary transition-colors" />
                          <span className="text-text-secondary group-hover/article:text-text-primary transition-colors line-clamp-1">
                            {article.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-end text-sm text-text-tertiary group-hover:text-accent-secondary transition-colors">
                    <span className="flex items-center gap-1 font-medium">
                      浏览全部
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
