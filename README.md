# 📸 DocPhoto.eu - AI-Powered Document Photo Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-orange?style=flat-square&logo=tensorflow)](https://www.tensorflow.org/js)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Create perfect passport and ID photos instantly with AI-powered face detection and automatic cropping. Privacy-first, browser-based processing for 19 European countries.**

![DocPhoto.eu Demo](public/images/header.png)

## ✨ Features

- 🤖 **AI-Powered Processing** - Advanced face detection using TensorFlow.js and MediaPipe FaceMesh
- 🔒 **Privacy First** - All processing happens in your browser, no uploads to servers
- ⚡ **Instant Results** - Generate compliant photos in seconds
- 🌍 **Multi-Country Support** - Supports 19 European countries with specific photo requirements
- 🗣️ **Multi-Language** - Available in 17 languages
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎯 **Regulation Compliant** - Automatically crops to official document photo standards
- 💰 **Completely Free** - No hidden costs or subscriptions

## 🌍 Supported Countries

| Country | Photo Size | Languages |
|---------|------------|-----------|
| 🇫🇷 France | 35×45mm | French, English, Russian |
| 🇩🇪 Germany | 35×45mm | German, English, Russian |
| 🇳🇱 Netherlands | 35×45mm | Dutch, English, Russian |
| 🇧🇪 Belgium | 35×45mm | Dutch, French, German, English, Russian |
| 🇦🇹 Austria | 35×45mm | German, English, Russian |
| 🇨🇭 Switzerland | 35×45mm | German, French, Italian, English, Russian |
| 🇫🇮 Finland | 36×47mm | Finnish, Swedish, English, Russian |
| 🇳🇴 Norway | 35×45mm | Norwegian, English, Russian |
| 🇸🇪 Sweden | 35×45mm | Swedish, English, Russian |
| 🇩🇰 Denmark | 35×45mm | Danish, English, Russian |
| 🇨🇿 Czech Republic | 35×45mm | Czech, English, Russian |
| 🇸🇰 Slovakia | 35×45mm | Slovak, English, Russian |
| 🇵🇱 Poland | 35×45mm | Polish, English, Russian |
| 🇭🇺 Hungary | 35×45mm | Hungarian, English, Russian |
| 🇪🇪 Estonia | 35×45mm | Estonian, English, Russian |
| 🇱🇻 Latvia | 35×45mm | Latvian, English, Russian |
| 🇱🇹 Lithuania | 35×45mm | Lithuanian, English, Russian |
| 🇸🇮 Slovenia | 35×45mm | Slovenian, English, Russian |
| 🇭🇷 Croatia | 35×45mm | Croatian, English, Russian |

## 🚀 How It Works

1. **📤 Upload Your Photo** - Select any photo from your device
2. **🔍 AI Analysis** - Advanced face detection identifies facial landmarks
3. **✂️ Smart Cropping** - Automatic alignment and cropping to official standards
4. **📥 Download Result** - Get your compliant document photo instantly

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 15.3.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **AI/ML**: [TensorFlow.js 4.22.0](https://www.tensorflow.org/js) with MediaPipe FaceMesh
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom styling
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Next.js](https://nextjs.org/) with TypeScript

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/meekot/documents-photo-app.git
   cd documents-photo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
documents-photo-app/
├── app/                          # Next.js App Router
│   ├── [country]/               # Dynamic country routes
│   │   └── [lang]/              # Dynamic language routes
│   │       └── page.tsx         # Country-specific pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page with auto-detection
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── CountryFooter.tsx        # Country navigation footer
│   ├── DocPhotoLanding.tsx      # Main landing page component
│   ├── PhotoUploadDialog.tsx    # Photo upload modal
│   └── PrintFormatDialog.tsx    # Print format selection
├── config/                      # Configuration files
│   ├── countries.ts             # Country definitions and settings
│   └── translations.ts          # Multi-language translations
├── lib/                         # Utility libraries
│   ├── printFormats.ts          # Print format configurations
│   ├── resizeImage.ts           # Image resizing utilities
│   ├── useFaceMesh.ts           # Face detection hook
│   ├── useFaceMeshModel.ts      # TensorFlow model management
│   ├── usePassportPhotoProcessor.ts # Main photo processing logic
│   └── utils.ts                 # General utilities
├── public/                      # Static assets
│   ├── favicon/                 # Favicon files
│   └── images/                  # Application images
└── ...config files
```

## 🔧 Key Components

### Face Detection & Processing

The application uses TensorFlow.js with MediaPipe FaceMesh for accurate face detection:

- **Face Landmark Detection**: Identifies 468 facial landmarks
- **Eye Alignment**: Automatically rotates photos to align eyes horizontally
- **Smart Cropping**: Calculates optimal crop area based on facial features
- **Regulation Compliance**: Ensures photos meet official document standards

### Multi-Country Support

Each country has specific requirements configured in `config/countries.ts`:

- Photo dimensions (35×45mm, 36×47mm)
- Supported languages
- Currency information
- Localized content

### Privacy-First Architecture

- **No Server Uploads**: All processing happens in the browser
- **Local Storage Only**: Images never leave your device
- **No Tracking**: No analytics or user tracking
- **Open Source**: Full transparency of the codebase

## 🎨 Customization

### Adding New Countries

1. Add country configuration in `config/countries.ts`
2. Add translations in `config/translations.ts`
3. Update routing in the app directory

### Modifying Photo Processing

The main processing logic is in `lib/usePassportPhotoProcessor.ts`:

- Adjust `PASSPORT_DIMENSIONS` for different photo sizes
- Modify face detection parameters
- Customize cropping algorithms

### Styling

The application uses Tailwind CSS with a custom design system:

- Colors defined in `tailwind.config.ts`
- Custom components in `components/ui/`
- Responsive design patterns throughout

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/):

```bash
npm run build
```

Then deploy to Vercel or any other hosting platform that supports Next.js.

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- **Netlify**: Use the Next.js build command
- **AWS Amplify**: Configure for Next.js applications
- **Docker**: Create a container with Node.js runtime

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and lazy loading
- **Image Processing**: Efficient client-side processing with Web Workers

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TensorFlow.js](https://www.tensorflow.org/js) team for the amazing ML framework
- [MediaPipe](https://mediapipe.dev/) for face detection models
- [Next.js](https://nextjs.org/) team for the excellent React framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/meekot/documents-photo-app/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Join discussions in GitHub Discussions

---

<div align="center">

**Made with ❤️ for the European community**

[🌐 Visit Doc-Photo.eu](https://doc-photo.eu) • [📱 Try it now](https://doc-photo.eu) • [⭐ Star on GitHub](https://github.com/meekot/documents-photo-app)

</div>
