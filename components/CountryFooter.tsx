'use client';

import { COUNTRIES } from '@/config/countries';
import { Translation } from '@/config/translations';
import { Github } from 'lucide-react';
import Link from 'next/link';

interface CountryFooterProps {
  translation: Translation;
  currentCountry: string;
  currentLang: string;
}

export default function CountryFooter({ translation, currentCountry, currentLang }: CountryFooterProps) {
  const countries = Object.values(COUNTRIES);
  
  // Group countries by region for better organization
  const europeanCountries = countries.filter(country => 
    ['fr', 'de', 'nl', 'be', 'at', 'ch', 'it', 'es'].includes(country.code)
  );
  
  const nordicCountries = countries.filter(country => 
    ['fi', 'no', 'se', 'dk'].includes(country.code)
  );
  
  const easternEuropeanCountries = countries.filter(country => 
    ['cz', 'sk', 'pl', 'hu', 'ee', 'lv', 'lt', 'si', 'hr'].includes(country.code)
  );

  const renderCountryLinks = (countryList: typeof countries, title: string) => (
    <div className="mb-8">
      <h3 className="font-semibold text-text-primary mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {countryList.map((country) => {
          // Use the first available language for each country, preferring current language if available
          const targetLang = country.languages.includes(currentLang) 
            ? currentLang 
            : country.languages.includes('en') 
              ? 'en' 
              : country.languages[0];
          
          const isCurrentCountry = country.code === currentCountry;
          
          return (
            <Link
              key={country.code}
              href={`/${country.code}/${targetLang}`}
              className={`text-sm hover:text-primary transition-colors ${
                isCurrentCountry 
                  ? 'text-primary font-medium' 
                  : 'text-text-secondary'
              }`}
            >
              {country.name}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="border-t bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            {translation.title} - {translation.footer.allCountries || 'All Countries'}
          </h2>
          <p className="text-text-secondary mb-8">
            {translation.footer.countryDescription || 'Generate passport and ID photos that meet the official requirements for each country.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {renderCountryLinks(europeanCountries, 'Western Europe')}
          {renderCountryLinks(nordicCountries, 'Nordic Countries')}
          {renderCountryLinks(easternEuropeanCountries, 'Eastern Europe')}
        </div>

        {/* Original footer content */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-primary">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.9614 0C36.8487 3.28984e-08 40 3.12448 40 6.97872V33.0213C40 36.8755 36.8487 40 32.9614 40H7.03863C3.1513 40 1.38271e-09 36.8755 0 33.0213V6.97872C3.2632e-07 3.12448 3.1513 3.28984e-08 7.03863 0H32.9614ZM20 6.12766C12.1779 6.12766 5.83691 12.4147 5.83691 20.1702C5.83691 27.9257 12.1779 34.2128 20 34.2128C27.8221 34.2128 34.1631 27.9257 34.1631 20.1702C34.1631 12.4147 27.8221 6.12766 20 6.12766ZM32.9614 4.42553C32.4873 4.42553 32.103 4.80657 32.103 5.2766V7.14894C32.103 7.61897 32.4873 8 32.9614 8H36.0515C36.5256 8 36.9099 7.61897 36.9099 7.14894V5.2766C36.9099 4.80657 36.5256 4.42553 36.0515 4.42553H32.9614Z" fill="currentColor"/>
                  <path d="M20 8C26.6843 8 32.103 13.3726 32.103 20C32.103 26.6274 26.6843 32 20 32C13.3157 32 7.897 26.6274 7.897 20C7.897 13.3726 13.3157 8 20 8ZM16.1373 12.8369C15.7247 12.8369 15.3307 13.008 15.0417 13.3095C14.7531 13.6107 14.5923 14.0175 14.5923 14.4398V25.9008C14.5923 26.3231 14.753 26.7299 15.0417 27.0311C15.3307 27.3325 15.7247 27.5037 16.1373 27.5037H24.3777C24.7903 27.5037 25.1843 27.3325 25.4733 27.0311C25.762 26.7299 25.9227 26.3231 25.9227 25.9008V16.5888C25.9227 16.5506 25.9098 16.5135 25.8862 16.4837L25.8755 16.4714L22.442 12.89C22.4096 12.8562 22.3646 12.8369 22.3176 12.8369H16.1373Z" fill="currentColor"/>
                  <rect x="16.6524" y="17.5319" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
                  <rect x="16.6524" y="20.5957" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
                  <rect x="16.6524" y="23.6596" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
                </svg>
                <span className="text-xl font-bold text-text-primary">DocPhoto.eu</span>
              </Link>
              <a href="https://meekot.com/" className="text-text-secondary hover:text-primary transition-colors">
                {translation.footer.about}
              </a>
              <a href="https://meekot.com/" className="text-text-secondary hover:text-primary transition-colors">
                {translation.footer.contact}
              </a>
              <a 
                href="https://github.com/meekot/documents-photo-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors flex items-center space-x-1"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
            <div className="text-text-secondary text-sm">{translation.footer.copyright}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
