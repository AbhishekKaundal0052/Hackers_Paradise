'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Download, 
  Copy, 
  RotateCcw, 
  Terminal, 
  Code,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeEditorProps {
  language: string;
  code: string;
  title?: string;
  onRun?: (code: string) => void;
  onSave?: (code: string) => void;
}

const syntaxHighlighting = {
  python: {
    keywords: ['def', 'import', 'from', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'return', 'True', 'False', 'None'],
    strings: /"[^"]*"|'[^']*'/g,
    comments: /#.*$/gm,
    numbers: /\b\d+\b/g
  },
  javascript: {
    keywords: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'return', 'class', 'import', 'export', 'default', 'async', 'await'],
    strings: /"[^"]*"|'[^']*'|`[^`]*`/g,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    numbers: /\b\d+\b/g
  },
  bash: {
    keywords: ['if', 'then', 'else', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'echo', 'exit', 'return'],
    strings: /"[^"]*"|'[^']*'/g,
    comments: /#.*$/gm,
    numbers: /\b\d+\b/g
  }
};

export default function CodeEditor({ 
  language, 
  code: initialCode, 
  title = 'Code Editor',
  onRun,
  onSave 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);

  const highlightSyntax = (code: string, lang: string) => {
    const rules = syntaxHighlighting[lang as keyof typeof syntaxHighlighting];
    if (!rules) return code;

    let highlighted = code;

    // Highlight keywords
    rules.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`);
    });

    // Highlight strings
    highlighted = highlighted.replace(rules.strings, '<span class="text-green-400">$&</span>');

    // Highlight comments
    highlighted = highlighted.replace(rules.comments, '<span class="text-gray-500 italic">$&</span>');

    // Highlight numbers
    highlighted = highlighted.replace(rules.numbers, '<span class="text-yellow-400">$&</span>');

    return highlighted;
  };

  const handleRun = async () => {
    if (!onRun) {
      setIsRunning(true);
      setHasError(false);
      await new Promise(resolve => setTimeout(resolve, 2000));
      let simulatedOutput = '';
      if (language === 'python') {
        if (code.includes('print')) {
          simulatedOutput = 'Port 22 is open\nPort 80 is open\nPort 443 is open\nFound 3 open ports';
        } else {
          simulatedOutput = 'Code executed successfully';
        }
      } else if (language === 'bash') {
        if (code.includes('nmap')) {
          simulatedOutput = 'Starting Nmap 7.80\nNmap scan report for 192.168.1.1\nHost is up (0.0005s latency).\nNot shown: 997 closed ports\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http\n443/tcp open  https';
        } else {
          simulatedOutput = 'Command executed successfully';
        }
      } else {
        simulatedOutput = 'Code executed successfully';
      }
      setOutput(simulatedOutput);
      setIsRunning(false);
    } else {
      onRun(code);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setHasError(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(code);
    }
    // Show success message
    console.log('Code saved successfully');
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'javascript':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'bash':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-primary" />
            <span>{title}</span>
            <Badge className={getLanguageColor(language)}>
              {language}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="cyber-button-secondary"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="cyber-button-secondary"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              className="cyber-button-secondary"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monaco Editor */}
        <div className="relative">
          <div className="bg-black/80 rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground ml-2">{title}</span>
              </div>
            </div>
            <div className="p-0">
              <MonacoEditor
                height="300px"
                language={language}
                value={code}
                theme="vs-dark"
                options={{ fontSize: 14, minimap: { enabled: false }, fontFamily: 'Fira Mono, monospace' }}
                onChange={v => setCode(v || '')}
              />
            </div>
          </div>
        </div>

        {/* Run Button */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="cyber-button"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>Code Execution</span>
          </div>
        </div>

        {/* Output */}
        {output && (
          <div className="bg-black/50 rounded-lg border border-white/10 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">Output</span>
              {hasError && <AlertCircle className="w-4 h-4 text-red-400" />}
            </div>
            <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-1">Pro Tip</h4>
              <p className="text-sm text-blue-300">
                {language === 'python' && 'Use the print() function to see your output. Try modifying the host IP address to scan different networks.'}
                {language === 'bash' && 'Make sure you have the necessary permissions to run network scanning tools. Always scan only networks you own or have permission to test.'}
                {language === 'javascript' && 'Use console.log() to debug your code. Check the browser console for output.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 