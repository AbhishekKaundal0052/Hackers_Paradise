'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BlogEditor } from '@/components/blog/BlogEditor';
import { ImageUpload } from '@/components/blog/ImageUpload';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { VideoEmbed } from '@/components/blog/VideoEmbed';
import { SEOPreview } from '@/components/blog/SEOPreview';
import { 
  Save, 
  Eye, 
  Send, 
  Image, 
  Code, 
  Video, 
  Settings,
  Tag,
  Calendar,
  User
} from 'lucide-react';

export default function CreateBlogPage() {
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'tutorial',
    tags: [] as string[],
    coverImage: '',
    isPublished: false
  });
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [showVideoEmbed, setShowVideoEmbed] = useState(false);

  const handleSave = () => {
    // TODO: Save as draft
    console.log('Saving draft:', form);
  };

  const handlePublish = () => {
    // TODO: Publish post
    console.log('Publishing post:', form);
  };

  const addTag = (tag: string) => {
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Post</h1>
          <p className="text-gray-300">Share your knowledge with the cybersecurity community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/80 border-slate-700 mb-6">
              <CardContent className="p-6">
                {/* Post Metadata */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <Input
                      value={form.title}
                      onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title..."
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Excerpt</label>
                    <Textarea
                      value={form.excerpt}
                      onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of your post..."
                      rows={3}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
                    >
                      <option value="tutorial">Tutorial</option>
                      <option value="research">Research</option>
                      <option value="case_study">Case Study</option>
                      <option value="news">News</option>
                      <option value="opinion">Opinion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.tags.map(tag => (
                        <Badge key={tag} className="bg-purple-700 text-white">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-300"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Add a tag and press Enter..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                </div>

                {/* Editor Tabs */}
                <div className="flex border-b border-slate-700 mb-6">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 ${activeTab === 'editor' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 ${activeTab === 'preview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('seo')}
                    className={`px-4 py-2 ${activeTab === 'seo' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
                  >
                    SEO
                  </button>
                </div>

                {/* Editor Toolbar */}
                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={() => setShowImageUpload(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Image className="w-4 h-4" />
                    Image
                  </Button>
                  <Button
                    onClick={() => setShowCodeBlock(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Code className="w-4 h-4" />
                    Code
                  </Button>
                  <Button
                    onClick={() => setShowVideoEmbed(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </Button>
                </div>

                {/* Content Area */}
                {activeTab === 'editor' && (
                  <BlogEditor
                    content={form.content}
                    onChange={(content) => setForm(prev => ({ ...prev, content }))}
                  />
                )}
                {activeTab === 'preview' && (
                  <div className="prose prose-invert max-w-none">
                    <div 
                      className="markdown-preview"
                      dangerouslySetInnerHTML={{ 
                        __html: form.content
                          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/`(.*?)`/g, '<code class="bg-slate-700 px-1 py-0.5 rounded">$1</code>')
                          .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 p-4 rounded overflow-x-auto"><code class="language-$1">$2</code></pre>')
                          .replace(/\n/g, '<br>')
                      }} 
                    />
                  </div>
                )}
                {activeTab === 'seo' && (
                  <SEOPreview
                    title={form.title}
                    excerpt={form.excerpt}
                    content={form.content}
                  />
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button
                onClick={handlePublish}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Publish
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cover Image */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>
                {form.coverImage ? (
                  <div className="relative">
                    <img 
                      src={form.coverImage} 
                      alt="Cover" 
                      className="w-full h-32 object-cover rounded" 
                    />
                    <button
                      onClick={() => setForm(prev => ({ ...prev, coverImage: '' }))}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setShowImageUpload(true)}
                    className="w-full h-32 border-2 border-dashed border-slate-600 rounded flex items-center justify-center text-gray-400 cursor-pointer hover:border-purple-500 hover:text-purple-400"
                  >
                    <div className="text-center">
                      <Image className="w-8 h-8 mx-auto mb-2" />
                      <p>Click to upload cover image</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Post Settings */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Post Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Publish Status</label>
                    <select
                      value={form.isPublished ? 'published' : 'draft'}
                      onChange={(e) => setForm(prev => ({ ...prev, isPublished: e.target.value === 'published' }))}
                      className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Reading Time (minutes)</label>
                    <Input
                      type="number"
                      placeholder="Estimated reading time"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        {showImageUpload && (
          <ImageUpload
            onClose={() => setShowImageUpload(false)}
            onUpload={(url) => {
              setForm(prev => ({ ...prev, coverImage: url }));
              setShowImageUpload(false);
            }}
          />
        )}
        {showCodeBlock && (
          <CodeBlock
            onClose={() => setShowCodeBlock(false)}
            onInsert={(code) => {
              setForm(prev => ({ ...prev, content: prev.content + '\n```\n' + code + '\n```\n' }));
              setShowCodeBlock(false);
            }}
          />
        )}
        {showVideoEmbed && (
          <VideoEmbed
            onClose={() => setShowVideoEmbed(false)}
            onInsert={(embedCode) => {
              setForm(prev => ({ ...prev, content: prev.content + '\n' + embedCode + '\n' }));
              setShowVideoEmbed(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
} 