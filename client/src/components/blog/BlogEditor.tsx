'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ content, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {content.length} characters • {content.split(' ').length} words
        </div>
        <div className="text-xs text-gray-500">
          Markdown supported
        </div>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your post... Use markdown for formatting:

# Heading 1
## Heading 2
**Bold text**
*Italic text*
`inline code`
```python
# code block
print('Hello World')
```
- List item
1. Numbered item

[Link text](url)
![Alt text](image-url)"
        rows={20}
        className="bg-slate-900 border-slate-700 text-white font-mono text-sm resize-none"
      />
    </div>
  );
}; 