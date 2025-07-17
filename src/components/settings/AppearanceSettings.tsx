'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun, Monitor, Eye, EyeOff, Type, Contrast, Zap, CheckCircle } from 'lucide-react';
import { AppearanceSettings as AppearanceSettingsType } from '@/types/settings';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface AppearanceSettingsProps {
  onChanges: (hasChanges: boolean) => void;
}

const mockAppearanceSettings: AppearanceSettingsType = {
  theme: {
    mode: 'dark',
    autoSwitch: true,
    schedule: {
      enabled: false,
      lightStart: '06:00',
      darkStart: '18:00'
    }
  },
  colors: {
    primary: 'red',
    accent: 'purple',
    customColors: {
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a0a0a0'
    }
  },
  layout: {
    sidebarPosition: 'left',
    sidebarCollapsed: false,
    compactMode: false,
    animations: true,
    glassmorphism: true,
    particleEffects: true
  },
  typography: {
    fontSize: 'medium',
    fontFamily: 'inter',
    lineHeight: 'normal',
    letterSpacing: 'normal'
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    colorBlindSupport: false,
    screenReader: false
  }
};

export function AppearanceSettings({ onChanges }: AppearanceSettingsProps) {
  const [settings, setSettings] = useState<AppearanceSettingsType>(mockAppearanceSettings);
  const [originalSettings, setOriginalSettings] = useState<AppearanceSettingsType>(mockAppearanceSettings);
  const [activeTab, setActiveTab] = useState('theme');

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    onChanges(hasChanges);
  }, [settings, originalSettings, onChanges]);

  const handleInputChange = (section: keyof AppearanceSettingsType, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: keyof AppearanceSettingsType, subsection: string, field: string, value: any) => {
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

  const tabs = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Monitor },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'accessibility', label: 'Accessibility', icon: Eye }
  ];

  const themeModes = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', icon: Monitor, description: 'Follows system preference' }
  ];

  const colorSchemes = [
    { value: 'red', label: 'Cyber Red', colors: ['#ef4444', '#dc2626', '#991b1b'] },
    { value: 'purple', label: 'Neon Purple', colors: ['#a855f7', '#9333ea', '#581c87'] },
    { value: 'blue', label: 'Electric Blue', colors: ['#3b82f6', '#2563eb', '#1d4ed8'] },
    { value: 'green', label: 'Matrix Green', colors: ['#10b981', '#059669', '#047857'] },
    { value: 'orange', label: 'Sunset Orange', colors: ['#f97316', '#ea580c', '#c2410c'] },
    { value: 'pink', label: 'Neon Pink', colors: ['#ec4899', '#db2777', '#be185d'] }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', size: '14px' },
    { value: 'medium', label: 'Medium', size: '16px' },
    { value: 'large', label: 'Large', size: '18px' },
    { value: 'xlarge', label: 'Extra Large', size: '20px' }
  ];

  const fontFamilies = [
    { value: 'inter', label: 'Inter', preview: 'The quick brown fox' },
    { value: 'roboto', label: 'Roboto', preview: 'The quick brown fox' },
    { value: 'opensans', label: 'Open Sans', preview: 'The quick brown fox' },
    { value: 'mono', label: 'Monospace', preview: 'The quick brown fox' }
  ];

  const renderTheme = () => (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Theme Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {themeModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <label
                key={mode.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  settings.theme.mode === mode.value
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="themeMode"
                  value={mode.value}
                  checked={settings.theme.mode === mode.value}
                  onChange={(e) => handleInputChange('theme', 'mode', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="font-medium text-white">{mode.label}</div>
                  <div className="text-sm text-gray-400">{mode.description}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Auto Switch */}
      <div className="glass-card-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Auto Theme Switch</h3>
          <button
            onClick={() => handleInputChange('theme', 'autoSwitch', !settings.theme.autoSwitch)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.theme.autoSwitch
                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                : 'bg-gray-600'
            }`}
            aria-label="Toggle auto theme switch"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.theme.autoSwitch ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {settings.theme.autoSwitch && (
          <div className="space-y-4">
            <p className="text-gray-400">Automatically switch themes based on time of day</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Light Mode Start</label>
                <Input
                  type="time"
                  value={settings.theme.schedule.lightStart}
                  onChange={(e) => handleNestedInputChange('theme', 'schedule', 'lightStart', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  aria-label="Light mode start time"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dark Mode Start</label>
                <Input
                  type="time"
                  value={settings.theme.schedule.darkStart}
                  onChange={(e) => handleNestedInputChange('theme', 'schedule', 'darkStart', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  aria-label="Dark mode start time"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Theme Preview */}
      <div className="glass-card-dark p-6 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Theme Preview</h3>
        <div className="p-4 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderColors = () => (
    <div className="space-y-6">
      {/* Color Schemes */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Color Schemes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colorSchemes.map((scheme) => (
            <label
              key={scheme.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.colors.primary === scheme.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="colorScheme"
                value={scheme.value}
                checked={settings.colors.primary === scheme.value}
                onChange={(e) => handleInputChange('colors', 'primary', e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="flex justify-center space-x-1 mb-2">
                  {scheme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="font-medium text-white">{scheme.label}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Custom Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={settings.colors.customColors.background}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'background', e.target.value)}
                className="w-12 h-10 rounded border border-gray-700"
                aria-label="Background color picker"
              />
              <Input
                type="text"
                value={settings.colors.customColors.background}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'background', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="#0a0a0a"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Surface</label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={settings.colors.customColors.surface}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'surface', e.target.value)}
                className="w-12 h-10 rounded border border-gray-700"
                aria-label="Surface color picker"
              />
              <Input
                type="text"
                value={settings.colors.customColors.surface}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'surface', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="#1a1a1a"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Text</label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={settings.colors.customColors.text}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'text', e.target.value)}
                className="w-12 h-10 rounded border border-gray-700"
                aria-label="Text color picker"
              />
              <Input
                type="text"
                value={settings.colors.customColors.text}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'text', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="#ffffff"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Text</label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={settings.colors.customColors.textSecondary}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'textSecondary', e.target.value)}
                className="w-12 h-10 rounded border border-gray-700"
                aria-label="Secondary text color picker"
              />
              <Input
                type="text"
                value={settings.colors.customColors.textSecondary}
                onChange={(e) => handleNestedInputChange('colors', 'customColors', 'textSecondary', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="#a0a0a0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayout = () => (
    <div className="space-y-6">
      {/* Sidebar Position */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Sidebar Position</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'left', label: 'Left Side', description: 'Traditional layout' },
            { value: 'right', label: 'Right Side', description: 'Alternative layout' }
          ].map((position) => (
            <label
              key={position.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.layout.sidebarPosition === position.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="sidebarPosition"
                value={position.value}
                checked={settings.layout.sidebarPosition === position.value}
                onChange={(e) => handleInputChange('layout', 'sidebarPosition', e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-medium text-white">{position.label}</div>
                <div className="text-sm text-gray-400">{position.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Layout Options */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Layout Options</h3>
        <div className="space-y-4">
          {[
            { key: 'sidebarCollapsed', label: 'Collapsed Sidebar', description: 'Save screen space' },
            { key: 'compactMode', label: 'Compact Mode', description: 'Dense layout for more content' },
            { key: 'animations', label: 'Animations', description: 'Smooth transitions and effects' },
            { key: 'glassmorphism', label: 'Glassmorphism', description: 'Frosted glass effects' },
            { key: 'particleEffects', label: 'Particle Effects', description: 'Background animations' }
          ].map((option) => (
            <label key={option.key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.layout[option.key as keyof typeof settings.layout] as boolean}
                  onChange={(e) => handleInputChange('layout', option.key, e.target.checked)}
                  className="text-red-500 focus:ring-red-500"
                />
                <div>
                  <div className="text-white">{option.label}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </div>
              </div>
              {settings.layout[option.key as keyof typeof settings.layout] && <CheckCircle className="w-4 h-4 text-green-400" />}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTypography = () => (
    <div className="space-y-6">
      {/* Font Size */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Font Size</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fontSizes.map((size) => (
            <label
              key={size.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.typography.fontSize === size.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="fontSize"
                value={size.value}
                checked={settings.typography.fontSize === size.value}
                onChange={(e) => handleInputChange('typography', 'fontSize', e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-medium text-white" style={{ fontSize: size.size }}>
                  {size.label}
                </div>
                <div className="text-sm text-gray-400">{size.size}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Font Family</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fontFamilies.map((font) => (
            <label
              key={font.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.typography.fontFamily === font.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="fontFamily"
                value={font.value}
                checked={settings.typography.fontFamily === font.value}
                onChange={(e) => handleInputChange('typography', 'fontFamily', e.target.value)}
                className="sr-only"
              />
              <div>
                <div className="font-medium text-white">{font.label}</div>
                <div className="text-sm text-gray-400" style={{ fontFamily: font.value }}>
                  {font.preview}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Typography Options */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Typography Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Line Height</label>
            <Select
              value={settings.typography.lineHeight}
              onChange={(e) => handleInputChange('typography', 'lineHeight', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Line height selection"
            >
              <option value="tight">Tight</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
              <option value="loose">Loose</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Letter Spacing</label>
            <Select
              value={settings.typography.letterSpacing}
              onChange={(e) => handleInputChange('typography', 'letterSpacing', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Letter spacing selection"
            >
              <option value="tight">Tight</option>
              <option value="normal">Normal</option>
              <option value="wide">Wide</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-6">
      {/* Accessibility Options */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Accessibility Options</h3>
        <div className="space-y-4">
          {[
            { key: 'highContrast', label: 'High Contrast', description: 'Enhanced color contrast' },
            { key: 'reducedMotion', label: 'Reduced Motion', description: 'Minimize animations' },
            { key: 'largeText', label: 'Large Text', description: 'Increase text size' },
            { key: 'colorBlindSupport', label: 'Color Blind Support', description: 'Color blind friendly' },
            { key: 'screenReader', label: 'Screen Reader', description: 'Enhanced screen reader support' }
          ].map((option) => (
            <label key={option.key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.accessibility[option.key as keyof typeof settings.accessibility] as boolean}
                  onChange={(e) => handleInputChange('accessibility', option.key, e.target.checked)}
                  className="text-red-500 focus:ring-red-500"
                />
                <div>
                  <div className="text-white">{option.label}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </div>
              </div>
              {settings.accessibility[option.key as keyof typeof settings.accessibility] && <CheckCircle className="w-4 h-4 text-green-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* Accessibility Preview */}
      <div className="glass-card-dark p-6 rounded-xl border border-green-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Accessibility Preview</h3>
        <div className="p-4 bg-gray-800/30 rounded-lg">
          <div className="space-y-2">
            <div className="text-white font-medium">Sample Text</div>
            <div className="text-gray-400">This is how your text will appear with the current accessibility settings.</div>
            <div className="flex items-center space-x-2 mt-3">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Appearance Settings</h2>
        <p className="text-gray-400">Customize the look and feel of your interface</p>
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
        {activeTab === 'theme' && renderTheme()}
        {activeTab === 'colors' && renderColors()}
        {activeTab === 'layout' && renderLayout()}
        {activeTab === 'typography' && renderTypography()}
        {activeTab === 'accessibility' && renderAccessibility()}
      </motion.div>
    </div>
  );
} 