'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, BarChart3, Settings, CheckCircle } from 'lucide-react';
import { LearningSettings as LearningSettingsType } from '@/types/settings';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface LearningSettingsProps {
  onChanges: (hasChanges: boolean) => void;
}

const mockLearningSettings: LearningSettingsType = {
  preferences: {
    difficulty: 'intermediate',
    learningStyle: 'hands-on',
    pace: 'moderate',
    focusAreas: ['web-security', 'network-security', 'forensics'],
    preferredLanguages: ['python', 'javascript', 'bash'],
    timeZone: 'America/Los_Angeles'
  },
  goals: {
    dailyStudyTime: 60,
    weeklyCourses: 2,
    monthlyCertifications: 1,
    targetSkills: ['penetration-testing', 'incident-response', 'malware-analysis'],
    completionRate: 85
  },
  schedule: {
    enabled: true,
    studyDays: ['monday', 'wednesday', 'friday', 'saturday'],
    preferredTime: '18:00',
    sessionDuration: 45,
    breakDuration: 15,
    timeSlots: [
      { day: 'monday', time: '18:00', duration: 45 },
      { day: 'wednesday', time: '18:00', duration: 45 },
      { day: 'friday', time: '18:00', duration: 45 },
      { day: 'saturday', time: '10:00', duration: 90 }
    ]
  },
  progress: {
    autoAdvance: true,
    reviewFrequency: 'weekly',
    practiceMode: true,
    adaptiveLearning: true,
    skillTracking: true
  }
};

export function LearningSettings({ onChanges }: LearningSettingsProps) {
  const [settings, setSettings] = useState<LearningSettingsType>(mockLearningSettings);
  const [originalSettings] = useState<LearningSettingsType>(mockLearningSettings);
  const [activeTab, setActiveTab] = useState('preferences');

  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    onChanges(hasChanges);
  }, [settings, originalSettings, onChanges]);

  const handleInputChange = (section: keyof LearningSettingsType, field: string, value: string | number | string[] | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // const handleNestedInputChange = (section: keyof LearningSettingsType, subsection: string, field: string, value: string | number | boolean) => {
  //   setSettings(prev => {
  //     const currentSection = prev[section] as Record<string, unknown>;
  //     const currentSubsection = currentSection[subsection] as Record<string, unknown>;
  //     return {
  //       ...prev,
  //       [section]: {
  //         ...currentSection,
  //         [subsection]: {
  //           ...currentSubsection,
  //           [field]: value
  //         }
  //       }
  //     };
  //   });
  // };

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'goals', label: 'Learning Goals', icon: Target },
    { id: 'schedule', label: 'Study Schedule', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart3 }
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to cybersecurity' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced professional' },
    { value: 'expert', label: 'Expert', description: 'Seasoned practitioner' }
  ];

  const learningStyleOptions = [
    { value: 'hands-on', label: 'Hands-on Labs', description: 'Learn by doing' },
    { value: 'theoretical', label: 'Theory First', description: 'Understand concepts' },
    { value: 'mixed', label: 'Mixed Approach', description: 'Balance of both' },
    { value: 'project-based', label: 'Project-based', description: 'Learn through projects' }
  ];

  const paceOptions = [
    { value: 'slow', label: 'Slow & Steady', description: 'Take your time' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced pace' },
    { value: 'fast', label: 'Fast Track', description: 'Accelerated learning' },
    { value: 'intensive', label: 'Intensive', description: 'Maximum speed' }
  ];

  const focusAreas = [
    { id: 'web-security', label: 'Web Security', icon: '🌐' },
    { id: 'network-security', label: 'Network Security', icon: '🌐' },
    { id: 'forensics', label: 'Digital Forensics', icon: '🔍' },
    { id: 'malware-analysis', label: 'Malware Analysis', icon: '🦠' },
    { id: 'penetration-testing', label: 'Penetration Testing', icon: '⚔️' },
    { id: 'incident-response', label: 'Incident Response', icon: '🚨' },
    { id: 'cryptography', label: 'Cryptography', icon: '🔐' },
    { id: 'cloud-security', label: 'Cloud Security', icon: '☁️' }
  ];

  const programmingLanguages = [
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'javascript', label: 'JavaScript', icon: '📜' },
    { id: 'bash', label: 'Bash', icon: '💻' },
    { id: 'powershell', label: 'PowerShell', icon: '⚡' },
    { id: 'c', label: 'C/C++', icon: '⚙️' },
    { id: 'go', label: 'Go', icon: '🐹' },
    { id: 'rust', label: 'Rust', icon: '🦀' },
    { id: 'assembly', label: 'Assembly', icon: '🔧' }
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Difficulty Level */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Difficulty Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {difficultyOptions.map((option) => (
            <label
              key={option.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.preferences.difficulty === option.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={settings.preferences.difficulty === option.value}
                onChange={(e) => handleInputChange('preferences', 'difficulty', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-sm text-gray-400">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Learning Style */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Learning Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningStyleOptions.map((option) => (
            <label
              key={option.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.preferences.learningStyle === option.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="learningStyle"
                value={option.value}
                checked={settings.preferences.learningStyle === option.value}
                onChange={(e) => handleInputChange('preferences', 'learningStyle', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-sm text-gray-400">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Learning Pace */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Learning Pace</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paceOptions.map((option) => (
            <label
              key={option.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.preferences.pace === option.value
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="pace"
                value={option.value}
                checked={settings.preferences.pace === option.value}
                onChange={(e) => handleInputChange('preferences', 'pace', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-white">{option.label}</div>
              <div className="text-sm text-gray-400">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Focus Areas</h3>
        <p className="text-gray-400 mb-4">Select up to 5 areas you want to focus on</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {focusAreas.map((area) => (
            <label
              key={area.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.preferences.focusAreas.includes(area.id)
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="checkbox"
                checked={settings.preferences.focusAreas.includes(area.id)}
                onChange={(e) => {
                  const currentAreas = settings.preferences.focusAreas;
                  const newAreas = e.target.checked
                    ? [...currentAreas, area.id]
                    : currentAreas.filter(id => id !== area.id);
                  handleInputChange('preferences', 'focusAreas', newAreas.slice(0, 5));
                }}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <span className="text-xl">{area.icon}</span>
                <span className="text-white">{area.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Programming Languages */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Preferred Programming Languages</h3>
        <p className="text-gray-400 mb-4">Select languages you&apos;re comfortable with or want to learn</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {programmingLanguages.map((lang) => (
            <label
              key={lang.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.preferences.preferredLanguages.includes(lang.id)
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="checkbox"
                checked={settings.preferences.preferredLanguages.includes(lang.id)}
                onChange={(e) => {
                  const currentLangs = settings.preferences.preferredLanguages;
                  const newLangs = e.target.checked
                    ? [...currentLangs, lang.id]
                    : currentLangs.filter(id => id !== lang.id);
                  handleInputChange('preferences', 'preferredLanguages', newLangs);
                }}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">{lang.icon}</div>
                <div className="text-sm text-white">{lang.label}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Time Zone */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Time Zone</h3>
        <Select
          value={settings.preferences.timeZone}
          onChange={(e) => handleInputChange('preferences', 'timeZone', e.target.value)}
          label="Time Zone"
        >
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Europe/Paris">Paris (CET)</option>
          <option value="Asia/Tokyo">Tokyo (JST)</option>
          <option value="Australia/Sydney">Sydney (AEST)</option>
        </Select>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      {/* Daily Study Time */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Daily Study Time</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
              <Input
              type="range"
              min="15"
              max="240"
              step="15"
              value={settings.goals.dailyStudyTime}
              onChange={(e) => handleInputChange('goals', 'dailyStudyTime', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-medium min-w-[60px]">
              {settings.goals.dailyStudyTime} min
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Recommended: 30-90 minutes per day for consistent progress
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Courses to Complete</label>
            <Select
              value={settings.goals.weeklyCourses}
              onChange={(e) => handleInputChange('goals', 'weeklyCourses', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value={1}>1 course</option>
              <option value={2}>2 courses</option>
              <option value={3}>3 courses</option>
              <option value={4}>4 courses</option>
              <option value={5}>5 courses</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Certifications</label>
            <Select
              value={settings.goals.monthlyCertifications}
              onChange={(e) => handleInputChange('goals', 'monthlyCertifications', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <option value={0}>None</option>
              <option value={1}>1 certification</option>
              <option value={2}>2 certifications</option>
              <option value={3}>3 certifications</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Target Skills */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Target Skills</h3>
        <p className="text-gray-400 mb-4">Select skills you want to master</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {focusAreas.map((area) => (
            <label
              key={area.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings.goals.targetSkills.includes(area.id)
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <input
                type="checkbox"
                checked={settings.goals.targetSkills.includes(area.id)}
                onChange={(e) => {
                  const currentSkills = settings.goals.targetSkills;
                  const newSkills = e.target.checked
                    ? [...currentSkills, area.id]
                    : currentSkills.filter((id: string) => id !== area.id);
                  handleInputChange('goals', 'targetSkills', newSkills);
                }}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <span className="text-xl">{area.icon}</span>
                <span className="text-white">{area.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Completion Rate Goal */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Completion Rate Goal</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="range"
              min="50"
              max="100"
              step="5"
              value={settings.goals.completionRate}
              onChange={(e) => handleInputChange('goals', 'completionRate', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-medium min-w-[60px]">
              {settings.goals.completionRate}%
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Target completion rate for enrolled courses
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      {/* Schedule Toggle */}
      <div className="glass-card-dark p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Study Schedule</h3>
          <button
            onClick={() => handleInputChange('schedule', 'enabled', !settings.schedule.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.schedule.enabled
                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                : 'bg-gray-600'
            }`}
            aria-label="Toggle study schedule"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.schedule.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {settings.schedule.enabled && (
          <div className="space-y-4">
            {/* Study Days */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Study Days</label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <label
                    key={day.value}
                    className={`p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                      settings.schedule.studyDays.includes(day.value)
                        ? 'border-red-500 bg-red-500/10 text-white'
                        : 'border-gray-700 bg-gray-800/30 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={settings.schedule.studyDays.includes(day.value)}
                      onChange={(e) => {
                        const currentDays = settings.schedule.studyDays;
                        const newDays = e.target.checked
                          ? [...currentDays, day.value]
                          : currentDays.filter(d => d !== day.value);
                        handleInputChange('schedule', 'studyDays', newDays);
                      }}
                      className="sr-only"
                    />
                    <div className="text-xs font-medium">{day.label.slice(0, 3)}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Study Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                <Input
                  type="time"
                  value={settings.schedule.preferredTime}
                  onChange={(e) => handleInputChange('schedule', 'preferredTime', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Duration (minutes)</label>
                <Select
                  value={settings.schedule.sessionDuration}
                  onChange={(e) => handleInputChange('schedule', 'sessionDuration', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </Select>
              </div>
            </div>

            {/* Break Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Break Duration (minutes)</label>
              <Select
                value={settings.schedule.breakDuration}
                onChange={(e) => handleInputChange('schedule', 'breakDuration', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Preview */}
      {settings.schedule.enabled && (
        <div className="glass-card-dark p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Schedule Preview</h3>
          <div className="space-y-2">
            {settings.schedule.timeSlots.map((slot: { day: string; time: string; duration: number }, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-white capitalize">{slot.day}</span>
                </div>
                <div className="text-gray-400">
                  {slot.time} • {slot.duration} min
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Progress Settings */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Progress Settings</h3>
        <div className="space-y-4">
          {Object.entries(settings.progress).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) return null;
            return (
              <label key={key} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => handleInputChange('progress', key, e.target.checked)}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <span className="text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}
                  </span>
                </div>
                {value && <CheckCircle className="w-4 h-4 text-green-400" />}
              </label>
            );
          })}
        </div>
      </div>

      {/* Review Frequency */}
      <div className="glass-card-dark p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Review Frequency</h3>
        <Select
          value={settings.progress.reviewFrequency}
          onChange={(e) => handleInputChange('progress', 'reviewFrequency', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </div>

      {/* Learning Insights */}
      <div className="glass-card-dark p-6 rounded-xl border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Learning Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {settings.goals.dailyStudyTime}
            </div>
            <div className="text-sm text-gray-400">Daily Study Time (min)</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {settings.schedule.studyDays.length}
            </div>
            <div className="text-sm text-gray-400">Study Days per Week</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {settings.preferences.focusAreas.length}
            </div>
            <div className="text-sm text-gray-400">Focus Areas</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {settings.goals.completionRate}%
            </div>
            <div className="text-sm text-gray-400">Target Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Learning Settings</h2>
        <p className="text-gray-400">Customize your learning experience and goals</p>
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
        {activeTab === 'preferences' && renderPreferences()}
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'progress' && renderProgress()}
      </motion.div>
    </div>
  );
} 