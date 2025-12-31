'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Image,
  PlaySquare,
  Film,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Zap,
  RefreshCw,
  Lightbulb,
  Send,
  Loader2,
  Utensils,
  Users,
  Palette,
  Music,
  Clapperboard,
  Dumbbell,
  ShoppingBag,
  Briefcase,
  Heart,
  Gift,
  Map,
  HandHeart,
} from 'lucide-react';
import ContentCard from '@/components/studio/ContentCard';
import StatusBadge from '@/components/studio/StatusBadge';
import PreviewModal from '@/components/studio/PreviewModal';
import EditModal from '@/components/studio/EditModal';

interface ContentStats {
  pending: number;
  approved: number;
  scheduled: number;
  published: number;
}

interface PendingContent {
  id: string;
  type: 'blog' | 'feed' | 'story' | 'reel_brief';
  title: string;
  createdAt: string;
  source?: string;
}

// All 12 content categories for BahrainNights
const CONTENT_CATEGORIES = [
  { id: 'dining', label: 'Dining & Restaurants', icon: Utensils, examples: 'new openings, brunches, happy hours, food festivals' },
  { id: 'family', label: 'Family & Kids', icon: Users, examples: 'theme parks, kids events, educational activities' },
  { id: 'arts', label: 'Arts & Culture', icon: Palette, examples: 'exhibitions, theater, museums, cultural festivals' },
  { id: 'music', label: 'Music & Nightlife', icon: Music, examples: 'concerts, live music, DJ nights, lounges' },
  { id: 'cinema', label: 'Cinema', icon: Clapperboard, examples: 'now showing, coming soon, special screenings' },
  { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell, examples: 'matches, fitness events, water sports' },
  { id: 'shopping', label: 'Shopping & Markets', icon: ShoppingBag, examples: 'pop-up markets, craft fairs, vendors' },
  { id: 'business', label: 'Business & Networking', icon: Briefcase, examples: 'conferences, meetups, workshops' },
  { id: 'wellness', label: 'Wellness & Spa', icon: Heart, examples: 'spa offers, yoga, meditation, retreats' },
  { id: 'special', label: 'Special Occasions', icon: Gift, examples: 'holidays, seasonal events, celebrations' },
  { id: 'tours', label: 'Tours & Adventures', icon: Map, examples: 'boat tours, desert trips, cultural tours' },
  { id: 'community', label: 'Community & Charity', icon: HandHeart, examples: 'volunteer events, fundraisers' },
];

export default function StudioDashboardPage() {
  const [stats, setStats] = useState<ContentStats>({
    pending: 0,
    approved: 0,
    scheduled: 0,
    published: 0,
  });
  const [pendingContent, setPendingContent] = useState<PendingContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Content Ideas state
  const [contentIdea, setContentIdea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedContentType, setSelectedContentType] = useState('feed');
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Modal state
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/studio/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || stats);
        setPendingContent(data.pending || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, count: 1 }),
      });

      if (response.ok) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!contentIdea.trim()) return;

    setIsGettingSuggestions(true);
    setSuggestions([]);

    try {
      const response = await fetch('/api/admin/studio/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: contentIdea,
          category: selectedCategory,
          contentType: selectedContentType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setIsGettingSuggestions(false);
    }
  };

  const handleGenerateFromSuggestion = async (suggestion: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedContentType,
          count: 1,
          userInput: suggestion,
          generateImages: true,
        }),
      });

      if (response.ok) {
        await fetchDashboardData();
        setSuggestions([]);
        setContentIdea('');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = (id: string) => {
    setSelectedContentId(id);
    setPreviewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedContentId(id);
    setEditModalOpen(true);
  };

  const statCards = [
    {
      label: 'Pending Review',
      value: stats.pending,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Approved',
      value: stats.approved,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Scheduled',
      value: stats.scheduled,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Published Today',
      value: stats.published,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const quickGenerateOptions = [
    { type: 'blog', label: 'Blog Post', icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { type: 'feed', label: 'Feed Post', icon: Image, color: 'from-pink-500 to-rose-500' },
    { type: 'story', label: 'Story Set', icon: PlaySquare, color: 'from-purple-500 to-violet-500' },
    { type: 'reel', label: 'Reel Brief', icon: Film, color: 'from-orange-500 to-red-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading Content Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Content Studio
          </h1>
          <p className="text-gray-400 mt-1">AI-powered content generation and management</p>
        </div>
        <button
          onClick={() => fetchDashboardData()}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} border border-white/10 rounded-2xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Content Ideas Section - NEW */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Content Ideas</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Share your thoughts and ideas, and AI will help you create engaging content for any category
        </p>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block">Choose a category (optional)</label>
          <div className="flex flex-wrap gap-2">
            {CONTENT_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block">Content type</label>
          <div className="flex gap-2">
            {quickGenerateOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.type}
                  onClick={() => setSelectedContentType(opt.type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedContentType === opt.type
                      ? `bg-gradient-to-r ${opt.color} text-white`
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Idea Input */}
        <div className="flex gap-3">
          <textarea
            value={contentIdea}
            onChange={(e) => setContentIdea(e.target.value)}
            placeholder="Share your content idea... e.g., 'I want to write about the new brunch spot in Seef - they have amazing eggs benedict for BD 8 and the view is incredible. Also worth mentioning they have a kids menu.'"
            className="flex-1 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 resize-none h-24 focus:outline-none focus:border-purple-500/50"
          />
          <button
            onClick={handleGetSuggestions}
            disabled={!contentIdea.trim() || isGettingSuggestions}
            className="px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGettingSuggestions ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-400">AI Suggestions - click to generate:</p>
            {suggestions.map((suggestion, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleGenerateFromSuggestion(suggestion)}
                disabled={isGenerating}
                className="w-full text-left p-3 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-purple-500/30 rounded-xl text-gray-300 transition-all disabled:opacity-50"
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Generate Section */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Quick Generate</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Generate AI content based on upcoming events and trending topics across ALL categories
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickGenerateOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => handleQuickGenerate(option.type)}
                disabled={isGenerating}
                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${option.color} opacity-90 hover:opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Pending Review</h2>
            {stats.pending > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                {stats.pending}
              </span>
            )}
          </div>
        </div>

        {pendingContent.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-400">All caught up! No content pending review.</p>
            <p className="text-gray-500 text-sm mt-1">Use Content Ideas or Quick Generate to create new content</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingContent.map((content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                type={content.type}
                title={content.title}
                createdAt={content.createdAt}
                source={content.source}
                onApprove={fetchDashboardData}
                onReject={fetchDashboardData}
                onPreview={() => handlePreview(content.id)}
                onEdit={() => handleEdit(content.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-400">Content Studio initialized</span>
              <span className="text-gray-500 ml-auto">Just now</span>
            </div>
          </div>
        </div>

        {/* AI Status */}
        <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">AI Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Claude Haiku</span>
              <StatusBadge status="active" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Auto-Generation</span>
              <StatusBadge status="inactive" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Instagram API</span>
              <StatusBadge status="not_connected" />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        contentId={selectedContentId}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        contentId={selectedContentId}
        onSave={fetchDashboardData}
      />
    </div>
  );
}
