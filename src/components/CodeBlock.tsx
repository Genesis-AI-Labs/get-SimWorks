import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  isStreaming?: boolean;
}

const CodeBlock = ({ code, language, isStreaming = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#1e1e1e] rounded-lg overflow-hidden my-4 border border-[#333333]">
      <div className="flex items-center justify-between bg-[#1a1a1a] px-4 py-2 text-sm border-b border-[#333333]">
        <span className="text-[#e0e0e0]">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-[#9e9e9e] hover:text-[#e0e0e0] h-6 px-2 hover:bg-[#2a2a2a]"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span className="ml-1 text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-[#cfcfcf] font-mono leading-relaxed">
          {code}
          {isStreaming && <span className="inline-block w-2 h-4 bg-[#2563eb] animate-pulse ml-1"></span>}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
