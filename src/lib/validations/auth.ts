import { z } from 'zod';

// Common validators
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register Step 1: Account Details
export const registerStep1Schema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterStep1Input = z.infer<typeof registerStep1Schema>;

// Bahrain CR Number validator (5-7 digits, optionally followed by -1)
const crNumberSchema = z
  .string()
  .min(1, 'CR Number is required')
  .regex(
    /^\d{5,7}(-1)?$/,
    'Invalid CR Number format. Example: 12345 or 123456-1'
  );

// Register Step 2: Venue Information
export const registerStep2Schema = z.object({
  venueName: z
    .string()
    .min(2, 'Venue name must be at least 2 characters')
    .max(100, 'Venue name must be less than 100 characters'),
  crNumber: crNumberSchema,
  venueType: z.enum(
    [
      'restaurant',
      'cafe',
      'lounge_bar',
      'nightclub',
      'beach_pool_club',
      'hotel',
      'other',
    ],
    {
      message: 'Please select a venue type',
    }
  ),
  phone: z
    .string()
    .min(8, 'Please enter a valid phone number')
    .regex(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  instagram: z
    .string()
    .regex(/^@?[a-zA-Z0-9._]+$/, 'Please enter a valid Instagram handle')
    .optional()
    .or(z.literal('')),
});

export type RegisterStep2Input = z.infer<typeof registerStep2Schema>;

// Register Step 3: Location Details
export const registerStep3Schema = z.object({
  area: z.enum(
    [
      'manama',
      'seef',
      'juffair',
      'amwaj',
      'adliya',
      'riffa',
      'muharraq',
      'other',
    ],
    {
      message: 'Please select an area',
    }
  ),
  address: z
    .string()
    .min(10, 'Please enter a complete address')
    .max(200, 'Address must be less than 200 characters'),
  googleMapsLink: z
    .string()
    .url('Please enter a valid Google Maps URL')
    .optional()
    .or(z.literal('')),
  agreeToTerms: z.literal(true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type RegisterStep3Input = z.infer<typeof registerStep3Schema>;

// Full registration schema (combined)
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    venueName: z.string().min(2).max(100),
    crNumber: crNumberSchema,
    venueType: z.enum([
      'restaurant',
      'cafe',
      'lounge_bar',
      'nightclub',
      'beach_pool_club',
      'hotel',
      'other',
    ]),
    phone: z.string().min(8),
    website: z.string().optional().or(z.literal('')),
    instagram: z.string().optional().or(z.literal('')),
    area: z.enum([
      'manama',
      'seef',
      'juffair',
      'amwaj',
      'adliya',
      'riffa',
      'muharraq',
      'other',
    ]),
    address: z.string().min(10).max(200),
    googleMapsLink: z.string().optional().or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Venue type options for dropdowns
export const venueTypeOptions = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'lounge_bar', label: 'Lounge / Bar' },
  { value: 'nightclub', label: 'Nightclub' },
  { value: 'beach_pool_club', label: 'Beach / Pool Club' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'other', label: 'Other' },
] as const;

// Area options for dropdowns
export const areaOptions = [
  { value: 'manama', label: 'Manama' },
  { value: 'seef', label: 'Seef' },
  { value: 'juffair', label: 'Juffair' },
  { value: 'amwaj', label: 'Amwaj' },
  { value: 'adliya', label: 'Adliya' },
  { value: 'riffa', label: 'Riffa' },
  { value: 'muharraq', label: 'Muharraq' },
  { value: 'other', label: 'Other' },
] as const;
