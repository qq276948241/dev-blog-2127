import { Link } from 'react-router-dom';
import { Github, Mail, BookOpen, MessageCircle, Coffee, Heart } from 'lucide-react';
import { useBlogStore } from '../../store/useBlogStore';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Mail,
  BookOpen,
  MessageCircle,
};

export default function Footer() {
  const { profile, articles, categories, tags } = useBlogStore();

  return (
    <footer className="mt-20 border-t border-border-subtle bg-bg-secondary/40 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="font-display font-bold text-xl gradient-text mb-3">{profile.name}</div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
              {profile.bio}
            </p>
            <div className="flex items-center gap-3">
              {profile.social.map((s) => {
                const Icon = iconMap[s.icon] || Github;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-secondary hover:border-accent-primary/40 hover:shadow-glow/20 transition-all duration-300"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">快速导航</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: '首页' },
                { to: '/categories', label: '文章分类' },
                { to: '/tags', label: '标签云' },
                { to: '/archive', label: '时间归档' },
                { to: '/about', label: '关于我' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-text-secondary hover:text-accent-secondary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">博客数据</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-text-secondary">
                <span>文章总数</span>
                <span className="font-mono text-accent-secondary">{articles.length}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>分类数量</span>
                <span className="font-mono text-accent-secondary">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>标签数量</span>
                <span className="font-mono text-accent-secondary">{tags.length}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>累计阅读</span>
                <span className="font-mono text-accent-secondary">
                  {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} {profile.name}. Built with
            <span className="flex items-center gap-1 mx-1">
              <Heart className="w-3.5 h-3.5 text-accent-danger fill-accent-danger/30" />
            </span>
            using React + TailwindCSS
          </p>
          <p className="flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-accent-warm" />
            Powered by pure caffeine and endless curiosity
          </p>
        </div>
      </div>
    </footer>
  );
}
