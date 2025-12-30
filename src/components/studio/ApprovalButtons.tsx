'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2, Calendar, Edit3 } from 'lucide-react';

interface ApprovalButtonsProps {
  contentId: string;
  onApprove?: () => void;
  onReject?: () => void;
  onSchedule?: () => void;
  onEdit?: () => void;
  showSchedule?: boolean;
  showEdit?: boolean;
  size?: 'sm' | 'md';
}

export default function ApprovalButtons({
  contentId,
  onApprove,
  onReject,
  onSchedule,
  onEdit,
  showSchedule = false,
  showEdit = false,
  size = 'md',
}: ApprovalButtonsProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`/api/admin/studio/content/${contentId}/approve`, {
        method: 'POST',
      });
      if (response.ok && onApprove) {
        onApprove();
      }
    } catch (error) {
      console.error('Error approving content:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const response = await fetch(`/api/admin/studio/content/${contentId}/reject`, {
        method: 'POST',
      });
      if (response.ok && onReject) {
        onReject();
      }
    } catch (error) {
      console.error('Error rejecting content:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-1.5',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  const isLoading = isApproving || isRejecting;

  return (
    <div className="flex items-center gap-2">
      {/* Approve Button */}
      <motion.button
        onClick={handleApprove}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={`
          flex items-center ${sizeClasses[size]}
          bg-green-500/20 hover:bg-green-500/30
          text-green-400 rounded-lg font-medium
          transition-all disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isApproving ? (
          <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
        ) : (
          <Check className={iconSizeClasses[size]} />
        )}
        <span>Approve</span>
      </motion.button>

      {/* Reject Button */}
      <motion.button
        onClick={handleReject}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={`
          flex items-center ${sizeClasses[size]}
          bg-red-500/20 hover:bg-red-500/30
          text-red-400 rounded-lg font-medium
          transition-all disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isRejecting ? (
          <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
        ) : (
          <X className={iconSizeClasses[size]} />
        )}
        <span>Reject</span>
      </motion.button>

      {/* Schedule Button (optional) */}
      {showSchedule && onSchedule && (
        <motion.button
          onClick={onSchedule}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`
            flex items-center ${sizeClasses[size]}
            bg-blue-500/20 hover:bg-blue-500/30
            text-blue-400 rounded-lg font-medium
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Calendar className={iconSizeClasses[size]} />
          <span>Schedule</span>
        </motion.button>
      )}

      {/* Edit Button (optional) */}
      {showEdit && onEdit && (
        <motion.button
          onClick={onEdit}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`
            flex items-center ${sizeClasses[size]}
            bg-white/5 hover:bg-white/10
            text-gray-400 hover:text-white rounded-lg font-medium
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Edit3 className={iconSizeClasses[size]} />
          <span>Edit</span>
        </motion.button>
      )}
    </div>
  );
}
