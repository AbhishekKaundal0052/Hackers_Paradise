'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Globe, Upload, Shield, AlertTriangle } from 'lucide-react';
import { ProfileSettings as ProfileSettingsType } from '@/types/settings';

interface ProfileSettingsProps {
  onChanges: (hasChanges: boolean) => void;
}

const mockProfileSettings: ProfileSettingsType = {
  basicInfo: {
    username: 'cyber_hunter',
    email: 'alex.chen@example.com',
    realName: 'Alex Chen',
    bio: 'Senior security researcher with 8+ years experience in web application security and penetration testing.',
    location: 'San Francisco, CA',
    website: 'https://cyberhunter.dev',
    socialLinks: {
      twitter: 'https://twitter.com/cyber_hunter',
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/cyber-hunter'
    }
  },
  privacy: {
    profileVisibility: 'community',
    showEmail: false,
    showLocation: true,
    showLastActive: true,
    allowDirectMessages: true,
    searchable: true
  },
  portfolio: {
    showPortfolio: true,
    featuredProjects: ['web-security-scanner', 'network-recon-tool'],
    skillsVisibility: 'public'
  }
};

export function ProfileSettings({ onChanges }: ProfileSettingsProps) {
  const [settings, setSettings] = useState<ProfileSettingsType>(mockProfileSettings);
  const [originalSettings] = useState<ProfileSettingsType>(mockProfileSettings);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    onChanges(hasChanges);
  }, [settings, originalSettings, onChanges]);

  const handleInputChange = (section: keyof ProfileSettingsType, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        socialLinks: {
          ...prev.basicInfo.socialLinks,
          [platform]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'portfolio', label: 'Portfolio', icon: Globe }
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {settings.basicInfo.username.charAt(0).toUpperCase()}
            </div>
            <button
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Upload profile picture"
            >
              <Upload className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-2">Upload a new profile picture</p>
            <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={settings.basicInfo.username}
              onChange={(e) => handleInputChange('basicInfo', 'username', e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={settings.basicInfo.email}
              onChange={(e) => handleInputChange('basicInfo', 'email', e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Real Name</label>
            <input
              type="text"
              value={settings.basicInfo.realName || ''}
              onChange={(e) => handleInputChange('basicInfo', 'realName', e.target.value)}
              placeholder="Enter your real name"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={settings.basicInfo.location || ''}
              onChange={(e) => handleInputChange('basicInfo', 'location', e.target.value)}
              placeholder="Enter your location"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={settings.basicInfo.bio}
              onChange={(e) => handleInputChange('basicInfo', 'bio', e.target.value)}
              placeholder="Tell us about yourself"
              rows={4}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
            <input
              type="url"
              value={settings.basicInfo.website || ''}
              onChange={(e) => handleInputChange('basicInfo', 'website', e.target.value)}
              placeholder="https://your-website.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
            <input
              type="url"
              value={settings.basicInfo.socialLinks.twitter || ''}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              placeholder="https://twitter.com/username"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
            <input
              type="url"
              value={settings.basicInfo.socialLinks.linkedin || ''}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
            <input
              type="url"
              value={settings.basicInfo.socialLinks.github || ''}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-medium text-white">Profile Visibility</div>
                <div className="text-sm text-gray-400">Who can see your profile</div>
              </div>
            </div>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
              aria-label="Profile visibility setting"
              className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="public">Public</option>
              <option value="community">Community Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          {[
            { key: 'showEmail', label: 'Show Email Address', description: 'Display your email on your profile' },
            { key: 'showLocation', label: 'Show Location', description: 'Display your location on your profile' },
            { key: 'showLastActive', label: 'Show Last Active', description: 'Show when you were last active' },
            { key: 'allowDirectMessages', label: 'Allow Direct Messages', description: 'Let other users send you messages' },
            { key: 'searchable', label: 'Searchable Profile', description: 'Allow others to find your profile' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div>
                <div className="font-medium text-white">{item.label}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
              <button
                onClick={() => handleInputChange('privacy', item.key, !settings.privacy[item.key as keyof typeof settings.privacy])}
                aria-label={`Toggle ${item.label.toLowerCase()}`}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy[item.key as keyof typeof settings.privacy]
                    ? 'bg-gradient-to-r from-red-500 to-purple-500'
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy[item.key as keyof typeof settings.privacy] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Impact */}
      <div className="glass-card-dark p-6 rounded-xl border border-yellow-500/20">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Privacy Impact</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your profile is currently visible to {settings.privacy.profileVisibility === 'public' ? 'everyone' : 
              settings.privacy.profileVisibility === 'community' ? 'community members only' : 'no one'}.
            </p>
            <div className="text-xs text-gray-500">
              • {settings.privacy.showEmail ? 'Email is visible' : 'Email is hidden'}<br/>
              • {settings.privacy.showLocation ? 'Location is visible' : 'Location is hidden'}<br/>
              • {settings.privacy.allowDirectMessages ? 'Direct messages are allowed' : 'Direct messages are disabled'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      {/* Portfolio Visibility */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Portfolio Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-medium text-white">Show Portfolio</div>
                <div className="text-sm text-gray-400">Display your projects and work</div>
              </div>
            </div>
            <button
              onClick={() => handleInputChange('portfolio', 'showPortfolio', !settings.portfolio.showPortfolio)}
              aria-label="Toggle portfolio visibility"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.portfolio.showPortfolio
                  ? 'bg-gradient-to-r from-red-500 to-purple-500'
                  : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.portfolio.showPortfolio ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-medium text-white">Skills Visibility</div>
                <div className="text-sm text-gray-400">Who can see your skills</div>
              </div>
            </div>
            <select
              value={settings.portfolio.skillsVisibility}
              onChange={(e) => handleInputChange('portfolio', 'skillsVisibility', e.target.value)}
              aria-label="Skills visibility setting"
              className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value="public">Public</option>
              <option value="community">Community Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Featured Projects</h3>
        <div className="space-y-3">
          {settings.portfolio.featuredProjects.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <span className="text-white">{project}</span>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Remove
              </button>
            </div>
          ))}
          <button className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            + Add Featured Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <p className="text-gray-400">Manage your profile information and privacy settings</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'privacy' && renderPrivacy()}
        {activeTab === 'portfolio' && renderPortfolio()}
      </motion.div>
    </div>
  );
} 