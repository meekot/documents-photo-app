export interface Country {
  code: string;
  name: string;
  languages: string[];
  photoSize: string;
  currency: string;
}

export const COUNTRIES: Record<string, Country> = {
  fr: {
    code: 'fr',
    name: 'France',
    languages: ['fr', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  de: {
    code: 'de',
    name: 'Germany',
    languages: ['de', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  nl: {
    code: 'nl',
    name: 'Netherlands',
    languages: ['nl', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  be: {
    code: 'be',
    name: 'Belgium',
    languages: ['nl', 'fr', 'de', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  at: {
    code: 'at',
    name: 'Austria',
    languages: ['de', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  ch: {
    code: 'ch',
    name: 'Switzerland',
    languages: ['de', 'fr', 'it', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'CHF'
  },
  fi: {
    code: 'fi',
    name: 'Finland',
    languages: ['fi', 'sv', 'en', 'ru'],
    photoSize: '36×47mm',
    currency: 'EUR'
  },
  no: {
    code: 'no',
    name: 'Norway',
    languages: ['no', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'NOK'
  },
  se: {
    code: 'se',
    name: 'Sweden',
    languages: ['sv', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'SEK'
  },
  dk: {
    code: 'dk',
    name: 'Denmark',
    languages: ['da', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'DKK'
  },
  cz: {
    code: 'cz',
    name: 'Czech Republic',
    languages: ['cs', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'CZK'
  },
  sk: {
    code: 'sk',
    name: 'Slovakia',
    languages: ['sk', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  pl: {
    code: 'pl',
    name: 'Poland',
    languages: ['pl', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'PLN'
  },
  hu: {
    code: 'hu',
    name: 'Hungary',
    languages: ['hu', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'HUF'
  },
  ee: {
    code: 'ee',
    name: 'Estonia',
    languages: ['et', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  lv: {
    code: 'lv',
    name: 'Latvia',
    languages: ['lv', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  lt: {
    code: 'lt',
    name: 'Lithuania',
    languages: ['lt', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  si: {
    code: 'si',
    name: 'Slovenia',
    languages: ['sl', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  },
  hr: {
    code: 'hr',
    name: 'Croatia',
    languages: ['hr', 'en', 'ru'],
    photoSize: '35×45mm',
    currency: 'EUR'
  }
};

export const getAllCountryCodes = (): string[] => {
  return Object.keys(COUNTRIES);
};

export const getAllLanguageCodes = (): string[] => {
  const languages = new Set<string>();
  Object.values(COUNTRIES).forEach(country => {
    country.languages.forEach(lang => languages.add(lang));
  });
  return Array.from(languages);
};

export const getCountryLanguages = (countryCode: string): string[] => {
  return COUNTRIES[countryCode]?.languages || [];
};

export const isValidCountryLanguagePair = (countryCode: string, languageCode: string): boolean => {
  const country = COUNTRIES[countryCode];
  return country ? country.languages.includes(languageCode) : false;
};
