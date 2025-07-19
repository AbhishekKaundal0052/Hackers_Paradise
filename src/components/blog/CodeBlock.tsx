'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Code } from 'lucide-react';

interface CodeBlockProps {
  onClose: () => void;
  onInsert: (code: string) => void;
}

const languageOptions = [
  'javascript', 'python', 'java', 'cpp', 'csharp', 'php', 'ruby', 'go',
  'rust', 'swift', 'kotlin', 'typescript', 'html', 'css', 'sql', 'bash',
  'powershell', 'yaml', 'json', 'xml', 'markdown', 'dockerfile'
];

export const CodeBlock: React.FC<CodeBlockProps> = ({ onClose, onInsert }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleInsert = () => {
    if (code.trim()) {
      const codeBlock = `\`\`\`${language}\n${code}\n\`\`\``;
      onInsert(codeBlock);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-slate-800/80 border-slate-700 w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Insert Code Block</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                title="Programming Language"
                className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
              >
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Code</label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={15}
                className="bg-slate-900 border-slate-700 text-white font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleInsert} className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Insert Code Block
              </Button>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 