import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Layers,
  Tags,
  Archive,
  User,
  Search,
  Menu,
  X,
  Code2,
} from 'lucide-react';
import { useBlogStore } from '../../store/useBlogStore';
import { useScrollProgress } from '../../hooks/useTypewriter';
import { cn } from '../../lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { profile } = useBlogStore();
  const progress = useScrollProgress();

  const navItems = [
    { to: '/', label: '首页', icon: Home },
    { to: '/categories', label: '分类', icon: Layers },
    { to: '/tags', label: '标签', icon: Tags },
    { to: '/archive', label: '归档', icon: Archive },
    { to: '/about', label: '关于我', icon: User },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
      setSearchOpen(false);
      setKeyword('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/70 border-b border-border-subtle">
        <div className="h-0.5 bg-gradient-to-r from-accent-primary via-accent-tertiary to-accent-secondary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-lg gradient-text">{profile.name}</div>
                <div className="text-[10px] text-text-tertiary tracking-widest uppercase">{profile.title}</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200 group flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4 group-hover:text-accent-secondary transition-colors" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200"
                aria-label="搜索"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200"
                aria-label="菜单"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-32 px-4 animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl glass-card p-2 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Search className="w-5 h-5 text-text-tertiary ml-4 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索文章标题、标签..."
                className="flex-1 bg-transparent px-2 py-4 text-lg outline-none placeholder-text-tertiary"
              />
              <button type="submit" className="btn-primary mr-2 !px-6 !py-2 text-sm">搜索</button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-72 bg-bg-secondary border-l border-border transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
            <div className="font-display font-bold text-lg gradient-text">导航菜单</div>
            <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-bg-tertiary">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
