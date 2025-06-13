# Documents Photo App - Multi-Country & Multi-Language

A Next.js application that generates passport and ID photos for multiple countries with full internationalization support.

## Features

### 🌍 Multi-Country Support
- **19 Countries**: France, Germany, Netherlands, Belgium, Austria, Switzerland, Finland, Norway, Sweden, Denmark, Czech Republic, Slovakia, Poland, Hungary, Estonia, Latvia, Lithuania, Slovenia, Croatia
- Country-specific photo requirements (sizes, regulations)
- Automatic timezone-based country detection

### 🗣️ Multi-Language Support
- **Multiple languages per country** including native languages + English + Russian
- Dynamic language switching
- Fully localized content (UI, descriptions, FAQ, etc.)

### 📱 Dynamic Routing Structure
```
/ → Auto-detects country/language and redirects
/[country]/[lang] → Landing page (e.g., /fr/en, /de/de)
/[country]/[lang]/app → Photo processing app
```

### 🚀 Static Generation
- **All pages are pre-generated** at build time (128 static pages total)
- Landing pages are completely static for optimal performance
- Only the photo processing functionality uses client-side JavaScript

### 🎯 Auto-Detection
- **Country detection** based on browser timezone
- **Language detection** based on browser language preferences
- Fallback to France/English if detection fails

## Supported Countries & Languages

| Country | Code | Languages | Photo Size |
|---------|------|-----------|------------|
| France | `fr` | French, English, Russian | 35×45mm |
| Germany | `de` | German, English, Russian | 35×45mm |
| Netherlands | `nl` | Dutch, English, Russian | 35×45mm |
| Belgium | `be` | Dutch, French, German, English, Russian | 35×45mm |
| Austria | `at` | German, English, Russian | 35×45mm |
| Switzerland | `ch` | German, French, Italian, English, Russian | 35×45mm |
| Finland | `fi` | Finnish, Swedish, English, Russian | 36×47mm |
| Norway | `no` | Norwegian, English, Russian | 35×45mm |
| Sweden | `se` | Swedish, English, Russian | 35×45mm |
| Denmark | `dk` | Danish, English, Russian | 35×45mm |
| Czech Republic | `cz` | Czech, English, Russian | 35×45mm |
| Slovakia | `sk` | Slovak, English, Russian | 35×45mm |
| Poland | `pl` | Polish, English, Russian | 35×45mm |
| Hungary | `hu` | Hungarian, English, Russian | 35×45mm |
| Estonia | `ee` | Estonian, English, Russian | 35×45mm |
| Latvia | `lv` | Latvian, English, Russian | 35×45mm |
| Lithuania | `lt` | Lithuanian, English, Russian | 35×45mm |
| Slovenia | `si` | Slovenian, English, Russian | 35×45mm |
| Croatia | `hr` | Croatian, English, Russian | 35×45mm |

## Technical Implementation

### Architecture
- **Next.js 15** with App Router
- **Static Site Generation (SSG)** with `generateStaticParams`
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **TensorFlow.js** for face detection and photo processing

### Key Files
- `src/config/countries.ts` - Country definitions and validation
- `src/config/translations.ts` - All translations for supported languages
- `src/app/[country]/[lang]/page.tsx` - Dynamic landing pages
- `src/app/[country]/[lang]/app/page.tsx` - Photo processing app
- `src/components/DocPhotoLanding.tsx` - Reusable landing page component

### Build Output
- **128 static pages** generated at build time
- Landing pages: 62 pages (19 countries × various language combinations)
- App pages: 62 pages (same combinations)
- Root and error pages: 4 additional pages

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The app is configured for static export and can be deployed to any static hosting service:

```bash
npm run build
# Outputs to ./out directory
```

## Adding New Countries/Languages

1. **Add country to `src/config/countries.ts`**:
```typescript
newCountry: {
  code: 'xx',
  name: 'Country Name',
  languages: ['native', 'en', 'ru'],
  photoSize: '35×45mm',
  currency: 'EUR'
}
```

2. **Add translations to `src/config/translations.ts`**:
```typescript
nativeLanguage: {
  title: "Translated Title",
  // ... other translations
}
```

3. **Rebuild** - New pages will be automatically generated

## Privacy & Security

- **No server uploads** - All photo processing happens in the browser
- **Client-side only** - Photos never leave the user's device
- **GDPR compliant** - No personal data collection
- **Open source** - Fully transparent implementation
