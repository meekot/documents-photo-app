import { notFound } from 'next/navigation';
import { COUNTRIES, isValidCountryLanguagePair } from '@/config/countries';
import { getTranslation } from '@/config/translations';
import DocPhotoLanding from '@/components/DocPhotoLanding';

interface PageProps {
  params: Promise<{
    country: string;
    lang: string;
  }>;
}

export default async function CountryLanguagePage({ params }: PageProps) {
  const { country, lang } = await params;

  // Validate country and language combination
  if (!isValidCountryLanguagePair(country, lang)) {
    notFound();
  }

  const countryData = COUNTRIES[country];
  const translation = getTranslation(lang);

  return (
    <DocPhotoLanding 
      country={countryData}
      translation={translation}
      currentLang={lang}
    />
  );
}

// Generate static params for all valid country/language combinations
export async function generateStaticParams() {
  const params: { country: string; lang: string }[] = [];
  
  Object.entries(COUNTRIES).forEach(([countryCode, countryData]) => {
    countryData.languages.forEach(lang => {
      params.push({
        country: countryCode,
        lang: lang
      });
    });
  });

  return params;
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps) {
  const { country, lang } = await params;
  
  if (!isValidCountryLanguagePair(country, lang)) {
    return {};
  }

  const countryData = COUNTRIES[country];
  const translation = getTranslation(lang);

  return {
    title: `${countryData.name} ${translation.title} - DocPhoto.io`,
    description: `Free ${countryData.name} passport and ID photo generator. ${countryData.photoSize} photos that meet official requirements.`,
    alternates: {
      languages: Object.fromEntries(
        countryData.languages.map(langCode => [
          langCode,
          `/${country}/${langCode}`
        ])
      )
    }
  };
}
