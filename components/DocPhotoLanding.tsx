"use client";
import CountryFooter from "@/components/CountryFooter";
import { PhotoUploadDialog } from "@/components/PhotoUploadDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Country } from "@/config/countries";
import { Translation } from "@/config/translations";
import { CheckCircle, ChevronsDown, ChevronsRight, Eye, Github, Shield, Zap } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";

interface DocPhotoLandingProps {
  country: Country;
  translation: Translation;
  currentLang: string;
}

export default function DocPhotoLanding({ country, translation, currentLang }: DocPhotoLandingProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-primary">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.9614 0C36.8487 3.28984e-08 40 3.12448 40 6.97872V33.0213C40 36.8755 36.8487 40 32.9614 40H7.03863C3.1513 40 1.38271e-09 36.8755 0 33.0213V6.97872C3.2632e-07 3.12448 3.1513 3.28984e-08 7.03863 0H32.9614ZM20 6.12766C12.1779 6.12766 5.83691 12.4147 5.83691 20.1702C5.83691 27.9257 12.1779 34.2128 20 34.2128C27.8221 34.2128 34.1631 27.9257 34.1631 20.1702C34.1631 12.4147 27.8221 6.12766 20 6.12766ZM32.9614 4.42553C32.4873 4.42553 32.103 4.80657 32.103 5.2766V7.14894C32.103 7.61897 32.4873 8 32.9614 8H36.0515C36.5256 8 36.9099 7.61897 36.9099 7.14894V5.2766C36.9099 4.80657 36.5256 4.42553 36.0515 4.42553H32.9614Z" fill="currentColor"/>
                <path d="M20 8C26.6843 8 32.103 13.3726 32.103 20C32.103 26.6274 26.6843 32 20 32C13.3157 32 7.897 26.6274 7.897 20C7.897 13.3726 13.3157 8 20 8ZM16.1373 12.8369C15.7247 12.8369 15.3307 13.008 15.0417 13.3095C14.7531 13.6107 14.5923 14.0175 14.5923 14.4398V25.9008C14.5923 26.3231 14.753 26.7299 15.0417 27.0311C15.3307 27.3325 15.7247 27.5037 16.1373 27.5037H24.3777C24.7903 27.5037 25.1843 27.3325 25.4733 27.0311C25.762 26.7299 25.9227 26.3231 25.9227 25.9008V16.5888C25.9227 16.5506 25.9098 16.5135 25.8862 16.4837L25.8755 16.4714L22.442 12.89C22.4096 12.8562 22.3646 12.8369 22.3176 12.8369H16.1373Z" fill="currentColor"/>
                <rect x="16.6524" y="17.5319" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
                <rect x="16.6524" y="20.5957" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
                <rect x="16.6524" y="23.6596" width="7.2103" height="1.53191" rx="0.765957" fill="currentColor"/>
              </svg>
              <span className="text-xl font-bold text-text-primary">DocPhoto.eu</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-text-secondary hover:text-text-primary font-medium">
                {translation.howItWorks.title}
              </a>
              <a href="#preparation" className="text-text-secondary hover:text-text-primary font-medium">
                {translation.preparationTips.title}
              </a>
              <a href="#demo" className="text-text-secondary hover:text-text-primary font-medium">
                {translation.demo}
              </a>
              <a href="#faq" className="text-text-secondary hover:text-text-primary font-medium">
                {translation.faq.title}
              </a>
              <Button 
                onClick={() => setShowUploadDialog(true)}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                {translation.getPhoto}
              </Button>
            </nav>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <select 
                value={currentLang}
                onChange={(e) => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `/${country.code}/${e.target.value}`;
                  }
                }}

                className="text-sm border border-border rounded px-2 py-1"
              >
                {country.languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
                          <a 
                href="https://github.com/meekot/documents-photo-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary font-medium flex items-center space-x-1"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center justify-center md:justify-normal">
            <Image 
                src="/images/header.png"
                alt={translation.subtitle}
                width={458}
                height={340}      
                priority={true}            
              />

            <div className="flex flex-col">
              <h1 className="text-4xl lg:text-5xl font-black text-text-primary mb-6">
                {country.name}
                <br />
                {translation.subtitle.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < translation.subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <div className="flex items-center space-x-8 mb-8">
                <div className="flex items-center space-x-2 ">
                  <div className="text-primary">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                      <path d="M46.4 0H1.6C1.17565 0 0.768687 0.168571 0.468629 0.468629C0.168571 0.768687 0 1.17565 0 1.6L0 46.4C0 46.8243 0.168571 47.2313 0.468629 47.5314C0.768687 47.8314 1.17565 48 1.6 48H46.4C46.8243 48 47.2313 47.8314 47.5314 47.5314C47.8314 47.2313 48 46.8243 48 46.4V1.6C48 1.17565 47.8314 0.768687 47.5314 0.468629C47.2313 0.168571 46.8243 0 46.4 0ZM44.8 44.8H3.2V3.2H44.8V44.8Z" fill="currentColor"/>
                      <path d="M29.495 21C29.927 21.002 30.34 20.834 30.643 20.532L38.81 12.307V17.629C38.81 18.491 39.524 19.189 40.405 19.189C41.286 19.189 42 18.491 42 17.63V8.45C41.9743 8.25216 41.9093 8.06144 41.809 7.889C41.7263 7.7007 41.607 7.53073 41.458 7.389L41.298 7.296C41.0881 7.10665 40.8157 7.00128 40.533 7H31.218C30.336 7 29.622 7.698 29.622 8.56C29.622 9.422 30.336 10.121 31.218 10.121H36.625L28.346 18.471C28.1654 18.6929 28.0503 18.9606 28.0133 19.2443C27.9764 19.528 28.0192 19.8163 28.137 20.077C28.378 20.607 28.903 20.963 29.495 21ZM6.12 41.013C6.18 41.1383 6.257 41.255 6.351 41.363C6.387 41.419 6.42567 41.4723 6.467 41.523C6.778 41.827 7.201 41.998 7.644 42H17.377C18.293 42 19.034 41.287 19.034 40.407C19.034 39.527 18.293 38.815 17.377 38.815H11.756L20.493 30.74C20.649 30.598 20.7744 30.4257 20.8615 30.2335C20.9486 30.0414 20.9955 29.8335 20.9995 29.6225C21.0034 29.4116 20.9642 29.2021 20.8844 29.0069C20.8045 28.8116 20.6856 28.6347 20.535 28.487C20.2228 28.1824 19.806 28.0086 19.3699 28.0012C18.9338 27.9937 18.5114 28.1532 18.189 28.447L9.319 36.649V31.249C9.319 30.37 8.577 29.657 7.661 29.657C6.745 29.657 6.003 30.37 6.003 31.25V40.407C5.999 40.4763 5.999 40.5453 6.003 40.614C6.02367 40.752 6.06333 40.885 6.12 41.013Z" fill="currentColor"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_10_75">
                      <rect width="48" height="48" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{translation.photoSize}</div>
                    <div className="text-text-secondary">{country.photoSize}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-primary">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                      <path d="M46.4 0H1.6C1.17565 0 0.768687 0.168571 0.468629 0.468629C0.168571 0.768687 0 1.17565 0 1.6L0 46.4C0 46.8243 0.168571 47.2313 0.468629 47.5314C0.768687 47.8314 1.17565 48 1.6 48H46.4C46.8243 48 47.2313 47.8314 47.5314 47.5314C47.8314 47.2313 48 46.8243 48 46.4V1.6C48 1.17565 47.8314 0.768687 47.5314 0.468629C47.2313 0.168571 46.8243 0 46.4 0ZM44.8 44.8H3.2V3.2H44.8V44.8Z" fill="currentColor"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M22.0206 7.41574V10.1124C17.9382 10.382 14.1031 13.2135 14.8454 19.4157C15.4392 24.3775 19.9588 25.618 22.1443 25.618L22.0206 33.8427C20.9072 33.7079 19.9175 33.0337 18.9278 31.8202C18.8354 31.6187 18.7518 31.424 18.6729 31.2403C18.3294 30.4407 18.0749 29.8481 17.567 29.7978H15.2165C14.5237 29.7978 14.3505 30.2472 14.3505 30.4719V31.9551C14.5485 36.5933 19.6289 37.9326 22.1443 38.0225V40.9888C22.1443 41.636 22.5567 41.7978 22.7629 41.7978H24.9897C25.4845 41.7978 25.6083 41.1686 25.6083 40.8539V38.1573C36.6186 37.7528 35.5052 22.6517 25.6083 22.382V14.5618C26.9691 14.5618 28.3299 16.7191 28.701 17.5281C28.9979 18.1753 29.4021 18.3371 29.567 18.3371H31.6701C32.3629 18.3371 32.6186 17.8877 32.6598 17.6629V16.1798C32.2887 13.0787 27.9175 9.9326 25.732 10.1124V7.41574C25.732 6.76855 25.1546 6.51687 24.866 6.47192H22.8866C22.2928 6.47192 22.0619 7.10114 22.0206 7.41574ZM25.732 26.5618V33.9775C30.1856 33.4382 29.9382 27.1011 25.732 26.5618ZM22.1443 21.573V14.5618C18.0619 14.2921 17.567 20.8989 22.1443 21.573Z" fill="currentColor"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_13_124">
                      <rect width="48" height="48" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="">
                    <div className="font-medium text-text-primary">{translation.free}</div>
                    <div className="text-text-secondary">{translation.freeDescription}</div>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => setShowUploadDialog(true)}
                className="text-lg"
              >
                {translation.uploadPhoto}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <div className="font-medium text-text-primary mb-1">{translation.features.noUploads}</div>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <div className="font-medium text-text-primary mb-1">{translation.features.privacyFirst}</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <div className="font-medium text-text-primary mb-1">{translation.features.instantResults}</div>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <div className="font-medium text-text-primary mb-1">{translation.features.regulationReady}</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">{translation.howItWorks.title}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/images/how-it-works-upload.png"
                  alt={translation.howItWorks.step1}
                  width={99}
                  height={100}
                />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.howItWorks.step1}</h3>
            </div>

            <div className="text-center">
              <div className=" flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/images/how-it-works-process.png"
                  alt={translation.howItWorks.step2}
                  width={95}
                  height={99}
                />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.howItWorks.step2}</h3>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/images/how-it-works-download.png"
                  alt={translation.howItWorks.step3}
                  width={85}
                  height={100}
                />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.howItWorks.step3}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation tips */}
      <section id="preparation" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">{translation.preparationTips.title}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center ">
              <div className="mb-6">
                <Image 
                  src="/images/tips-good-light.png"
                  alt={translation.preparationTips.goodLighting}
                  width={301}
                  height={301}
                />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.goodLighting}</h3>
                <p className="text-text-secondary text-sm">{translation.preparationTips.goodLightingDesc}</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="mb-6">
                <Image 
                  src="/images/tips-neutural-background.png"
                  alt={translation.preparationTips.neutralBackground}
                  width={301}
                  height={301}
                />
              </div>
              <div>
               <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.neutralBackground}</h3>
               <p className="text-text-secondary text-sm">{translation.preparationTips.neutralBackgroundDesc}</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="mb-6">
                <Image 
                  src="/images/tips-face-the-camera.png"
                  alt={translation.preparationTips.faceCamera}
                  width={301}
                  height={301}
                />
              </div>
              <div>

                <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.faceCamera}</h3>
                <p className="text-text-secondary text-sm">{translation.preparationTips.faceCameraDesc}</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-16 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">{translation.demo}</h2>

          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
            <div>
             <Image 
                src="/images/demo-phone.png"
                alt="before"
                width={162}
                height={285}
              />
            </div>

            <div className="text-4xl text-primary">
              <ChevronsRight className="hidden md:block" size={200} strokeWidth={3} />
              <ChevronsDown  className="block md:hidden" size={200} strokeWidth={3} />
            </div>

            <div>
              <Image 
                src="/images/demo-result.png"
                alt="before"
                width={389}
                height={313}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">{translation.faq.title}</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                {translation.faq.q1}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                {translation.faq.a1}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium ">
                {translation.faq.q2}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                {translation.faq.a2}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium ">
                {translation.faq.q3}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                {translation.faq.a3}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border  rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium ">
                {translation.faq.q4}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                {translation.faq.a4}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium ">
                {translation.faq.q5}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                {translation.faq.a5}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold  mb-8">{translation.cta}</h2>
          <Button 
            size="lg" 
            onClick={() => setShowUploadDialog(true)}
            className="px-8"
          >
            {translation.getPhoto}
          </Button>
        </div>
      </section>

      {/* Footer with Country Links */}
      <CountryFooter 
        translation={translation}
        currentCountry={country.code}
        currentLang={currentLang}
      />

      {/* Photo Upload Dialog */}
      <PhotoUploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        country={country}
        translation={translation}
      />
    </div>
  )
}
