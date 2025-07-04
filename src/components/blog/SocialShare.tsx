import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const text = `Check out this article: ${title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={shareOnTwitter}
        size="sm"
        variant="outline"
        className="p-2"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        onClick={shareOnLinkedIn}
        size="sm"
        variant="outline"
        className="p-2"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        onClick={shareOnFacebook}
        size="sm"
        variant="outline"
        className="p-2"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        onClick={copyLink}
        size="sm"
        variant="outline"
        className="p-2"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
      </Button>
    </div>
  );
}; 