export function formatDate(dateStr: string, format: 'full' | 'short' | 'relative' = 'full'): string {
  const date = new Date(dateStr);
  const now = new Date();

  if (format === 'relative') {
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    if (days < 7) return `${days} 天前`;
    if (days < 30) return `${Math.floor(days / 7)} 周前`;
    if (days < 365) return `${Math.floor(days / 30)} 个月前`;
    return `${Math.floor(days / 365)} 年前`;
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  if (format === 'short') return `${y}-${m}-${d}`;
  return `${y}年${m}月${d}日`;
}

export function groupByYearMonth(articles: { publishDate: string }[]) {
  const groups: Record<string, typeof articles> = {};

  for (const article of articles) {
    const date = new Date(article.publishDate);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(article);
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, items]) => ({
      year: key.split('-')[0],
      month: key.split('-')[1],
      label: `${key.split('-')[0]}年${parseInt(key.split('-')[1])}月`,
      items,
    }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const regex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}
