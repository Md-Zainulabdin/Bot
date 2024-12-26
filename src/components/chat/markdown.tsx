import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyButton } from "@/components/copy-to-clipboard";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        // Override pre and code elements to prevent nesting issues
        pre: (props) => (
          <pre
            className="relative my-4 overflow-auto rounded-lg bg-muted p-4"
            {...props}
          />
        ),
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          if (!inline && language) {
            return (
              <div className="relative">
                <SyntaxHighlighter
                  style={dracula}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.5rem",
                    background: "var(--muted)",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <CopyButton text={String(children)} code={true} />
              </div>
            );
          }

          return (
            <code
              className={`rounded-md bg-muted px-1.5 py-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 ${className || ""}`}
              {...props}
            >
              {children}
            </code>
          );
        },
        // Ensure proper paragraph handling
        p: ({ children }) => <span className="mb-4 block">{children}</span>,
        // Handle other block elements that shouldn't be nested in paragraphs
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-muted pl-4 italic">
            {children}
          </blockquote>
        ),
        // Proper list handling
        ul: ({ children }) => (
          <ul className="mb-4 list-disc pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal pl-6">{children}</ol>
        ),
      }}
      className="break-words"
    >
      {children}
    </ReactMarkdown>
  );
}
