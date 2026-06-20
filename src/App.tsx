import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryArticlesPage from "@/pages/CategoryArticlesPage";
import TagsPage from "@/pages/TagsPage";
import TagArticlesPage from "@/pages/TagArticlesPage";
import ArchivePage from "@/pages/ArchivePage";
import AboutPage from "@/pages/AboutPage";
import SearchPage from "@/pages/SearchPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryArticlesPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/tag/:slug" element={<TagArticlesPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={
            <div className="glass-card p-16 text-center animate-fade-in-up">
              <h3 className="font-display font-bold text-4xl mb-4 gradient-text">404</h3>
              <p className="text-text-secondary mb-6">页面不存在</p>
              <a href="/" className="btn-primary inline-flex">返回首页</a>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
