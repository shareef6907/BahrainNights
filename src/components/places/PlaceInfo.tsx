'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlaceInfoProps {
  description: string;
}

export default function PlaceInfo({ description }: PlaceInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 400;
  const displayText = expanded || !isLong ? description : `${description.slice(0, 400)}...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-4">About</h2>

      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
        {displayText.split('\n').map((paragraph, index) => (
          <p key={index} className={index > 0 ? 'mt-4' : ''}>
            {paragraph}
          </p>
        ))}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-4 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}
