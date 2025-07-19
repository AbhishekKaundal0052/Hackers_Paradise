'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SEOPreviewProps {
  title: string;
  excerpt: string;
  content: string;
}

export const SEOPreview: React.FC<SEOPreviewProps> = ({ title, excerpt, content }) => {
  const getSEOScore = () => {
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Title analysis
    if (title.length < 30) {
      issues.push('Title is too short (aim for 50-60 characters)');
    } else if (title.length > 60) {
      issues.push('Title is too long (aim for 50-60 characters)');
    } else {
      score += 25;
      suggestions.push('Title length is good');
    }

    // Excerpt analysis
    if (excerpt.length < 120) {
      issues.push('Excerpt is too short (aim for 150-160 characters)');
    } else if (excerpt.length > 160) {
      issues.push('Excerpt is too long (aim for 150-160 characters)');
    } else {
      score += 25;
      suggestions.push('Excerpt length is good');
    }

    // Content analysis
    const wordCount = content.split(' ').length;
    if (wordCount < 300) {
      issues.push('Content is too short (aim for at least 300 words)');
    } else {
      score += 25;
      suggestions.push('Content length is good');
    }

    // Keyword density (basic check)
    const commonKeywords = ['security', 'cybersecurity', 'hacking', 'vulnerability', 'penetration', 'testing'];
    const contentLower = content.toLowerCase();
    const keywordCount = commonKeywords.filter(keyword => contentLower.includes(keyword)).length;
    
    if (keywordCount >= 2) {
      score += 25;
      suggestions.push('Good keyword usage');
    } else {
      issues.push('Consider adding more relevant keywords');
    }

    return { score, issues, suggestions };
  };

  const { score, issues, suggestions } = getSEOScore();

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <Card className="bg-slate-800/80 border-slate-700">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4">SEO Score</h4>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold text-purple-400">{score}/100</div>
            <div className="flex-1">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs improvement'}
          </div>
        </CardContent>
      </Card>

      {/* Search Preview */}
      <Card className="bg-slate-800/80 border-slate-700">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Search Preview</h4>
          <div className="bg-white text-black p-4 rounded">
            <div className="text-blue-600 text-sm mb-1">hackersparadise.com › blog</div>
            <div className="text-blue-800 font-medium text-lg mb-1 line-clamp-1">
              {title || 'Your post title will appear here'}
            </div>
            <div className="text-green-700 text-sm mb-1">
              {excerpt || 'Your post excerpt will appear here'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {issues.length > 0 && (
        <Card className="bg-slate-800/80 border-slate-700">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              Issues to Fix
            </h4>
            <ul className="space-y-2">
              {issues.map((issue, index) => (
                <li key={index} className="text-red-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="bg-slate-800/80 border-slate-700">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              What&apos;s Working
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-green-300 text-sm flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-slate-800/80 border-slate-700">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            SEO Tips
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Use relevant keywords naturally in your content</li>
            <li>• Include internal and external links</li>
            <li>• Optimize images with descriptive alt text</li>
            <li>• Use proper heading structure (H1, H2, H3)</li>
            <li>• Keep paragraphs short and readable</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}; 