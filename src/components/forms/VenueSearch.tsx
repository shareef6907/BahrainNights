'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces?: () => void;
  }
}

interface VenueDetails {
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

interface VenueSearchProps {
  onSelect: (venue: VenueDetails) => void;
  defaultValue?: string;
  className?: string;
}

export default function VenueSearch({ onSelect, defaultValue, className }: VenueSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<VenueDetails | null>(null);
  const [inputValue, setInputValue] = useState(defaultValue || '');

  // Load Google Maps script
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.warn('Google Maps API key not configured');
      setIsLoading(false);
      return;
    }

    // Check if already loaded
    if (window.google?.maps?.places) {
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('#google-maps-script')) {
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.google?.maps?.places) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(checkLoaded);
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        setIsLoading(false);
      }, 10000);

      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;

    window.initGooglePlaces = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      delete window.initGooglePlaces;
    };
  }, []);

  // Initialize autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['establishment'],
        componentRestrictions: { country: 'bh' }, // Restrict to Bahrain
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place.geometry?.location) {
          const venue: VenueDetails = {
            name: place.name || '',
            address: place.formatted_address || '',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            placeId: place.place_id || '',
          };

          setSelectedVenue(venue);
          setInputValue(place.name || '');
          onSelect(venue);
        }
      });

      autocompleteRef.current = autocomplete;
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
  }, [isLoaded, onSelect]);

  const handleClear = useCallback(() => {
    setSelectedVenue(null);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    onSelect({
      name: '',
      address: '',
      lat: 0,
      lng: 0,
      placeId: '',
    });
  }, [onSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // If user manually types, clear the selected venue
    if (selectedVenue && e.target.value !== selectedVenue.name) {
      setSelectedVenue(null);
    }
  };

  // Fallback for when Google Maps is not available
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className={className}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onSelect({
                name: e.target.value,
                address: '',
                lat: 0,
                lng: 0,
                placeId: '',
              });
            }}
            placeholder="Enter venue name"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <p className="text-gray-500 text-xs mt-1">
          Google Maps not configured. Enter venue name manually.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={isLoading ? 'Loading venue search...' : 'Search for venue in Bahrain...'}
          disabled={isLoading}
          className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
        )}
        {!isLoading && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {selectedVenue?.address ? (
        <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{selectedVenue.name}</span>
          </p>
          <p className="text-green-300/80 text-xs mt-1 ml-6">
            {selectedVenue.address}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-xs mt-1">
          {isLoading
            ? 'Loading Google Places...'
            : 'Start typing to search verified venues in Bahrain'}
        </p>
      )}
    </div>
  );
}
