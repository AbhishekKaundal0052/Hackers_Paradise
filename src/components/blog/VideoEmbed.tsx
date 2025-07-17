import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Video, Play } from 'lucide-react';

interface VideoEmbedProps {
  onClose: () => void;
  onInsert: (embedCode: string) => void;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');

  const generateEmbedCode = () => {
    if (!url.trim()) return;

    let embedCode = '';
    
    if (platform === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (videoId) {
        embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      }
    } else if (platform === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      if (videoId) {
        embedCode = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
      }
    } else if (platform === 'custom') {
      embedCode = url;
    }

    if (embedCode) {
      onInsert(embedCode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-slate-800/80 border-slate-700 w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Embed Video</h3>
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
              <label className="block text-gray-300 mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                title="Video Platform"
                className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="custom">Custom Embed</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                {platform === 'custom' ? 'Embed Code' : 'Video URL'}
              </label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  platform === 'youtube' ? 'https://www.youtube.com/watch?v=...' :
                  platform === 'vimeo' ? 'https://vimeo.com/...' :
                  '<iframe src="..."></iframe>'
                }
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={generateEmbedCode} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Insert Video
              </Button>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            </div>

            <div className="text-xs text-gray-400">
              {platform === 'youtube' && 'Paste a YouTube video URL'}
              {platform === 'vimeo' && 'Paste a Vimeo video URL'}
              {platform === 'custom' && 'Paste custom embed code (iframe)'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 