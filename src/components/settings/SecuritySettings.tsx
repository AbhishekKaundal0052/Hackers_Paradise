'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Monitor, Download, Trash2, AlertTriangle, CheckCircle, Eye, EyeOff, QrCode } from 'lucide-react';
import { SecuritySettings as SecuritySettingsType } from '@/types/settings';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface SecuritySettingsProps {
  onChanges: (hasChanges: boolean) => void;
}

const mockSecuritySettings: SecuritySettingsType = {
  password: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    strengthScore: 0
  },
  twoFactor: {
    enabled: false,
    method: 'app',
    backupCodes: [],
    trustedDevices: []
  },
  loginHistory: {
    sessions: [
      {
        id: '1',
        device: {
          id: '1',
          name: 'MacBook Pro',
          type: 'desktop',
          browser: 'Chrome',
          location: 'San Francisco, CA',
          lastUsed: new Date(),
          isCurrent: true
        },
        location: 'San Francisco, CA',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        lastActivity: new Date(),
        isActive: true
      },
      {
        id: '2',
        device: {
          id: '2',
          name: 'iPhone 15',
          type: 'mobile',
          browser: 'Safari',
          location: 'San Francisco, CA',
          lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
          isCurrent: false
        },
        location: 'San Francisco, CA',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0...',
        loginTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isActive: false
      }
    ],
    suspiciousActivity: [
      {
        id: '1',
        type: 'failed_login',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        description: 'Failed login attempt from unknown location',
        severity: 'medium',
        resolved: false
      }
    ]
  },
  dataExport: {
    lastExport: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    availableFormats: ['JSON', 'CSV', 'PDF']
  }
};

export function SecuritySettings({ onChanges }: SecuritySettingsProps) {
  const [settings, setSettings] = useState<SecuritySettingsType>(mockSecuritySettings);
  const [originalSettings, setOriginalSettings] = useState<SecuritySettingsType>(mockSecuritySettings);
  const [activeTab, setActiveTab] = useState('password');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    onChanges(hasChanges);
  }, [settings, originalSettings, onChanges]);

  const handleInputChange = (section: keyof SecuritySettingsType, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const handlePasswordChange = (field: string, value: string) => {
    handleInputChange('password', field, value);
    if (field === 'newPassword') {
      handleInputChange('password', 'strengthScore', calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return 'text-red-400';
    if (score <= 3) return 'text-yellow-400';
    if (score <= 4) return 'text-blue-400';
    return 'text-green-400';
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const tabs = [
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'twoFactor', label: 'Two-Factor Auth', icon: Smartphone },
    { id: 'sessions', label: 'Login History', icon: Monitor },
    { id: 'data', label: 'Data Export', icon: Download }
  ];

  const renderPassword = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <Input
                type={showPasswords.current ? 'text' : 'password'}
                value={settings.password.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <div className="relative">
              <Input
                type={showPasswords.new ? 'text' : 'password'}
                value={settings.password.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {settings.password.newPassword && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Password strength:</span>
                  <span className={getPasswordStrengthColor(settings.password.strengthScore)}>
                    {getPasswordStrengthText(settings.password.strengthScore)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      settings.password.strengthScore <= 2 ? 'bg-red-500' :
                      settings.password.strengthScore <= 3 ? 'bg-yellow-500' :
                      settings.password.strengthScore <= 4 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(settings.password.strengthScore / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={settings.password.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {settings.password.confirmPassword && (
              <div className="mt-2 flex items-center space-x-2">
                {settings.password.newPassword === settings.password.confirmPassword ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${
                  settings.password.newPassword === settings.password.confirmPassword ? 'text-green-400' : 'text-red-400'
                }`}>
                  {settings.password.newPassword === settings.password.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </span>
              </div>
            )}
          </div>

          <button className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-200">
            Update Password
          </button>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="glass-card-dark p-6 rounded-xl border border-yellow-500/20">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Security Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Use a strong, unique password for your account</li>
              <li>• Enable two-factor authentication for extra security</li>
              <li>• Regularly review your login sessions</li>
              <li>• Keep your devices and browsers updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTwoFactor = () => (
    <div className="space-y-6">
      {/* 2FA Status */}
      <div className="glass-card-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
          <button
            onClick={() => handleInputChange('twoFactor', 'enabled', !settings.twoFactor.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.twoFactor.enabled
                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                : 'bg-gray-600'
            }`}
            aria-label="Toggle two-factor authentication"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.twoFactor.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <p className="text-gray-400 mb-4">
          {settings.twoFactor.enabled 
            ? 'Two-factor authentication is enabled. Your account is protected with an additional layer of security.'
            : 'Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification.'
          }
        </p>

        {!settings.twoFactor.enabled && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <h4 className="font-medium text-white mb-2">Setup 2FA</h4>
              <p className="text-sm text-gray-400 mb-3">Choose your preferred method:</p>
              <div className="space-y-2">
                {[
                  { id: 'app', label: 'Authenticator App', description: 'Use apps like Google Authenticator or Authy' },
                  { id: 'sms', label: 'SMS', description: 'Receive codes via text message' },
                  { id: 'email', label: 'Email', description: 'Receive codes via email' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="2fa-method"
                      value={method.id}
                      checked={settings.twoFactor.method === method.id}
                      onChange={(e) => handleInputChange('twoFactor', 'method', e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <div>
                      <div className="font-medium text-white">{method.label}</div>
                      <div className="text-sm text-gray-400">{method.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {settings.twoFactor.enabled && (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">2FA is active</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <h4 className="font-medium text-white mb-2">Backup Codes</h4>
              <p className="text-sm text-gray-400 mb-3">Keep these codes safe in case you lose access to your 2FA device:</p>
              <div className="grid grid-cols-2 gap-2">
                {['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345', 'PQR678'].map((code, index) => (
                  <div key={index} className="p-2 bg-gray-700 rounded text-center font-mono text-sm text-white">
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-6">
      {/* Active Sessions */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {settings.loginHistory.sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium text-white">{session.device.name}</div>
                  <div className="text-sm text-gray-400">
                    {session.location} • {session.device.browser} • {session.device.type}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last active: {session.lastActivity.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {session.isCurrent && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Current
                  </span>
                )}
                {!session.isCurrent && (
                  <button className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suspicious Activity */}
      {settings.loginHistory.suspiciousActivity.length > 0 && (
        <div className="glass-card-dark p-6 rounded-xl border border-red-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Suspicious Activity</h3>
          <div className="space-y-3">
            {settings.loginHistory.suspiciousActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="font-medium text-white">{activity.description}</div>
                    <div className="text-sm text-gray-400">
                      {activity.timestamp.toLocaleDateString()} • {activity.severity} severity
                    </div>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderDataExport = () => (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-white">Last Export</span>
              <span className="text-sm text-gray-400">
                {settings.dataExport.lastExport?.toLocaleDateString() || 'Never'}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Download a copy of your data including profile information, learning progress, and activity history.
            </p>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Export Format</label>
              <Select
                value={settings.dataExport.availableFormats[0]}
                onChange={(e) => handleInputChange('dataExport', 'availableFormats', [e.target.value])}
                label="Export Format"
              >
                {settings.dataExport.availableFormats.map((format) => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </Select>
            </div>
            
            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-200">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="glass-card-dark p-6 rounded-xl border border-red-500/20">
        <div className="flex items-start space-x-3">
          <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Account</h3>
            <p className="text-sm text-gray-400 mb-4">
              This action cannot be undone. All your data, progress, and account information will be permanently deleted.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Security Settings</h2>
        <p className="text-gray-400">Manage your account security and access</p>
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
        {activeTab === 'password' && renderPassword()}
        {activeTab === 'twoFactor' && renderTwoFactor()}
        {activeTab === 'sessions' && renderSessions()}
        {activeTab === 'data' && renderDataExport()}
      </motion.div>
    </div>
  );
} 