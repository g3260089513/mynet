import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";

interface MdxWrapperProps {
  source: string;
}

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="font-heading text-display font-bold text-text-primary mt-12 mb-6" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="font-heading text-h2 font-bold text-text-primary mt-10 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="font-heading text-h3 font-bold text-text-primary mt-8 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props}>{children}</p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-gold-400 underline decoration-gold-400/30 hover:decoration-gold-400 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-text-secondary" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-2 border-gold-400 pl-4 italic text-text-muted my-4" {...props}>{children}</blockquote>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-surface-elevated text-gold-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-surface-elevated border border-border-subtle rounded-xl p-4 overflow-x-auto mb-4 text-sm" {...props}>{children}</pre>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-text-primary font-semibold" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-text-primary" {...props}>{children}</em>
  ),
  hr: (props) => (
    <hr className="border-border-subtle my-8" {...props} />
  ),
  img: ({ src, alt, ...props }) => (
    <img src={src} alt={alt ?? ""} className="rounded-xl w-full my-6" {...props} />
  ),
};

export async function MdxWrapper({ source }: MdxWrapperProps) {
  return (
    <div className="prose-container">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
