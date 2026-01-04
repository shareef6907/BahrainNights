'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Move, ZoomIn, ZoomOut, Check, X } from 'lucide-react';

interface ImagePositionerProps {
  imageUrl: string;
  initialPosition?: { x: number; y: number };
  initialScale?: number;
  onSave: (position: { x: number; y: number }, scale: number) => void;
  onCancel: () => void;
}

export default function ImagePositioner({
  imageUrl,
  initialPosition = { x: 50, y: 50 },
  initialScale = 1,
  onSave,
  onCancel,
}: ImagePositionerProps) {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    startPosRef.current = {
      x: clientX,
      y: clientY,
      posX: position.x,
      posY: position.y,
    };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate movement as percentage of container size
    const deltaX = ((clientX - startPosRef.current.x) / rect.width) * 100;
    const deltaY = ((clientY - startPosRef.current.y) / rect.height) * 100;

    // Invert the movement so dragging feels natural (drag right = show left part of image)
    let newX = startPosRef.current.posX - deltaX;
    let newY = startPosRef.current.posY - deltaY;

    // Clamp values between 0 and 100
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(2, prev + 0.1));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(1, prev - 0.1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-gray-900 rounded-2xl overflow-hidden max-w-2xl w-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Move className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Reposition Image</span>
          </div>
          <p className="text-sm text-gray-400">Drag to adjust focus area</p>
        </div>

        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative h-64 md:h-80 overflow-hidden cursor-move select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Reposition preview"
            className="w-full h-full object-cover transition-transform"
            style={{
              objectPosition: `${position.x}% ${position.y}%`,
              transform: `scale(${scale})`,
            }}
            draggable={false}
          />

          {/* Drag Indicator Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-2 border-dashed border-white/30" />
            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-400/50" />
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-cyan-400/50" />
            </div>
          </div>

          {/* Position Indicator */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Position: {Math.round(position.x)}%, {Math.round(position.y)}%
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-white/10 space-y-4">
          {/* Zoom Control */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 w-16">Zoom</span>
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomOut className="w-4 h-4 text-white" />
            </button>
            <input
              type="range"
              min="100"
              max="200"
              value={scale * 100}
              onChange={(e) => setScale(parseInt(e.target.value) / 100)}
              className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <button
              onClick={handleZoomIn}
              disabled={scale >= 2}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <span className="text-sm text-gray-400 w-12 text-right">{Math.round(scale * 100)}%</span>
          </div>

          {/* Quick Position Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 w-16">Quick</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: 'Center', x: 50, y: 50 },
                { label: 'Top', x: 50, y: 25 },
                { label: 'Bottom', x: 50, y: 75 },
                { label: 'Left', x: 25, y: 50 },
                { label: 'Right', x: 75, y: 50 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setPosition({ x: preset.x, y: preset.y })}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    position.x === preset.x && position.y === preset.y
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={() => onSave(position, scale)}
              className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
