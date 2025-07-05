'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, Bell, BookOpen, Palette, User, ChevronRight, Save, Undo } from 'lucide-react';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { LearningSettings } from '@/components/settings/LearningSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  description: string;
  subsections: {
    id: string;
    title: string;
    description: string;
  }[];
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    description: 'Manage your profile information and privacy',
    subsections: [
      { id: 'basic', title: 'Basic Info', description: 'Personal information and bio' },
      { id: 'privacy', title: 'Privacy', description: 'Control your profile visibility' },
      { id: 'portfolio', title: 'Portfolio Management', description: 'Manage your projects and skills' }
    ]
  },
  {
    id: 'security',
    title: 'Account Security',
    icon: Shield,
    description: 'Secure your account and manage access',
    subsections: [
      { id: 'password', title: 'Password', description: 'Change your password' },
      { id: 'twoFactor', title: 'Two-Factor Auth', description: 'Set up 2FA protection' },
      { id: 'sessions', title: 'Login History', description: 'Manage active sessions' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Configure notification preferences',
    subsections: [
      { id: 'email', title: 'Email', description: 'Email notification settings' },
      { id: 'push', title: 'Push', description: 'Push notification preferences' },
      { id: 'community', title: 'Community', description: 'Community activity alerts' }
    ]
  },
  {
    id: 'learning',
    title: 'Learning Preferences',
    icon: BookOpen,
    description: 'Customize your learning experience',
    subsections: [
      { id: 'difficulty', title: 'Difficulty', description: 'Set your skill level' },
      { id: 'topics', title: 'Topics', description: 'Choose your interests' },
      { id: 'goals', title: 'Goals', description: 'Set learning objectives' }
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    description: 'Customize the interface appearance',
    subsections: [
      { id: 'theme', title: 'Theme', description: 'Choose your theme' },
      { id: 'layout', title: 'Layout', description: 'Customize layout options' },
      { id: 'accessibility', title: 'Accessibility', description: 'Accessibility settings' }
    ]
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to switch sections?')) {
        setActiveSection(sectionId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleSave = () => {
    // Save settings logic here
    setHasUnsavedChanges(false);
  };

  const handleUndo = () => {
    // Undo changes logic here
    setHasUnsavedChanges(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings onChanges={setHasUnsavedChanges} />;
      case 'security':
        return <SecuritySettings onChanges={setHasUnsavedChanges} />;
      case 'notifications':
        return <NotificationSettings onChanges={setHasUnsavedChanges} />;
      case 'learning':
        return <LearningSettings onChanges={setHasUnsavedChanges} />;
      case 'appearance':
        return <AppearanceSettings onChanges={setHasUnsavedChanges} />;
      default:
        return <ProfileSettings onChanges={setHasUnsavedChanges} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-red-400" />
              <h1 className="text-xl font-bold text-white">Settings</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleUndo}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Undo className="w-4 h-4" />
                  <span>Undo</span>
                </motion.button>
              )}
              
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  hasUnsavedChanges
                    ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white hover:from-red-600 hover:to-purple-600'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass-card-dark rounded-xl p-6 sticky top-32">
              <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-xs text-gray-500">{section.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 