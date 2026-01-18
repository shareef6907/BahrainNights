'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlaySquare,
  Search,
  RefreshCw,
  Trash2,
  Clock,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ThumbsUp,
  Calendar,
  Lightbulb,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import StatusBadge from '@/components/studio/StatusBadge';

interface Story {
  id: string;
  title: string;
  caption: string;
  story_type: 'promo' | 'countdown' | 'poll' | 'question' | 'tip' | 'this_or_that';
  story_sticker_data?: Record<string, unknown>;
  media_urls?: string[];
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  created_at: string;
  scheduled_for?: string;
}

const storyTypeConfig = {
  promo: { icon: Sparkles, label: 'Promo', color: 'from-pink-500 to-rose-500', description: 'Promote events/venues' },
  countdown: { icon: Clock, label: 'Countdown', color: 'from-orange-500 to-yellow-500', description: 'Build anticipation' },
  poll: { icon: ThumbsUp, label: 'Poll', color: 'from-blue-500 to-cyan-500', description: 'Engage audience' },
  question: { icon: HelpCircle, label: 'Question', color: 'from-purple-500 to-violet-500', description: 'Q&A content' },
  tip: { icon: MessageCircle, label: 'Tip', color: 'from-green-500 to-emerald-500', description: 'Share knowledge' },
  this_or_that: { icon: Calendar, label: 'This or That', color: 'from-indigo-500 to-purple-500', description: 'Fun choices' },
};

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // User input states
  const [userInput, setUserInput] = useState('');
  const [selectedStoryType, setSelectedStoryType] = useState<string>('promo');
  const [generateImages, setGenerateImages] = useState(true);
  const [storyCount, setStoryCount] = useState(5);

  useEffect(() => {
    fetchStories();
  }, [filter]);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ type: 'story' });
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/studio/content?${params}`);
      if (response.ok) {
        const data = await response.json();
        setStories(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'story',
          count: storyCount,
          storyType: selectedStoryType,
          userInput,
          generateImages,
        }),
      });

      if (response.ok) {
        await fetchStories();
        setUserInput('');
      }
    } catch (error) {
      console.error('Error generating stories:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    const response = await fetch(`/api/admin/studio/content?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchStories();
    }
  };

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/studio/content/${id}/approve`, {
      method: 'POST',
    });

    if (response.ok) {
      await fetchStories();
    }
  };

  const handleReject = async (id: string) => {
    const response = await fetch(`/api/admin/studio/content/${id}/reject`, {
      method: 'POST',
    });

    if (response.ok) {
      await fetchStories();
    }
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || story.story_type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-6 h-6 text-purple-400" />
            Stories
          </h1>
          <p className="text-gray-400 mt-1">Instagram story sequences with AI backgrounds</p>
        </div>
        <button
          onClick={fetchStories}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all self-start"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* User Input Section */}
      <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Story Topic (optional)
        </h3>

        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Example: Weekend brunch spots, F1 weekend tips, new rooftop bar opening..."
          className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
        />

        {/* Story Type Selection */}
        <div className="mt-4">
          <label className="text-sm text-gray-400 block mb-2">Story Type</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {Object.entries(storyTypeConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedStoryType(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    selectedStoryType === type
                      ? `bg-gradient-to-br ${config.color}`
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${selectedStoryType === type ? 'text-white' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${selectedStoryType === type ? 'text-white' : 'text-gray-400'}`}>
                    {config.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {/* Story Count */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Stories:</label>
            <select
              value={storyCount}
              onChange={(e) => setStoryCount(Number(e.target.value))}
              className="px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          {/* AI Background Images Toggle */}
          <button
            onClick={() => setGenerateImages(!generateImages)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              generateImages
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            {generateImages ? 'AI Backgrounds: On' : 'AI Backgrounds: Off'}
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          <span className="text-purple-400 font-medium">📱</span> AI will generate story-optimized backgrounds (1080x1920) perfect for text overlays
        </p>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full mt-4 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating {storyCount} {storyTypeConfig[selectedStoryType as keyof typeof storyTypeConfig]?.label} stories...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {storyCount} {storyTypeConfig[selectedStoryType as keyof typeof storyTypeConfig]?.label} Stories
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
        >
          <option value="all">All Types</option>
          {Object.entries(storyTypeConfig).map(([type, config]) => (
            <option key={type} value={type}>{config.label}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
        >
          <option value="all">All Status</option>
          <option value="pending_review">Pending</option>
          <option value="approved">Approved</option>
          <option value="posted">Posted</option>
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <PlaySquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Stories Yet</h3>
          <p className="text-gray-400">Use the form above to generate your first Instagram story</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredStories.map((story, index) => {
            const config = storyTypeConfig[story.story_type] || storyTypeConfig.promo;
            const Icon = config.icon;
            const hasImage = story.media_urls?.[0];

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="group relative"
              >
                {/* Story Card - Phone-like aspect ratio */}
                <div className={`aspect-[9/16] rounded-2xl overflow-hidden relative ${!hasImage ? `bg-gradient-to-br ${config.color}` : ''}`}>
                  {/* AI Generated Background Image */}
                  {hasImage && (
                    <>
                      <img
                        src={story.media_urls![0]}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500/90 text-white text-[10px] rounded font-medium">
                        AI Background
                      </div>
                    </>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Icon className="w-8 h-8 text-white/80 mb-2 drop-shadow-lg" />
                    <h3 className="text-white font-bold text-sm line-clamp-2 drop-shadow-lg">{story.title}</h3>
                    <p className="text-white/90 text-xs mt-2 line-clamp-2 drop-shadow-lg">{story.caption}</p>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={story.status} size="sm" showIcon={false} />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    {story.status === 'pending_review' && (
                      <>
                        <button
                          onClick={() => handleApprove(story.id)}
                          className="p-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg transition-all"
                          title="Approve"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(story.id)}
                          className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all"
                          title="Reject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Story Type Label */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{config.label}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(story.created_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
