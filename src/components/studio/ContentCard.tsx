'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Image,
  PlaySquare,
  Film,
  Check,
  X,
  Eye,
  Edit3,
  Clock,
  ExternalLink,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

interface ContentCardProps {
  id: string;
  type: 'blog' | 'feed' | 'story' | 'reel_brief';
  title: string;
  createdAt: string;
  source?: string;
  status?: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  scheduledFor?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onPreview?: () => void;
}

const typeConfig = {
  blog: {
    icon: FileText,
    label: 'Blog Post',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
  },
  feed: {
    icon: Image,
    label: 'Feed Post',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
  },
  story: {
    icon: PlaySquare,
    label: 'Story',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
  },
  reel_brief: {
    icon: Film,
    label: 'Reel Brief',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
};

export default function ContentCard({
  id,
  type,
  title,
  createdAt,
  source,
  status = 'pending_review',
  scheduledFor,
  onApprove,
  onReject,
  onEdit,
  onPreview,
}: ContentCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/studio/content/${id}/approve`, {
        method: 'POST',
      });
      if (response.ok && onApprove) {
        onApprove();
      }
    } catch (error) {
      console.error('Error approving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/studio/content/${id}/reject`, {
        method: 'POST',
      });
      if (response.ok && onReject) {
        onReject();
      }
    } catch (error) {
      console.error('Error rejecting content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bgColor} border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all`}
    >
      <div className="flex items-start gap-4">
        {/* Type Icon */}
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-white font-medium truncate">{title}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <span>{config.label}</span>
                {source && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {source}
                    </span>
                  </>
                )}
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(createdAt)}
            </span>
            {scheduledFor && (
              <span className="text-cyan-400">
                Scheduled: {new Date(scheduledFor).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Actions */}
          {status === 'pending_review' && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleApprove}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={handleReject}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={onPreview}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-all ml-auto"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-all"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
