import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-text-tertiary">
        显示 <span className="text-text-primary font-medium">{startItem}</span>{' '}
        - <span className="text-text-primary font-medium">{endItem}</span>{' '}
        条，共{' '}
        <span className="text-text-primary font-medium">{totalItems}</span>{' '}
        篇文章
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-bg-tertiary border border-border text-text-secondary hover:border-accent-primary/40 hover:text-accent-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">上一页</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-all ${
                  currentPage === page
                    ? 'bg-accent-primary/15 border border-accent-primary/40 text-accent-secondary shadow-glow/20'
                    : 'bg-bg-tertiary border border-border text-text-secondary hover:border-accent-primary/40 hover:text-accent-secondary'
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={idx}
                className="w-10 h-10 flex items-center justify-center text-text-tertiary"
              >
                {page}
              </span>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-bg-tertiary border border-border text-text-secondary hover:border-accent-primary/40 hover:text-accent-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline">下一页</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
