'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

// ============================================
// ANIMATED BUTTON - Press effect with ripple
// ============================================
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const baseStyles = 'relative overflow-hidden font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 100,
            top: ripple.y - 100,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ============================================
// INTERACTIVE CARD - Hover lift and tilt
// ============================================
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  enableTilt?: boolean;
}

export function InteractiveCard({
  children,
  className = '',
  onClick,
  enableTilt = true,
}: InteractiveCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enableTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ANIMATED HEART - Like/Save animation
// ============================================
interface AnimatedHeartProps {
  isLiked: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

export function AnimatedHeart({
  isLiked,
  onToggle,
  size = 'md',
  showCount = false,
  count = 0,
}: AnimatedHeartProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const containerSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative ${containerSizes[size]} flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors`}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      {/* Particle burst effect */}
      <AnimatePresence>
        {isAnimating && isLiked && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: 1.5,
                  opacity: 0,
                  x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Heart icon */}
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 0.9, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`${sizeClasses[size]} transition-colors ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-white'
          }`}
        />
      </motion.div>

      {/* Count display */}
      {showCount && count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </button>
  );
}

// ============================================
// PAGE TRANSITION WRAPPER
// ============================================
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STAGGER CHILDREN - Animate children one by one
// ============================================
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.05 
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PULSE BADGE - Animated notification badge
// ============================================
interface PulseBadgeProps {
  children: ReactNode;
  show?: boolean;
  color?: 'red' | 'orange' | 'green' | 'blue';
}

export function PulseBadge({ children, show = true, color = 'red' }: PulseBadgeProps) {
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  if (!show) return null;

  return (
    <span className={`relative inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white rounded-full ${colorClasses[color]}`}>
      <span className={`absolute inset-0 rounded-full ${colorClasses[color]} animate-ping opacity-75`} />
      <span className="relative">{children}</span>
    </span>
  );
}

// ============================================
// SWIPE INDICATOR - Shows swipe direction hints
// ============================================
export function SwipeIndicator({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      className="flex items-center justify-center gap-1 text-white/50 text-xs"
    >
      {direction === 'horizontal' ? (
        <>
          <motion.span animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1 }}>
            ←
          </motion.span>
          <span>Swipe</span>
          <motion.span animate={{ x: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1 }}>
            →
          </motion.span>
        </>
      ) : (
        <>
          <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1 }}>
            ↑
          </motion.span>
          <span>Swipe</span>
          <motion.span animate={{ y: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1 }}>
            ↓
          </motion.span>
        </>
      )}
    </motion.div>
  );
}
