'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  RefreshCw,
  Sparkles,
  Bell,
  Shield,
  Clock,
  Instagram,
  Globe,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

interface ContentSettings {
  id?: string;
  default_tone: string;
  default_language: string;
  include_emojis: boolean;
  hashtag_count: number;
  caption_length: string;
  auto_generate_enabled: boolean;
  auto_generate_time: string;
  auto_generate_blog_count: number;
  auto_generate_feed_count: number;
  auto_generate_story_count: number;
  auto_generate_reel_count: number;
  block_political: boolean;
  block_religious: boolean;
  block_inappropriate: boolean;
  block_alcohol: boolean;
  notify_browser: boolean;
  notify_email: boolean;
  notification_email: string | null;
}

const defaultSettings: ContentSettings = {
  default_tone: 'friendly',
  default_language: 'en',
  include_emojis: true,
  hashtag_count: 12,
  caption_length: 'medium',
  auto_generate_enabled: false,
  auto_generate_time: '06:00',
  auto_generate_blog_count: 3,
  auto_generate_feed_count: 3,
  auto_generate_story_count: 10,
  auto_generate_reel_count: 1,
  block_political: true,
  block_religious: true,
  block_inappropriate: true,
  block_alcohol: true,
  notify_browser: true,
  notify_email: true,
  notification_email: null,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<ContentSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/studio/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings || defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const response = await fetch('/api/admin/studio/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof ContentSettings>(key: K, value: ContentSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-400" />
            Studio Settings
          </h1>
          <p className="text-gray-400 mt-1">Configure AI generation and automation</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSettings}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveStatus === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* AI Settings */}
      <section className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">AI Generation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Default Tone</label>
            <select
              value={settings.default_tone}
              onChange={(e) => updateSetting('default_tone', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="exciting">Exciting</option>
              <option value="informative">Informative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Default Language</label>
            <select
              value={settings.default_language}
              onChange={(e) => updateSetting('default_language', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="both">Both (Bilingual)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Caption Length</label>
            <select
              value={settings.caption_length}
              onChange={(e) => updateSetting('caption_length', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="short">Short (1-2 sentences)</option>
              <option value="medium">Medium (2-4 sentences)</option>
              <option value="long">Long (4-6 sentences)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Hashtag Count</label>
            <input
              type="number"
              min={5}
              max={30}
              value={settings.hashtag_count}
              onChange={(e) => updateSetting('hashtag_count', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.include_emojis}
                onChange={(e) => updateSetting('include_emojis', e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/50"
              />
              <span className="text-gray-300">Include emojis in generated content</span>
            </label>
          </div>
        </div>
      </section>

      {/* Auto-Generation */}
      <section className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Auto-Generation</h2>
        </div>

        <div className="space-y-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.auto_generate_enabled}
              onChange={(e) => updateSetting('auto_generate_enabled', e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
            />
            <span className="text-gray-300">Enable automatic content generation</span>
          </label>

          {settings.auto_generate_enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10"
            >
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Generation Time (Daily)</label>
                <input
                  type="time"
                  value={settings.auto_generate_time}
                  onChange={(e) => updateSetting('auto_generate_time', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Blog Posts</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={settings.auto_generate_blog_count}
                    onChange={(e) => updateSetting('auto_generate_blog_count', parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Feed Posts</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={settings.auto_generate_feed_count}
                    onChange={(e) => updateSetting('auto_generate_feed_count', parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Stories</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={settings.auto_generate_story_count}
                    onChange={(e) => updateSetting('auto_generate_story_count', parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Reel Briefs</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={settings.auto_generate_reel_count}
                    onChange={(e) => updateSetting('auto_generate_reel_count', parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">Content Compliance</h2>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Automatically filter out content that may be inappropriate for Bahrain
        </p>

        <div className="space-y-3">
          {[
            { key: 'block_political' as const, label: 'Block political content' },
            { key: 'block_religious' as const, label: 'Block religious content' },
            { key: 'block_inappropriate' as const, label: 'Block inappropriate content' },
            { key: 'block_alcohol' as const, label: 'Block alcohol-related content' },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) => updateSetting(item.key, e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500/50"
              />
              <span className="text-gray-300">{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notify_browser}
              onChange={(e) => updateSetting('notify_browser', e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-yellow-500 focus:ring-yellow-500/50"
            />
            <span className="text-gray-300">Browser notifications for new content</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notify_email}
              onChange={(e) => updateSetting('notify_email', e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-yellow-500 focus:ring-yellow-500/50"
            />
            <span className="text-gray-300">Email notifications for pending reviews</span>
          </label>

          {settings.notify_email && (
            <div className="pl-8">
              <input
                type="email"
                placeholder="notification@example.com"
                value={settings.notification_email || ''}
                onChange={(e) => updateSetting('notification_email', e.target.value)}
                className="w-full max-w-md px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50"
              />
            </div>
          )}
        </div>
      </section>

      {/* Instagram Connection (Placeholder) */}
      <section className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Instagram className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg font-semibold text-white">Instagram Connection</h2>
        </div>

        <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-yellow-400 font-medium">Not Connected</p>
            <p className="text-gray-400 text-sm">Instagram API integration coming soon. Connect your account to enable auto-posting.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
