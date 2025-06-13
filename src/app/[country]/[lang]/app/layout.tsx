import { COUNTRIES } from '@/config/countries';

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

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
