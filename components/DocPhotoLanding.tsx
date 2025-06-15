'use client';

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Shield, Eye, Zap, CheckCircle, Monitor, Download, Lightbulb } from "lucide-react"
import { Country } from "@/config/countries"
import { Translation } from "@/config/translations"
import { PhotoUploadDialog } from "@/components/PhotoUploadDialog"
import Link from "next/link"
import { useState } from "react"

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
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">DocPhoto.io</span>
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
                  window.location.href = `/${country.code}/${e.target.value}`;
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-80 h-80 bg-primary-light rounded-full absolute -top-8 -left-8 opacity-50"></div>
              <div className="relative z-10">
                <div className="w-64 h-64 mx-auto">
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    {/* Person illustration */}
                    <circle cx="150" cy="120" r="45" fill="#f4c2a1" />
                    <path
                      d="M105 120 Q105 80 150 80 Q195 80 195 120 L195 140 Q195 160 150 160 Q105 160 105 140 Z"
                      fill="#4a4a4a"
                    />
                    <rect x="120" y="160" width="60" height="80" rx="30" fill="#44b871" />
                    <rect x="130" y="170" width="40" height="60" rx="20" fill="#318451" />

                    {/* Phone */}
                    <rect x="80" y="140" width="25" height="45" rx="8" fill="#333" />
                    <circle cx="92" cy="150" r="2" fill="#fff" />
                    <rect x="85" y="155" width="15" height="25" rx="2" fill="#444" />

                    {/* Arm */}
                    <ellipse cx="95" cy="180" rx="15" ry="8" fill="#f4c2a1" transform="rotate(-30 95 180)" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
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
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-sm"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">{translation.photoSize}</div>
                    <div className="text-sm text-text-secondary">{country.photoSize}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">$</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">{translation.free}</div>
                    <div className="text-sm text-text-secondary">{translation.freeDescription}</div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={() => setShowUploadDialog(true)}
                className="bg-primary hover:bg-primary-dark text-white px-8"
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
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.howItWorks.step1}</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.howItWorks.step2}</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-primary-dark" />
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
            <div>
              <div className="relative mb-6">
                <div className="w-48 h-48 bg-primary-light rounded-full mx-auto relative overflow-hidden">
                  <div className="absolute top-8 left-8">
                    <Lightbulb className="w-8 h-8 text-accent-yellow" />
                  </div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-32 bg-primary rounded-t-full"></div>
                    <div className="w-20 h-20 bg-accent-skin rounded-full mx-auto -mt-8"></div>
                    <div className="w-16 h-12 bg-accent-hair rounded-full mx-auto -mt-4"></div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.goodLighting}</h3>
              <p className="text-text-secondary text-sm">{translation.preparationTips.goodLightingDesc}</p>
            </div>

            <div>
              <div className="w-48 h-48 bg-background border-4 border-text-primary mx-auto mb-6 relative overflow-hidden">
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-24 bg-primary rounded-t-full"></div>
                  <div className="w-16 h-16 bg-accent-skin rounded-full mx-auto -mt-6"></div>
                  <div className="w-12 h-8 bg-accent-hair rounded-full mx-auto -mt-2"></div>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.neutralBackground}</h3>
              <p className="text-text-secondary text-sm">{translation.preparationTips.neutralBackgroundDesc}</p>
            </div>

            <div>
              <div className="w-48 h-48 bg-background border-4 border-text-primary mx-auto mb-6 relative overflow-hidden">
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-24 bg-primary rounded-t-full"></div>
                  <div className="w-16 h-16 bg-accent-skin rounded-full mx-auto -mt-6"></div>
                  <div className="w-12 h-8 bg-accent-hair rounded-full mx-auto -mt-2"></div>
                  <div className="w-2 h-2 bg-text-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-2 -translate-y-2"></div>
                  <div className="w-2 h-2 bg-text-primary rounded-full absolute top-1/2 left-1/2 transform translate-x-2 -translate-y-2"></div>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{translation.preparationTips.faceCamera}</h3>
              <p className="text-text-secondary text-sm">{translation.preparationTips.faceCameraDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-16 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">{translation.demo}</h2>

          <div className="flex items-center justify-center space-x-8">
            <div className="relative">
              <div className="w-48 h-64 bg-primary rounded-3xl p-4">
                <div className="w-full h-48 bg-accent-gray rounded-2xl mb-4 relative overflow-hidden">
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-20 bg-accent-skin rounded-full"></div>
                    <div className="w-12 h-8 bg-accent-brown rounded-full mx-auto -mt-4"></div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-8 bg-accent-red rounded-full"></div>
                  <div className="w-8 h-8 bg-text-secondary rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="text-4xl text-primary">
              <svg width="48" height="24" viewBox="0 0 48 24" fill="currentColor">
                <path d="M8 6l8 6-8 6V6zm16 0l8 6-8 6V6z" />
              </svg>
            </div>

            <div className="bg-[#ffffff] p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-20 bg-[#f0f2f5] rounded border-2 border-[#e5e8eb] relative overflow-hidden"
                  >
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-10 bg-[#f4c2a1] rounded-full"></div>
                      <div className="w-6 h-4 bg-[#8b4513] rounded-full mx-auto -mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#121417] mb-12">{translation.faq.title}</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-[#e5e8eb] rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium text-[#121417]">
                {translation.faq.q1}
              </AccordionTrigger>
              <AccordionContent className="text-[#61758a]">
                {translation.faq.a1}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-[#e5e8eb] rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium text-[#121417]">
                {translation.faq.q2}
              </AccordionTrigger>
              <AccordionContent className="text-[#61758a]">
                {translation.faq.a2}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-[#e5e8eb] rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium text-[#121417]">
                {translation.faq.q3}
              </AccordionTrigger>
              <AccordionContent className="text-[#61758a]">
                {translation.faq.a3}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-[#e5e8eb] rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium text-[#121417]">
                {translation.faq.q4}
              </AccordionTrigger>
              <AccordionContent className="text-[#61758a]">
                {translation.faq.a4}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-[#e5e8eb] rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium text-[#121417]">
                {translation.faq.q5}
              </AccordionTrigger>
              <AccordionContent className="text-[#61758a]">
                {translation.faq.a5}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f5fbfe]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#121417] mb-8">{translation.cta}</h2>
          <Button 
            size="lg" 
            onClick={() => setShowUploadDialog(true)}
            className="bg-[#44b871] hover:bg-[#318451] text-white px-8"
          >
            {translation.getPhoto}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#ffffff] border-t border-[#e5e8eb] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8">
              <a href="#" className="text-[#61758a] hover:text-[#121417]">
                {translation.footer.about}
              </a>
              <a href="#" className="text-[#61758a] hover:text-[#121417]">
                {translation.footer.terms}
              </a>
              <a href="#" className="text-[#61758a] hover:text-[#121417]">
                {translation.footer.privacy}
              </a>
              <a href="#" className="text-[#61758a] hover:text-[#121417]">
                {translation.footer.contact}
              </a>
            </div>
            <div className="text-[#61758a] text-sm">{translation.footer.copyright}</div>
          </div>
        </div>
      </footer>

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
