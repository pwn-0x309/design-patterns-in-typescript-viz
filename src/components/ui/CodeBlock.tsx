import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', fontSize: '0.9rem' }}>
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.5rem', background: '#1e1e1e' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
