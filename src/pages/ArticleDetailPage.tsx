import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  Share2,
  List,
  Layers,
  Tag,
  MessageSquare,
} from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { formatDate, extractHeadings } from '../utils/date';
import MarkdownView from '../components/markdown/MarkdownView';
import ArticleCard from '../components/article/ArticleCard';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById, getRelatedArticles, categories, tags, incrementViews, articles } = useBlogStore();
  const article = id ? getArticleById(id) : undefined;
  const related = id ? getRelatedArticles(id, 3) : [];
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [showToc, setShowToc] = useState(true);

  const category = categories.find((c) => c.slug === article?.category);
  const articleTags = tags.filter((t) => article?.tags.includes(t.name));
  const headings = article ? extractHeadings(article.content) : [];

  // 相邻文章
  const currentIndex = articles.findIndex((a) => a.id === id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  useEffect(() => {
    if (id) incrementViews(id);
  }, [id, incrementViews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px', threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, article?.id]);

  if (!article) {
    return (
      <div className="glass-card p-16 text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted">
          <BookOpen className="w-10 h-10" />
        </div>
        <h3 className="font-display font-semibold text-xl text-text-primary mb-2">文章不存在</h3>
        <p className="text-text-secondary mb-6">您访问的文章可能已被删除或不存在</p>
        <Link to="/" className="btn-primary">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-secondary transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        返回上一页
      </button>

      {/* Article Header */}
      <article className="glass-card overflow-hidden">
        {/* Cover */}
        <div className="relative aspect-[21/9] overflow-hidden bg-bg-tertiary">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            {category && (
              <Link
                to={`/category/${category.slug}`}
                className="inline-flex items-center gap-2 chip mb-5"
                style={{
                  backgroundColor: `${category.color}15`,
                  borderColor: `${category.color}50`,
                  color: category.color,
                  boxShadow: `0 0 20px ${category.color}20`,
                }}
              >
                <Layers className="w-3 h-3" />
                {category.name}
              </Link>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-5">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishDate, 'full')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                阅读时长 {article.readingTime} 分钟
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} 阅读
              </span>
            </div>
          </div>
        </div>

        {/* TOC Toggle (mobile) */}
        <div className="lg:hidden px-6 md:px-10 pt-6">
          <button
            onClick={() => setShowToc(!showToc)}
            className="flex items-center gap-2 text-sm chip-outline"
          >
            <List className="w-4 h-4" />
            文章目录
            <ChevronRight className={`w-3 h-3 transition-transform ${showToc ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Content with TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-10 py-8 md:py-12">
          <div className="lg:col-span-9 order-2 lg:order-1">
            {/* Tags */}
            {articleTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-border-subtle">
                <span className="text-xs text-text-tertiary flex items-center gap-1.5 mr-1">
                  <Tag className="w-3.5 h-3.5" />
                  标签
                </span>
                {articleTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className="chip-outline text-xs"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Markdown Content */}
            <MarkdownView content={article.content} />

            {/* Bottom tags + share */}
            <div className="mt-12 pt-8 border-t border-border-subtle">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-tertiary">觉得有帮助？</span>
                  <button className="chip-outline text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    评论功能开发中
                  </button>
                </div>
                <button className="chip-outline text-xs">
                  <Share2 className="w-3.5 h-3.5" />
                  分享文章
                </button>
              </div>
            </div>
          </div>

          {/* TOC Sidebar */}
          {showToc && (
            <nav className="lg:col-span-3 order-1 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-4 h-4 text-accent-secondary" />
                    <span className="font-display font-semibold text-sm">文章目录</span>
                  </div>
                  {headings.length === 0 ? (
                    <p className="text-xs text-text-tertiary">暂无目录</p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {headings.map((h) => (
                        <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                          <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              setActiveHeading(h.id);
                            }}
                            className={`block py-1.5 px-3 rounded-lg transition-all duration-200 ${
                              activeHeading === h.id
                                ? 'bg-accent-primary/15 text-accent-secondary border-l-2 border-accent-primary pl-2.5'
                                : 'text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary/50 border-l-2 border-transparent'
                            }`}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </article>

      {/* Prev / Next */}
      {(prevArticle || nextArticle) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              to={`/article/${prevArticle.id}`}
              className="group glass-card glass-card-hover p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center flex-shrink-0 text-text-tertiary group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-text-tertiary mb-1">上一篇</div>
                <div className="font-medium text-text-primary group-hover:text-accent-secondary transition-colors line-clamp-2">
                  {prevArticle.title}
                </div>
              </div>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link
              to={`/article/${nextArticle.id}`}
              className="group glass-card glass-card-hover p-5 flex items-start gap-4 md:justify-end"
            >
              <div className="min-w-0 text-right">
                <div className="text-xs text-text-tertiary mb-1">下一篇</div>
                <div className="font-medium text-text-primary group-hover:text-accent-secondary transition-colors line-clamp-2">
                  {nextArticle.title}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center flex-shrink-0 text-text-tertiary group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section>
          <h2 className="section-title">
            相关推荐
            <span className="ml-3 text-sm font-normal text-text-tertiary">
              根据分类和标签智能推荐
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a, idx) => (
              <ArticleCard key={a.id} article={a} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
