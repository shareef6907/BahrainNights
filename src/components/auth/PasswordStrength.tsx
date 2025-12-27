'use client';

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  showRequirements?: boolean;
}

export default function PasswordStrength({
  password,
  showRequirements = true,
}: PasswordStrengthProps) {
  const analysis = useMemo(() => {
    const requirements = [
      {
        label: 'At least 8 characters',
        met: password.length >= 8,
      },
      {
        label: 'One uppercase letter',
        met: /[A-Z]/.test(password),
      },
      {
        label: 'One lowercase letter',
        met: /[a-z]/.test(password),
      },
      {
        label: 'One number',
        met: /[0-9]/.test(password),
      },
      {
        label: 'One special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        optional: true,
      },
    ];

    const score = requirements.filter((r) => r.met && !r.optional).length;
    const bonusScore = requirements.filter((r) => r.met && r.optional).length;

    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    let color = 'bg-red-500';
    let textColor = 'text-red-400';

    if (score >= 4 && bonusScore >= 1) {
      strength = 'strong';
      color = 'bg-yellow-400';
      textColor = 'text-yellow-400';
    } else if (score >= 4) {
      strength = 'good';
      color = 'bg-green-500';
      textColor = 'text-green-400';
    } else if (score >= 3) {
      strength = 'fair';
      color = 'bg-yellow-500';
      textColor = 'text-yellow-500';
    }

    const percentage =
      (requirements.filter((r) => r.met).length / requirements.length) * 100;

    return { requirements, strength, color, textColor, percentage };
  }, [password]);

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Password strength</span>
          <span className={`text-xs font-medium capitalize ${analysis.textColor}`}>
            {analysis.strength}
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${analysis.color} transition-all duration-300 ease-out`}
            style={{ width: `${analysis.percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="grid grid-cols-2 gap-2">
          {analysis.requirements.map((req) => (
            <div
              key={req.label}
              className={`flex items-center gap-2 text-xs ${
                req.met ? 'text-green-400' : 'text-gray-500'
              }`}
            >
              {req.met ? (
                <Check className="w-3 h-3 flex-shrink-0" />
              ) : (
                <X className="w-3 h-3 flex-shrink-0" />
              )}
              <span>
                {req.label}
                {req.optional && ' (optional)'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
