'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, Check } from 'lucide-react';

interface AIWriterButtonProps {
  title: string;
  category?: string;
  venue?: string;
  date?: string;
  time?: string;
  existingDescription?: string;
  onGenerated: (description: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function AIWriterButton({
  title,
  category,
  venue,
  date,
  time,
  existingDescription,
  onGenerated,
  disabled = false,
  className = '',
}: AIWriterButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError('Please enter an event title first');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          venue,
          date,
          time,
          existingDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description');
      }

      onGenerated(data.description);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate description');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const baseButtonClass = `
    inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
    transition-all duration-200 relative overflow-hidden
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const buttonStyles = success
    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
    : error
    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
    : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50';

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleGenerate}
        disabled={disabled || isLoading}
        className={`${baseButtonClass} ${buttonStyles}`}
        title={existingDescription ? 'Enhance description with AI' : 'Generate description with AI'}
      >
        {/* Animated background shimmer */}
        {!isLoading && !error && !success && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        )}

        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Writing...</span>
          </>
        ) : success ? (
          <>
            <Check className="w-4 h-4" />
            <span>Done!</span>
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Try Again</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>{existingDescription ? 'Enhance with AI' : 'Write with AI'}</span>
          </>
        )}
      </button>

      {/* Error tooltip */}
      {error && (
        <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-red-500/90 text-white text-xs rounded-lg shadow-lg z-50 max-w-xs">
          {error}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-red-500/90 rotate-45" />
        </div>
      )}
    </div>
  );
}

// Compact version for inline use
export function AIWriterButtonCompact({
  title,
  category,
  venue,
  date,
  time,
  existingDescription,
  onGenerated,
  disabled = false,
}: Omit<AIWriterButtonProps, 'className'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError('Enter title first');
      setTimeout(() => setError(null), 2000);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, venue, date, time, existingDescription }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      onGenerated(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
        transition-all duration-200
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${error
          ? 'bg-red-500/20 text-red-400'
          : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30'
        }
      `}
      title={error || (existingDescription ? 'Enhance with AI' : 'Generate with AI')}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Sparkles className="w-3 h-3" />
      )}
      <span>{error || (isLoading ? 'Writing...' : 'AI')}</span>
    </button>
  );
}
