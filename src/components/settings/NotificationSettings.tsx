'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Calendar, Award, Users, Settings, CheckCircle, AlertTriangle } from 'lucide-react';
import { NotificationSettings as NotificationSettingsType } from '@/types/settings';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface NotificationSettingsProps {
  onChanges: (hasChanges: boolean) => void;
}

const mockNotificationSettings: NotificationSettingsType = {
  email: {
    enabled: true,
    frequency: 'immediate',
    types: {
      courseUpdates: true,
      achievementUnlocks: true,
      communityActivity: false,
      securityAlerts: true,
      weeklyDigest: true,
      marketing: false
    }
  },
  push: {
    enabled: true,
    types: {
      courseReminders: true,
      achievementUnlocks: true,
      communityMessages: true,
      securityAlerts: true,
      dailyGoals: true,
      streakReminders: true
    },
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  },
  learning: {
    dailyGoals: true,
    weeklyProgress: true,
    courseDeadlines: true,
    streakReminders: true,
    achievementCelebrations: true,
    studyReminders: {
      enabled: true,
      frequency: 'daily',
      time: '09:00'
    }
  },
  community: {
    newMessages: true,
    mentions: true,
    replies: true,
    friendRequests: true,
    groupInvites: true,
    eventReminders: true,
    leaderboardUpdates: false
  }
};

export function NotificationSettings({ onChanges }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettingsType>(mockNotificationSettings);
  const [originalSettings, setOriginalSettings] = useState<NotificationSettingsType>(mockNotificationSettings);
  const [activeTab, setActiveTab] = useState('email');

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    onChanges(hasChanges);
  }, [settings, originalSettings, onChanges]);

  const handleToggle = (section: keyof NotificationSettingsType, field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedToggle = (section: keyof NotificationSettingsType, subsection: string, field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const handleNestedInputChange = (section: keyof NotificationSettingsType, subsection: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const handleInputChange = (section: keyof NotificationSettingsType, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'push', label: 'Push Notifications', icon: Bell },
    { id: 'learning', label: 'Learning', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const renderEmail = () => (
    <div className="space-y-6">
      {/* Email Overview */}
      <div className="glass-card-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
          <button
            onClick={() => handleToggle('email', 'enabled', !settings.email.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.email.enabled
                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                : 'bg-gray-600'
            }`}
            aria-label="Toggle email notifications"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.email.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {settings.email.enabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Frequency</label>
              <Select
                value={settings.email.frequency}
                onChange={e => handleInputChange('email', 'frequency', e.target.value)}
                label="Email Frequency"
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Digest</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </Select>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-white">Email Types</h4>
              {Object.entries(settings.email.types).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleNestedToggle('email', 'types', key, e.target.checked)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                  {value && <CheckCircle className="w-4 h-4 text-green-400" />}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Email Preview */}
      {settings.email.enabled && (
        <div className="glass-card-dark p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Email Preview</h3>
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">From: Hacker's Paradise</span>
              </div>
              <div className="text-white font-medium">Course Update: Advanced Penetration Testing</div>
              <div className="text-sm text-gray-400">
                New content has been added to your enrolled course. Check it out now!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPush = () => (
    <div className="space-y-6">
      {/* Push Overview */}
      <div className="glass-card-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Push Notifications</h3>
          <button
            onClick={() => handleToggle('push', 'enabled', !settings.push.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.push.enabled
                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                : 'bg-gray-600'
            }`}
            aria-label="Toggle push notifications"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.push.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {settings.push.enabled && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Notification Types</h4>
              {Object.entries(settings.push.types).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleNestedToggle('push', 'types', key, e.target.checked)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                  {value && <CheckCircle className="w-4 h-4 text-green-400" />}
                </label>
              ))}
            </div>

            {/* Quiet Hours */}
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">Quiet Hours</h4>
                <button
                  onClick={() => handleNestedToggle('push', 'quietHours', 'enabled', !settings.push.quietHours.enabled)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    settings.push.quietHours.enabled
                      ? 'bg-gradient-to-r from-red-500 to-purple-500'
                      : 'bg-gray-600'
                  }`}
                  aria-label="Toggle quiet hours"
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      settings.push.quietHours.enabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {settings.push.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
                    <Input
                      type="time"
                      value={settings.push.quietHours.start}
                      onChange={e => handleNestedInputChange('push', 'quietHours', 'start', e.target.value)}
                      label="Start Time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">End Time</label>
                    <Input
                      type="time"
                      value={settings.push.quietHours.end}
                      onChange={e => handleNestedInputChange('push', 'quietHours', 'end', e.target.value)}
                      label="End Time"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notification Preview */}
      {settings.push.enabled && (
        <div className="glass-card-dark p-6 rounded-xl border border-green-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Preview</h3>
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-white font-medium">Achievement Unlocked!</div>
                <div className="text-sm text-gray-400">You've completed 10 courses</div>
                <div className="text-xs text-gray-500 mt-1">2 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-6">
      {/* Learning Reminders */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Learning Reminders</h3>
        <div className="space-y-4">
          {Object.entries(settings.learning).map(([key, value]) => {
            if (key === 'studyReminders') return null;
            return (
              <label key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => handleToggle('learning', key, e.target.checked)}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <span className="text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                {value && <CheckCircle className="w-4 h-4 text-green-400" />}
              </label>
            );
          })}
        </div>
      </div>

      {/* Study Reminders */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Study Reminders</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">Enable Study Reminders</span>
            <button
              onClick={() => handleNestedToggle('learning', 'studyReminders', 'enabled', !settings.learning.studyReminders.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.learning.studyReminders.enabled
                  ? 'bg-gradient-to-r from-red-500 to-purple-500'
                  : 'bg-gray-600'
              }`}
              aria-label="Toggle study reminders"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.learning.studyReminders.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.learning.studyReminders.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
                <Select
                  value={settings.learning.studyReminders.frequency}
                  onChange={e => handleNestedInputChange('learning', 'studyReminders', 'frequency', e.target.value)}
                  label="Frequency"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                <Input
                  type="time"
                  value={settings.learning.studyReminders.time}
                  onChange={e => handleNestedInputChange('learning', 'studyReminders', 'time', e.target.value)}
                  label="Time"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      {/* Community Notifications */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Community Notifications</h3>
        <div className="space-y-3">
          {Object.entries(settings.community).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleToggle('community', key, e.target.checked)}
                  className="text-red-500 focus:ring-red-500"
                />
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              {value && <CheckCircle className="w-4 h-4 text-green-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* Notification Summary */}
      <div className="glass-card-dark p-6 rounded-xl border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Object.values(settings.email.types).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-400">Email Types</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Object.values(settings.push.types).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-400">Push Types</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Object.values(settings.learning).filter(v => typeof v === 'boolean' && v).length}
            </div>
            <div className="text-sm text-gray-400">Learning Alerts</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Object.values(settings.community).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-400">Community Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
        <p className="text-gray-400">Customize how and when you receive notifications</p>
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
        {activeTab === 'email' && renderEmail()}
        {activeTab === 'push' && renderPush()}
        {activeTab === 'learning' && renderLearning()}
        {activeTab === 'community' && renderCommunity()}
      </motion.div>
    </div>
  );
} 