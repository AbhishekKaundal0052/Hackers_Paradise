'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Smile, Shield, Bug, Lock, Code, Zap } from 'lucide-react';
import { ChatMessage } from '@/types/community';

interface LiveChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'cyber_hunter',
      avatar: '/avatars/user1.jpg'
    },
    message: 'Anyone working on the new XSS challenge? 🔥',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'text'
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'malware_analyst',
      avatar: '/avatars/user2.jpg'
    },
    message: 'Just found a bypass technique! 🐛',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: 'text'
  },
  {
    id: '3',
    user: {
      id: '3',
      username: 'crypto_master',
      avatar: '/avatars/user3.jpg'
    },
    message: '```python\n# Crypto challenge solution\nkey = b"secret_key"\ncipher = AES.new(key, AES.MODE_ECB)\n```',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'code'
  }
];

const cyberEmojis = [
  { emoji: '🔐', label: 'Security' },
  { emoji: '🐛', label: 'Bug' },
  { emoji: '💻', label: 'Code' },
  { emoji: '🔥', label: 'Hot' },
  { emoji: '⚡', label: 'Fast' },
  { emoji: '🛡️', label: 'Shield' },
  { emoji: '🎯', label: 'Target' },
  { emoji: '🚀', label: 'Launch' }
];

export function LiveChat({ isOpen, onToggle }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: {
          id: 'current-user',
          username: 'You',
          avatar: '/avatars/current-user.jpg'
        },
        message: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setShowEmojis(false);
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.user.id === 'current-user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex items-start space-x-2 max-w-xs ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {message.user.username.charAt(0).toUpperCase()}
          </div>
          <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${
              isCurrentUser 
                ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white' 
                : 'bg-gray-700 text-white'
            }`}>
              {message.type === 'code' ? (
                <pre className="text-sm font-mono whitespace-pre-wrap">{message.message}</pre>
              ) : (
                <p className="text-sm">{message.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-400">{message.user.username}</span>
              <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 right-6 w-80 h-96 glass-card-dark rounded-xl shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white font-semibold">Live Chat</span>
              <span className="text-xs text-gray-400">({messages.length} online)</span>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-2 bg-gray-800 border-t border-gray-700"
              >
                <div className="grid grid-cols-8 gap-1">
                  {cyberEmojis.map((emojiData, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emojiData.emoji)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-700 rounded transition-colors"
                      title={emojiData.label}
                    >
                      {emojiData.emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle emoji picker"
              >
                <Smile size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 