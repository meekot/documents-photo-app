'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-detect country and language
    const detectCountryAndLanguage = () => {
      // Get browser language
      const browserLang = navigator.language.split('-')[0];
      
      // Get timezone to help detect country
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Simple country detection based on timezone
      const countryFromTimezone = getCountryFromTimezone(timezone);
      
      // Default fallbacks
      const detectedCountry = countryFromTimezone || 'fr';
      const detectedLanguage = ['fr', 'de', 'nl', 'da', 'sv', 'no', 'fi', 'cs', 'sk', 'pl', 'hu', 'et', 'lv', 'lt', 'sl', 'hr', 'it'].includes(browserLang) ? browserLang : 'en';
      
      // Redirect to detected country/language
      router.replace(`/${detectedCountry}/${detectedLanguage}`);
    };

    detectCountryAndLanguage();
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-[#44b871] rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-[#61758a]">Detecting your location...</p>
      </div>
    </div>
  );
}

function getCountryFromTimezone(timezone: string): string | null {
  const timezoneToCountry: Record<string, string> = {
    'Europe/Paris': 'fr',
    'Europe/Berlin': 'de',
    'Europe/Amsterdam': 'nl',
    'Europe/Brussels': 'be',
    'Europe/Vienna': 'at',
    'Europe/Zurich': 'ch',
    'Europe/Helsinki': 'fi',
    'Europe/Oslo': 'no',
    'Europe/Stockholm': 'se',
    'Europe/Copenhagen': 'dk',
    'Europe/Prague': 'cz',
    'Europe/Bratislava': 'sk',
    'Europe/Warsaw': 'pl',
    'Europe/Budapest': 'hu',
    'Europe/Tallinn': 'ee',
    'Europe/Riga': 'lv',
    'Europe/Vilnius': 'lt',
    'Europe/Ljubljana': 'si',
    'Europe/Zagreb': 'hr'
  };
  
  return timezoneToCountry[timezone] || null;
}
