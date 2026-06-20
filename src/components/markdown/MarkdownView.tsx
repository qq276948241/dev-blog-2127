import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, FileCode } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
}

const customOneDark = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: '1rem 1.25rem',
    borderRadius: 0,
    fontSize: '0.85rem',
    lineHeight: '1.7',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: 'JetBrains Mono, Fira Code, monospace',
    fontSize: '0.85rem',
  },
};

function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border-subtle bg-bg-tertiary/80 shadow-card">
      <div className="flex items-center justify-between px-4 py-2.5 bg-bg-hover/60 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-text-tertiary" />
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
            {language || 'code'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-danger/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-warm/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-success/70" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-text-tertiary hover:text-accent-secondary hover:bg-bg-tertiary transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-accent-success" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              复制
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={customOneDark}
        showLineNumbers
        customStyle={{
          background: 'transparent',
          margin: 0,
          padding: 0,
        }}
        lineNumberStyle={{
          minWidth: '2.5rem',
          paddingRight: '1rem',
          color: '#52525b',
          textAlign: 'right',
          userSelect: 'none',
          fontSize: '0.8rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function Heading({
  id,
  level,
  children,
}: {
  id?: string;
  level: number;
  children?: React.ReactNode;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const content = typeof children === 'string' ? children : '';
  const headingId = id || content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <Tag id={headingId} className="scroll-mt-24">
      {children}
    </Tag>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-bg-tertiary text-accent-secondary px-1.5 py-0.5 rounded-md font-mono text-sm border border-border-subtle">
      {children}
    </code>
  );
}

function Link({ href, children }: { href?: string; children: React.ReactNode }) {
  const isExternal = href?.startsWith('http');
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent-secondary underline decoration-accent-secondary/30 underline-offset-2 hover:decoration-accent-secondary transition-all"
      >
        {children}
      </a>
    );
  }
  return (
    <a href={href} className="text-accent-secondary underline decoration-accent-secondary/30 underline-offset-2 hover:decoration-accent-secondary transition-all">
      {children}
    </a>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 pl-5 py-4 border-l-4 border-accent-primary/60 bg-accent-primary/5 rounded-r-xl text-text-secondary italic">
      {children}
    </blockquote>
  );
}

function Image({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="rounded-xl border border-border-subtle shadow-card w-full"
        loading="lazy"
      />
      {alt && (
        <figcaption className="mt-3 text-xs text-center text-text-tertiary">{alt}</figcaption>
      )}
    </figure>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-border-subtle">
      <table className="w-full">{children}</table>
    </div>
  );
}

export default function MarkdownView({ content }: MarkdownViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="prose-custom max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          h4: (props) => <Heading level={4} {...props} />,
          code: ({ inline, className, children, ...props }: any) =>
            inline ? (
              <InlineCode {...props}>{children}</InlineCode>
            ) : (
              <CodeBlock className={className} {...props}>
                {children}
              </CodeBlock>
            ),
          a: Link,
          blockquote: Blockquote,
          img: Image,
          table: Table,
          thead: ({ children }) => <thead className="bg-bg-tertiary">{children}</thead>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-text-primary border-b border-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-border-subtle text-text-secondary">
              {children}
            </td>
          ),
          ul: ({ children }) => <ul className="my-5 ml-6 space-y-2 text-text-secondary list-disc marker:text-accent-primary">{children}</ul>,
          ol: ({ children }) => <ol className="my-5 ml-6 space-y-2 text-text-secondary list-decimal marker:text-accent-primary marker:font-mono">{children}</ol>,
          hr: () => <hr className="my-10 border-border-subtle" />,
          p: ({ children }) => <p className="my-5 text-text-secondary leading-7">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
          em: ({ children }) => <em className="text-text-primary">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
