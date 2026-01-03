export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          role: 'venue_owner' | 'admin';
          status: 'active' | 'suspended';
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          role?: 'venue_owner' | 'admin';
          status?: 'active' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          role?: 'venue_owner' | 'admin';
          status?: 'active' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      venues: {
        Row: {
          id: string;
          owner_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          description_ar: string | null;
          category: string;
          subcategories: string[] | null;
          cuisine_types: string[] | null;
          area: string;
          address: string;
          latitude: number | null;
          longitude: number | null;
          google_maps_url: string | null;
          phone: string | null;
          email: string | null;
          password_hash: string | null;
          website: string | null;
          whatsapp: string | null;
          instagram: string | null;
          facebook: string | null;
          tiktok: string | null;
          twitter: string | null;
          menu_url: string | null;
          booking_url: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          gallery: string[] | null;
          opening_hours: Json | null;
          price_range: number | null;
          avg_cost_per_person: string | null;
          features: string[] | null;
          status: 'pending' | 'approved' | 'rejected' | 'suspended';
          rejection_reason: string | null;
          is_verified: boolean;
          is_featured: boolean;
          view_count: number;
          like_count: number;
          created_at: string;
          updated_at: string;
          approved_at: string | null;
        };
        Insert: {
          id?: string;
          owner_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          description_ar?: string | null;
          category: string;
          subcategories?: string[] | null;
          cuisine_types?: string[] | null;
          area: string;
          address: string;
          latitude?: number | null;
          longitude?: number | null;
          google_maps_url?: string | null;
          phone?: string | null;
          email?: string | null;
          password_hash?: string | null;
          website?: string | null;
          whatsapp?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          tiktok?: string | null;
          twitter?: string | null;
          menu_url?: string | null;
          booking_url?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          gallery?: string[] | null;
          opening_hours?: Json | null;
          price_range?: number | null;
          avg_cost_per_person?: string | null;
          features?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected' | 'suspended';
          rejection_reason?: string | null;
          is_verified?: boolean;
          is_featured?: boolean;
          view_count?: number;
          like_count?: number;
          created_at?: string;
          updated_at?: string;
          approved_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          description_ar?: string | null;
          category?: string;
          subcategories?: string[] | null;
          cuisine_types?: string[] | null;
          area?: string;
          address?: string;
          latitude?: number | null;
          longitude?: number | null;
          google_maps_url?: string | null;
          phone?: string | null;
          email?: string | null;
          password_hash?: string | null;
          website?: string | null;
          whatsapp?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          tiktok?: string | null;
          twitter?: string | null;
          menu_url?: string | null;
          booking_url?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          gallery?: string[] | null;
          opening_hours?: Json | null;
          price_range?: number | null;
          avg_cost_per_person?: string | null;
          features?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected' | 'suspended';
          rejection_reason?: string | null;
          is_verified?: boolean;
          is_featured?: boolean;
          view_count?: number;
          like_count?: number;
          created_at?: string;
          updated_at?: string;
          approved_at?: string | null;
        };
      };
      events: {
        Row: {
          id: string;
          venue_id: string | null;
          created_by: string | null;
          title: string;
          slug: string;
          description: string | null;
          description_ar: string | null;
          category: string;
          tags: string[] | null;
          venue_name: string | null;
          venue_address: string | null;
          venue_lat: number | null;
          venue_lng: number | null;
          venue_place_id: string | null;
          date: string | null;
          time: string | null;
          start_date: string | null;
          start_time: string | null;
          end_date: string | null;
          end_time: string | null;
          price: string | null;
          price_min: number | null;
          price_max: number | null;
          cover_url: string | null;
          featured_image: string | null;
          image_url: string | null;
          thumbnail: string | null;
          banner_url: string | null;
          gallery: string[] | null;
          gallery_urls: string[] | null;
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          booking_url: string | null;
          booking_link: string | null;
          booking_method: string | null;
          google_maps_link: string | null;
          age_restriction: string | null;
          dress_code: string | null;
          special_instructions: string | null;
          is_recurring: boolean;
          recurrence_pattern: string | null;
          recurrence_days: string[] | null;
          source_url: string | null;
          source_name: string | null;
          source_event_id: string | null;
          last_scraped_at: string | null;
          status: string;
          rejection_reason: string | null;
          is_featured: boolean;
          views: number;
          view_count: number;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          venue_id?: string | null;
          created_by?: string | null;
          title: string;
          slug: string;
          description?: string | null;
          description_ar?: string | null;
          category: string;
          tags?: string[] | null;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_lat?: number | null;
          venue_lng?: number | null;
          venue_place_id?: string | null;
          date?: string | null;
          time?: string | null;
          start_date?: string | null;
          start_time?: string | null;
          end_date?: string | null;
          end_time?: string | null;
          price?: string | null;
          price_min?: number | null;
          price_max?: number | null;
          cover_url?: string | null;
          featured_image?: string | null;
          image_url?: string | null;
          thumbnail?: string | null;
          banner_url?: string | null;
          gallery?: string[] | null;
          gallery_urls?: string[] | null;
          contact_name?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          booking_url?: string | null;
          booking_link?: string | null;
          booking_method?: string | null;
          google_maps_link?: string | null;
          age_restriction?: string | null;
          dress_code?: string | null;
          special_instructions?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          recurrence_days?: string[] | null;
          source_url?: string | null;
          source_name?: string | null;
          source_event_id?: string | null;
          last_scraped_at?: string | null;
          status?: string;
          rejection_reason?: string | null;
          is_featured?: boolean;
          views?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          venue_id?: string | null;
          created_by?: string | null;
          title?: string;
          slug?: string;
          description?: string | null;
          description_ar?: string | null;
          category?: string;
          tags?: string[] | null;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_lat?: number | null;
          venue_lng?: number | null;
          venue_place_id?: string | null;
          date?: string | null;
          time?: string | null;
          start_date?: string | null;
          start_time?: string | null;
          end_date?: string | null;
          end_time?: string | null;
          price?: string | null;
          price_min?: number | null;
          price_max?: number | null;
          cover_url?: string | null;
          featured_image?: string | null;
          image_url?: string | null;
          thumbnail?: string | null;
          banner_url?: string | null;
          gallery?: string[] | null;
          gallery_urls?: string[] | null;
          contact_name?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          booking_url?: string | null;
          booking_link?: string | null;
          booking_method?: string | null;
          google_maps_link?: string | null;
          age_restriction?: string | null;
          dress_code?: string | null;
          special_instructions?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          recurrence_days?: string[] | null;
          source_url?: string | null;
          source_name?: string | null;
          source_event_id?: string | null;
          last_scraped_at?: string | null;
          status?: string;
          rejection_reason?: string | null;
          is_featured?: boolean;
          views?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      offers: {
        Row: {
          id: string;
          venue_id: string | null;
          created_by: string | null;
          title: string;
          slug: string;
          description: string;
          offer_type: 'ladies-night' | 'brunch' | 'happy-hour' | 'special-deal';
          days_available: string[];
          start_time: string;
          end_time: string;
          valid_from: string | null;
          valid_until: string | null;
          is_ongoing: boolean;
          whats_included: string[] | null;
          terms_conditions: string | null;
          reservation_required: boolean;
          featured_image: string | null;
          status: 'draft' | 'active' | 'expired' | 'paused';
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id?: string | null;
          created_by?: string | null;
          title: string;
          slug: string;
          description: string;
          offer_type: 'ladies-night' | 'brunch' | 'happy-hour' | 'special-deal';
          days_available: string[];
          start_time: string;
          end_time: string;
          valid_from?: string | null;
          valid_until?: string | null;
          is_ongoing?: boolean;
          whats_included?: string[] | null;
          terms_conditions?: string | null;
          reservation_required?: boolean;
          featured_image?: string | null;
          status?: 'draft' | 'active' | 'expired' | 'paused';
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string | null;
          created_by?: string | null;
          title?: string;
          slug?: string;
          description?: string;
          offer_type?: 'ladies-night' | 'brunch' | 'happy-hour' | 'special-deal';
          days_available?: string[];
          start_time?: string;
          end_time?: string;
          valid_from?: string | null;
          valid_until?: string | null;
          is_ongoing?: boolean;
          whats_included?: string[] | null;
          terms_conditions?: string | null;
          reservation_required?: boolean;
          featured_image?: string | null;
          status?: 'draft' | 'active' | 'expired' | 'paused';
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      movies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          overview: string | null;
          duration_minutes: number | null;
          rating: string | null;
          genre: string[] | null;
          language: string | null;
          release_date: string | null;
          tmdb_id: number | null;
          imdb_id: string | null;
          imdb_rating: number | null;
          tmdb_rating: number | null;
          poster_url: string | null;
          backdrop_url: string | null;
          trailer_url: string | null;
          status: 'now_showing' | 'coming_soon' | 'ended';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          overview?: string | null;
          duration_minutes?: number | null;
          rating?: string | null;
          genre?: string[] | null;
          language?: string | null;
          release_date?: string | null;
          tmdb_id?: number | null;
          imdb_id?: string | null;
          imdb_rating?: number | null;
          tmdb_rating?: number | null;
          poster_url?: string | null;
          backdrop_url?: string | null;
          trailer_url?: string | null;
          status?: 'now_showing' | 'coming_soon' | 'ended';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          overview?: string | null;
          duration_minutes?: number | null;
          rating?: string | null;
          genre?: string[] | null;
          language?: string | null;
          release_date?: string | null;
          tmdb_id?: number | null;
          imdb_id?: string | null;
          imdb_rating?: number | null;
          tmdb_rating?: number | null;
          poster_url?: string | null;
          backdrop_url?: string | null;
          trailer_url?: string | null;
          status?: 'now_showing' | 'coming_soon' | 'ended';
          created_at?: string;
          updated_at?: string;
        };
      };
      showtimes: {
        Row: {
          id: string;
          movie_id: string | null;
          cinema_name: string;
          cinema_location: string | null;
          showtime: string;
          show_date: string;
          screen_type: string | null;
          booking_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          movie_id?: string | null;
          cinema_name: string;
          cinema_location?: string | null;
          showtime: string;
          show_date: string;
          screen_type?: string | null;
          booking_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          movie_id?: string | null;
          cinema_name?: string;
          cinema_location?: string | null;
          showtime?: string;
          show_date?: string;
          screen_type?: string | null;
          booking_url?: string | null;
          created_at?: string;
        };
      };
      homepage_ads: {
        Row: {
          id: string;
          advertiser_name: string;
          company_name: string | null;
          contact_email: string;
          contact_phone: string | null;
          title: string | null;
          subtitle: string | null;
          cta_text: string | null;
          image_url: string;
          target_url: string;
          slot_position: number | null;
          start_date: string;
          end_date: string;
          price_bd: number;
          invoice_number: string | null;
          payment_status: 'pending' | 'paid' | 'overdue';
          payment_date: string | null;
          impressions: number;
          clicks: number;
          status: 'pending' | 'active' | 'paused' | 'expired';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          advertiser_name: string;
          company_name?: string | null;
          contact_email: string;
          contact_phone?: string | null;
          title?: string | null;
          subtitle?: string | null;
          cta_text?: string | null;
          image_url: string;
          target_url: string;
          slot_position?: number | null;
          start_date: string;
          end_date: string;
          price_bd: number;
          invoice_number?: string | null;
          payment_status?: 'pending' | 'paid' | 'overdue';
          payment_date?: string | null;
          impressions?: number;
          clicks?: number;
          status?: 'pending' | 'active' | 'paused' | 'expired';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          advertiser_name?: string;
          company_name?: string | null;
          contact_email?: string;
          contact_phone?: string | null;
          title?: string | null;
          subtitle?: string | null;
          cta_text?: string | null;
          image_url?: string;
          target_url?: string;
          slot_position?: number | null;
          start_date?: string;
          end_date?: string;
          price_bd?: number;
          invoice_number?: string | null;
          payment_status?: 'pending' | 'paid' | 'overdue';
          payment_date?: string | null;
          impressions?: number;
          clicks?: number;
          status?: 'pending' | 'active' | 'paused' | 'expired';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sponsors: {
        Row: {
          id: string;
          venue_id: string | null;
          name: string;
          tier: 'golden' | 'silver';
          logo_url: string;
          website_url: string | null;
          start_date: string;
          end_date: string;
          price_bd: number;
          payment_status: string | null;
          status: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          venue_id?: string | null;
          name: string;
          tier: 'golden' | 'silver';
          logo_url: string;
          website_url?: string | null;
          start_date: string;
          end_date: string;
          price_bd: number;
          payment_status?: string | null;
          status?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string | null;
          name?: string;
          tier?: 'golden' | 'silver';
          logo_url?: string;
          website_url?: string | null;
          start_date?: string;
          end_date?: string;
          price_bd?: number;
          payment_status?: string | null;
          status?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          preferences: Json | null;
          status: 'active' | 'unsubscribed';
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          preferences?: Json | null;
          status?: 'active' | 'unsubscribed';
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          preferences?: Json | null;
          status?: 'active' | 'unsubscribed';
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      page_views: {
        Row: {
          id: string;
          page_path: string;
          page_type: string | null;
          reference_id: string | null;
          user_agent: string | null;
          ip_hash: string | null;
          referrer: string | null;
          country: string | null;
          country_code: string | null;
          city: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_path: string;
          page_type?: string | null;
          reference_id?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          referrer?: string | null;
          country?: string | null;
          country_code?: string | null;
          city?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          page_path?: string;
          page_type?: string | null;
          reference_id?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          referrer?: string | null;
          country?: string | null;
          country_code?: string | null;
          city?: string | null;
          created_at?: string;
        };
      };
      ad_clicks: {
        Row: {
          id: string;
          ad_id: string | null;
          ip_hash: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ad_id?: string | null;
          ip_hash?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ad_id?: string | null;
          ip_hash?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      password_reset_tokens: {
        Row: {
          id: string;
          user_id: string | null;
          token: string;
          expires_at: string;
          used: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          token: string;
          expires_at: string;
          used?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          token?: string;
          expires_at?: string;
          used?: boolean;
          created_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          details: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
      sponsor_inquiries: {
        Row: {
          id: string;
          business_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          preferred_tier: 'golden' | 'silver';
          message: string | null;
          status: 'pending' | 'contacted' | 'converted' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          contact_name: string;
          email: string;
          phone?: string | null;
          preferred_tier?: 'golden' | 'silver';
          message?: string | null;
          status?: 'pending' | 'contacted' | 'converted' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          contact_name?: string;
          email?: string;
          phone?: string | null;
          preferred_tier?: 'golden' | 'silver';
          message?: string | null;
          status?: 'pending' | 'contacted' | 'converted' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
      public_users: {
        Row: {
          id: string;
          google_id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          last_login: string;
        };
        Insert: {
          id?: string;
          google_id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
        };
        Update: {
          id?: string;
          google_id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
        };
      };
      venue_likes: {
        Row: {
          id: string;
          user_id: string;
          venue_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          venue_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          venue_id?: string;
          created_at?: string;
        };
      };
      like_rate_limits: {
        Row: {
          id: string;
          user_id: string;
          action_count: number;
          window_start: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action_count?: number;
          window_start?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action_count?: number;
          window_start?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type Venue = Database['public']['Tables']['venues']['Row'];
export type VenueInsert = Database['public']['Tables']['venues']['Insert'];
export type VenueUpdate = Database['public']['Tables']['venues']['Update'];

export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type Offer = Database['public']['Tables']['offers']['Row'];
export type OfferInsert = Database['public']['Tables']['offers']['Insert'];
export type OfferUpdate = Database['public']['Tables']['offers']['Update'];

export type Movie = Database['public']['Tables']['movies']['Row'];
export type MovieInsert = Database['public']['Tables']['movies']['Insert'];
export type MovieUpdate = Database['public']['Tables']['movies']['Update'];

export type Showtime = Database['public']['Tables']['showtimes']['Row'];
export type ShowtimeInsert = Database['public']['Tables']['showtimes']['Insert'];

export type HomepageAd = Database['public']['Tables']['homepage_ads']['Row'];
export type HomepageAdInsert = Database['public']['Tables']['homepage_ads']['Insert'];
export type HomepageAdUpdate = Database['public']['Tables']['homepage_ads']['Update'];

export type Sponsor = Database['public']['Tables']['sponsors']['Row'];
export type SponsorInsert = Database['public']['Tables']['sponsors']['Insert'];

export type Subscriber = Database['public']['Tables']['subscribers']['Row'];
export type SubscriberInsert = Database['public']['Tables']['subscribers']['Insert'];

export type PageView = Database['public']['Tables']['page_views']['Row'];
export type PageViewInsert = Database['public']['Tables']['page_views']['Insert'];

export type ActivityLog = Database['public']['Tables']['activity_log']['Row'];
export type ActivityLogInsert = Database['public']['Tables']['activity_log']['Insert'];

export type SponsorInquiry = Database['public']['Tables']['sponsor_inquiries']['Row'];
export type SponsorInquiryInsert = Database['public']['Tables']['sponsor_inquiries']['Insert'];
export type SponsorInquiryUpdate = Database['public']['Tables']['sponsor_inquiries']['Update'];

export type PublicUser = Database['public']['Tables']['public_users']['Row'];
export type PublicUserInsert = Database['public']['Tables']['public_users']['Insert'];
export type PublicUserUpdate = Database['public']['Tables']['public_users']['Update'];

export type VenueLike = Database['public']['Tables']['venue_likes']['Row'];
export type VenueLikeInsert = Database['public']['Tables']['venue_likes']['Insert'];

export type LikeRateLimit = Database['public']['Tables']['like_rate_limits']['Row'];

// Extended types with relations
export type VenueWithEvents = Venue & {
  events: Event[];
};

export type EventWithVenue = Event & {
  venue: Venue | null;
};

export type MovieWithShowtimes = Movie & {
  showtimes: Showtime[];
};

export type OfferWithVenue = Offer & {
  venue: Venue | null;
};
