import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { List } from 'lucide-react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <Card className="bg-slate-800/80 border-slate-700 sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Table of Contents</h3>
        </div>
        <nav>
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left w-full hover:text-purple-400 transition-colors ${
                    heading.level === 1 ? 'text-white font-semibold' :
                    heading.level === 2 ? 'text-gray-300 ml-4' :
                    'text-gray-400 ml-8 text-sm'
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}; 