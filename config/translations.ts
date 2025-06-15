export interface Translation {
  title: string;
  subtitle: string;
  photoSize: string;
  free: string;
  freeDescription: string;
  uploadPhoto: string;
  getPhoto: string;
  features: {
    noUploads: string;
    privacyFirst: string;
    instantResults: string;
    regulationReady: string;
  };
  howItWorks: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
  };
  preparationTips: {
    title: string;
    goodLighting: string;
    goodLightingDesc: string;
    neutralBackground: string;
    neutralBackgroundDesc: string;
    faceCamera: string;
    faceCameraDesc: string;
  };
  demo: string;
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  cta: string;
  footer: {
    about: string;
    terms: string;
    privacy: string;
    contact: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<string, Translation> = {
  en: {
    title: "Passport/ID Photo Generator",
    subtitle: "Passport/ID\nPhoto Generator",
    photoSize: "Photo size",
    free: "Free",
    freeDescription: "and open-source",
    uploadPhoto: "Upload photo",
    getPhoto: "Get a photo",
    features: {
      noUploads: "No uploads",
      privacyFirst: "Privacy first",
      instantResults: "Instant results",
      regulationReady: "Regulation-ready"
    },
    howItWorks: {
      title: "How it works",
      step1: "1. Upload your selfie photo",
      step2: "2. We process it offline",
      step3: "3. Download"
    },
    preparationTips: {
      title: "Preparation tips",
      goodLighting: "Good lighting",
      goodLightingDesc: "Ensure your face is well-lit and free from shadows.",
      neutralBackground: "Neutral background",
      neutralBackgroundDesc: "Stand in front of a plain, light-colored background.",
      faceCamera: "Face the camera",
      faceCameraDesc: "Look directly at the camera with a neutral expression."
    },
    demo: "Demo",
    faq: {
      title: "FAQ",
      q1: "Is this service really free?",
      a1: "Yes, our passport photo generator is completely free to use. We believe in providing a valuable service without any hidden costs.",
      q2: "How does it work without uploads?",
      a2: "Our service processes your photos entirely in your browser using advanced client-side technology. Your photos never leave your device.",
      q3: "What are the photo requirements?",
      a3: "Photos should be taken against a neutral background with good lighting. Face the camera directly with a neutral expression.",
      q4: "Can I use this for other types of photos?",
      a4: "This tool is specifically designed for passport and ID photos. For other document types, please check the specific requirements.",
      q5: "What if I have more questions?",
      a5: "Feel free to contact our support team through the contact page. We're here to help with any questions about the photo requirements or process."
    },
    cta: "Create your free passport/id photo now",
    footer: {
      about: "About",
      terms: "Terms",
      privacy: "Privacy",
      contact: "Contact",
      copyright: "© 2025 Meekot. Made in France."
    }
  },
  fr: {
    title: "Générateur de Photo de Passeport/CNI",
    subtitle: "Générateur de Photo\nde Passeport/CNI",
    photoSize: "Taille de photo",
    free: "Gratuit",
    freeDescription: "et open-source",
    uploadPhoto: "Télécharger une photo",
    getPhoto: "Obtenir une photo",
    features: {
      noUploads: "Aucun téléchargement",
      privacyFirst: "Confidentialité d'abord",
      instantResults: "Résultats instantanés",
      regulationReady: "Conforme aux réglementations"
    },
    howItWorks: {
      title: "Comment ça marche",
      step1: "1. Téléchargez votre selfie",
      step2: "2. Nous le traitons hors ligne",
      step3: "3. Téléchargez"
    },
    preparationTips: {
      title: "Conseils de préparation",
      goodLighting: "Bon éclairage",
      goodLightingDesc: "Assurez-vous que votre visage est bien éclairé et sans ombres.",
      neutralBackground: "Arrière-plan neutre",
      neutralBackgroundDesc: "Placez-vous devant un arrière-plan uni et de couleur claire.",
      faceCamera: "Face à la caméra",
      faceCameraDesc: "Regardez directement la caméra avec une expression neutre."
    },
    demo: "Démo",
    faq: {
      title: "FAQ",
      q1: "Ce service est-il vraiment gratuit ?",
      a1: "Oui, notre générateur de photos de passeport est entièrement gratuit. Nous croyons en la fourniture d'un service précieux sans coûts cachés.",
      q2: "Comment cela fonctionne-t-il sans téléchargements ?",
      a2: "Notre service traite vos photos entièrement dans votre navigateur en utilisant une technologie avancée côté client. Vos photos ne quittent jamais votre appareil.",
      q3: "Quelles sont les exigences pour les photos ?",
      a3: "Les photos doivent être prises contre un arrière-plan neutre avec un bon éclairage. Regardez directement la caméra avec une expression neutre.",
      q4: "Puis-je utiliser ceci pour d'autres types de photos ?",
      a4: "Cet outil est spécifiquement conçu pour les photos de passeport et de CNI. Pour d'autres types de documents, veuillez vérifier les exigences spécifiques.",
      q5: "Et si j'ai d'autres questions ?",
      a5: "N'hésitez pas à contacter notre équipe de support via la page de contact. Nous sommes là pour vous aider avec toutes questions sur les exigences ou le processus."
    },
    cta: "Créez votre photo de passeport/CNI gratuite maintenant",
    footer: {
      about: "À propos",
      terms: "Conditions",
      privacy: "Confidentialité",
      contact: "Contact",
      copyright: "© 2025 Meekot. Fabriqué en France."
    }
  },
  de: {
    title: "Reisepass/Ausweis Foto Generator",
    subtitle: "Reisepass/Ausweis\nFoto Generator",
    photoSize: "Fotogröße",
    free: "Kostenlos",
    freeDescription: "und Open-Source",
    uploadPhoto: "Foto hochladen",
    getPhoto: "Foto erhalten",
    features: {
      noUploads: "Keine Uploads",
      privacyFirst: "Datenschutz zuerst",
      instantResults: "Sofortige Ergebnisse",
      regulationReady: "Vorschriftskonform"
    },
    howItWorks: {
      title: "So funktioniert es",
      step1: "1. Laden Sie Ihr Selfie hoch",
      step2: "2. Wir verarbeiten es offline",
      step3: "3. Herunterladen"
    },
    preparationTips: {
      title: "Vorbereitungstipps",
      goodLighting: "Gute Beleuchtung",
      goodLightingDesc: "Stellen Sie sicher, dass Ihr Gesicht gut beleuchtet und frei von Schatten ist.",
      neutralBackground: "Neutraler Hintergrund",
      neutralBackgroundDesc: "Stehen Sie vor einem einfachen, hellen Hintergrund.",
      faceCamera: "Zur Kamera schauen",
      faceCameraDesc: "Schauen Sie direkt in die Kamera mit einem neutralen Ausdruck."
    },
    demo: "Demo",
    faq: {
      title: "FAQ",
      q1: "Ist dieser Service wirklich kostenlos?",
      a1: "Ja, unser Passfoto-Generator ist völlig kostenlos zu verwenden. Wir glauben daran, einen wertvollen Service ohne versteckte Kosten anzubieten.",
      q2: "Wie funktioniert es ohne Uploads?",
      a2: "Unser Service verarbeitet Ihre Fotos vollständig in Ihrem Browser mit fortschrittlicher Client-seitiger Technologie. Ihre Fotos verlassen niemals Ihr Gerät.",
      q3: "Was sind die Fotoanforderungen?",
      a3: "Fotos sollten vor einem neutralen Hintergrund mit guter Beleuchtung aufgenommen werden. Schauen Sie direkt in die Kamera mit einem neutralen Ausdruck.",
      q4: "Kann ich dies für andere Arten von Fotos verwenden?",
      a4: "Dieses Tool ist speziell für Reisepass- und Ausweisfotos entwickelt. Für andere Dokumenttypen überprüfen Sie bitte die spezifischen Anforderungen.",
      q5: "Was ist, wenn ich weitere Fragen habe?",
      a5: "Kontaktieren Sie gerne unser Support-Team über die Kontaktseite. Wir helfen Ihnen bei allen Fragen zu den Fotoanforderungen oder dem Prozess."
    },
    cta: "Erstellen Sie jetzt Ihr kostenloses Reisepass-/Ausweisfoto",
    footer: {
      about: "Über uns",
      terms: "Bedingungen",
      privacy: "Datenschutz",
      contact: "Kontakt",
      copyright: "© 2025 Meekot. Hergestellt in Frankreich."
    }
  },
  ru: {
    title: "Генератор Фото для Паспорта/Удостоверения",
    subtitle: "Генератор Фото\nдля Паспорта/Удостоверения",
    photoSize: "Размер фото",
    free: "Бесплатно",
    freeDescription: "и с открытым кодом",
    uploadPhoto: "Загрузить фото",
    getPhoto: "Получить фото",
    features: {
      noUploads: "Без загрузок",
      privacyFirst: "Конфиденциальность прежде всего",
      instantResults: "Мгновенные результаты",
      regulationReady: "Соответствует требованиям"
    },
    howItWorks: {
      title: "Как это работает",
      step1: "1. Загрузите ваше селфи",
      step2: "2. Мы обрабатываем его офлайн",
      step3: "3. Скачайте"
    },
    preparationTips: {
      title: "Советы по подготовке",
      goodLighting: "Хорошее освещение",
      goodLightingDesc: "Убедитесь, что ваше лицо хорошо освещено и без теней.",
      neutralBackground: "Нейтральный фон",
      neutralBackgroundDesc: "Встаньте перед простым, светлым фоном.",
      faceCamera: "Смотрите в камеру",
      faceCameraDesc: "Смотрите прямо в камеру с нейтральным выражением лица."
    },
    demo: "Демо",
    faq: {
      title: "FAQ",
      q1: "Действительно ли этот сервис бесплатный?",
      a1: "Да, наш генератор фото для паспорта полностью бесплатен в использовании. Мы верим в предоставление ценного сервиса без скрытых затрат.",
      q2: "Как это работает без загрузок?",
      a2: "Наш сервис обрабатывает ваши фотографии полностью в вашем браузере, используя передовые клиентские технологии. Ваши фото никогда не покидают ваше устройство.",
      q3: "Каковы требования к фотографии?",
      a3: "Фотографии должны быть сделаны на нейтральном фоне с хорошим освещением. Смотрите прямо в камеру с нейтральным выражением лица.",
      q4: "Могу ли я использовать это для других типов фотографий?",
      a4: "Этот инструмент специально разработан для фотографий паспорта и удостоверения личности. Для других типов документов, пожалуйста, проверьте специфические требования.",
      q5: "Что если у меня есть еще вопросы?",
      a5: "Не стесняйтесь обращаться к нашей команде поддержки через страницу контактов. Мы здесь, чтобы помочь с любыми вопросами о требованиях к фото или процессе."
    },
    cta: "Создайте ваше бесплатное фото для паспорта/удостоверения сейчас",
    footer: {
      about: "О нас",
      terms: "Условия",
      privacy: "Конфиденциальность",
      contact: "Контакты",
      copyright: "© 2025 Meekot. Сделано во Франции."
    }
  },
  nl: {
    title: "Paspoort/ID Foto Generator",
    subtitle: "Paspoort/ID\nFoto Generator",
    photoSize: "Foto grootte",
    free: "Gratis",
    freeDescription: "en open-source",
    uploadPhoto: "Foto uploaden",
    getPhoto: "Foto krijgen",
    features: {
      noUploads: "Geen uploads",
      privacyFirst: "Privacy eerst",
      instantResults: "Directe resultaten",
      regulationReady: "Regelgeving-klaar"
    },
    howItWorks: {
      title: "Hoe het werkt",
      step1: "1. Upload je selfie foto",
      step2: "2. Wij verwerken het offline",
      step3: "3. Download"
    },
    preparationTips: {
      title: "Voorbereidingstips",
      goodLighting: "Goede verlichting",
      goodLightingDesc: "Zorg ervoor dat je gezicht goed verlicht is en vrij van schaduwen.",
      neutralBackground: "Neutrale achtergrond",
      neutralBackgroundDesc: "Sta voor een eenvoudige, lichtgekleurde achtergrond.",
      faceCamera: "Kijk naar de camera",
      faceCameraDesc: "Kijk direct naar de camera met een neutrale uitdrukking."
    },
    demo: "Demo",
    faq: {
      title: "FAQ",
      q1: "Is deze service echt gratis?",
      a1: "Ja, onze paspoortfoto generator is volledig gratis te gebruiken. Wij geloven in het bieden van een waardevolle service zonder verborgen kosten.",
      q2: "Hoe werkt het zonder uploads?",
      a2: "Onze service verwerkt je foto's volledig in je browser met geavanceerde client-side technologie. Je foto's verlaten nooit je apparaat.",
      q3: "Wat zijn de foto vereisten?",
      a3: "Foto's moeten genomen worden tegen een neutrale achtergrond met goede verlichting. Kijk direct naar de camera met een neutrale uitdrukking.",
      q4: "Kan ik dit gebruiken voor andere soorten foto's?",
      a4: "Deze tool is specifiek ontworpen voor paspoort- en ID-foto's. Voor andere documenttypes, controleer de specifieke vereisten.",
      q5: "Wat als ik meer vragen heb?",
      a5: "Neem gerust contact op met ons supportteam via de contactpagina. We helpen je graag met vragen over de foto-eisen of het proces."
    },
    cta: "Maak nu je gratis paspoort/ID foto",
    footer: {
      about: "Over ons",
      terms: "Voorwaarden",
      privacy: "Privacy",
      contact: "Contact",
      copyright: "© 2025 Meekot. Gemaakt in Frankrijk."
    }
  },
  da: {
    title: "Pas/ID Foto Generator",
    subtitle: "Pas/ID\nFoto Generator",
    photoSize: "Foto størrelse",
    free: "Gratis",
    freeDescription: "og open-source",
    uploadPhoto: "Upload foto",
    getPhoto: "Få et foto",
    features: {
      noUploads: "Ingen uploads",
      privacyFirst: "Privatliv først",
      instantResults: "Øjeblikkelige resultater",
      regulationReady: "Regulering-klar"
    },
    howItWorks: {
      title: "Sådan virker det",
      step1: "1. Upload dit selfie foto",
      step2: "2. Vi behandler det offline",
      step3: "3. Download"
    },
    preparationTips: {
      title: "Forberedelsestips",
      goodLighting: "God belysning",
      goodLightingDesc: "Sørg for at dit ansigt er godt belyst og fri for skygger.",
      neutralBackground: "Neutral baggrund",
      neutralBackgroundDesc: "Stå foran en simpel, lys baggrund.",
      faceCamera: "Se på kameraet",
      faceCameraDesc: "Se direkte på kameraet med et neutralt udtryk."
    },
    demo: "Demo",
    faq: {
      title: "FAQ",
      q1: "Er denne service virkelig gratis?",
      a1: "Ja, vores pasfoto generator er helt gratis at bruge. Vi tror på at levere en værdifuld service uden skjulte omkostninger.",
      q2: "Hvordan virker det uden uploads?",
      a2: "Vores service behandler dine fotos helt i din browser ved hjælp af avanceret klient-side teknologi. Dine fotos forlader aldrig din enhed.",
      q3: "Hvad er foto kravene?",
      a3: "Fotos skal tages mod en neutral baggrund med god belysning. Se direkte på kameraet med et neutralt udtryk.",
      q4: "Kan jeg bruge dette til andre typer fotos?",
      a4: "Dette værktøj er specifikt designet til pas- og ID-fotos. For andre dokumenttyper, tjek de specifikke krav.",
      q5: "Hvad hvis jeg har flere spørgsmål?",
      a5: "Kontakt gerne vores supportteam gennem kontaktsiden. Vi er her for at hjælpe med spørgsmål om foto krav eller processen."
    },
    cta: "Opret dit gratis pas/ID foto nu",
    footer: {
      about: "Om os",
      terms: "Vilkår",
      privacy: "Privatliv",
      contact: "Kontakt",
      copyright: "© 2025 Meekot. Lavet i Frankrig."
    }
  },
  sv: {
    title: "Pass/ID Foto Generator",
    subtitle: "Pass/ID\nFoto Generator",
    photoSize: "Foto storlek",
    free: "Gratis",
    freeDescription: "och öppen källkod",
    uploadPhoto: "Ladda upp foto",
    getPhoto: "Få ett foto",
    features: {
      noUploads: "Inga uppladdningar",
      privacyFirst: "Integritet först",
      instantResults: "Omedelbara resultat",
      regulationReady: "Regelverks-redo"
    },
    howItWorks: {
      title: "Så här fungerar det",
      step1: "1. Ladda upp ditt selfie-foto",
      step2: "2. Vi bearbetar det offline",
      step3: "3. Ladda ner"
    },
    preparationTips: {
      title: "Förberedelsetips",
      goodLighting: "Bra belysning",
      goodLightingDesc: "Se till att ditt ansikte är välbelyst och fritt från skuggor.",
      neutralBackground: "Neutral bakgrund",
      neutralBackgroundDesc: "Stå framför en enkel, ljus bakgrund.",
      faceCamera: "Titta på kameran",
      faceCameraDesc: "Titta direkt på kameran med ett neutralt uttryck."
    },
    demo: "Demo",
    faq: {
      title: "FAQ",
      q1: "Är denna tjänst verkligen gratis?",
      a1: "Ja, vår passfoto-generator är helt gratis att använda. Vi tror på att tillhandahålla en värdefull tjänst utan dolda kostnader.",
      q2: "Hur fungerar det utan uppladdningar?",
      a2: "Vår tjänst bearbetar dina foton helt i din webbläsare med avancerad klient-side teknologi. Dina foton lämnar aldrig din enhet.",
      q3: "Vilka är fotokraven?",
      a3: "Foton ska tas mot en neutral bakgrund med bra belysning. Titta direkt på kameran med ett neutralt uttryck.",
      q4: "Kan jag använda detta för andra typer av foton?",
      a4: "Detta verktyg är specifikt designat för pass- och ID-foton. För andra dokumenttyper, kontrollera de specifika kraven.",
      q5: "Vad händer om jag har fler frågor?",
      a5: "Kontakta gärna vårt supportteam via kontaktsidan. Vi är här för att hjälpa med frågor om fotokrav eller processen."
    },
    cta: "Skapa ditt gratis pass/ID-foto nu",
    footer: {
      about: "Om oss",
      terms: "Villkor",
      privacy: "Integritet",
      contact: "Kontakt",
      copyright: "© 2025 Meekot. Tillverkad i Frankrike."
    }
  }
};

// Add more languages as needed
export const getTranslation = (languageCode: string): Translation => {
  return TRANSLATIONS[languageCode] || TRANSLATIONS.en;
};
