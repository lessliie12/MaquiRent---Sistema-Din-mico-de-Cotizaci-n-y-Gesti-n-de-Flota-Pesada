'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Catalog } from '@/components/Catalog';
import { RentalCalculator } from '@/components/RentalCalculator';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MachineDetailModal } from '@/components/MachineDetailModal';
import { QuoteDrawer } from '@/components/QuoteDrawer';
import { CookieBanner } from '@/components/CookieBanner';
import { Machine, QuoteItem } from '@/types/machine';

export default function Page() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [selectedMachineForModal, setSelectedMachineForModal] = useState<Machine | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [contactInitialSummary, setContactInitialSummary] = useState('');

  // Add machine to quote cart
  const handleAddToQuote = (machine: Machine) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.machineId === machine.id);
      if (existing) {
        return prev.map((item) =>
          item.machineId === machine.id ? { ...item, days: item.days + 5 } : item
        );
      }
      return [
        ...prev,
        {
          machineId: machine.id,
          machineName: machine.name,
          machineType: machine.type,
          dailyRate: machine.dailyRate,
          days: 10,
          withOperator: true,
        },
      ];
    });
  };

  // Apply custom simulation from the calculator
  const handleApplySimulation = (machine: Machine, days: number, withOperator: boolean) => {
    setQuoteItems((prev) => {
      const filtered = prev.filter((item) => item.machineId !== machine.id);
      return [
        ...filtered,
        {
          machineId: machine.id,
          machineName: machine.name,
          machineType: machine.type,
          dailyRate: machine.dailyRate,
          days,
          withOperator,
        },
      ];
    });
  };

  const handleUpdateDays = (machineId: string, days: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.machineId === machineId ? { ...item, days } : item))
    );
  };

  const handleToggleOperator = (machineId: string) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.machineId === machineId ? { ...item, withOperator: !item.withOperator } : item
      )
    );
  };

  const handleRemoveQuoteItem = (machineId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.machineId !== machineId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendSimulationToContact = (summaryText: string) => {
    setContactInitialSummary(summaryText);
    scrollToSection('contact');
  };

  const handleProceedFromQuoteToContact = () => {
    if (quoteItems.length === 0) return;
    const summaryLines = quoteItems.map(
      (it, idx) =>
        `${idx + 1}. ${it.machineName} (${it.days} días, Operador: ${
          it.withOperator ? 'Sí' : 'No'
        })`
    );
    const summary = `Cotización solicitada desde Mi Bolsa (${quoteItems.length} equipos):\n${summaryLines.join(
      '\n'
    )}`;
    setContactInitialSummary(summary);
    scrollToSection('contact');
  };

  return (
    <main className="min-h-screen bg-[#f4f5f6] text-[#141719] flex flex-col justify-between selection:bg-[#f6c400] selection:text-[#141719]">
      {/* 1. Header & Navigation */}
      <Navbar
        quoteCount={quoteItems.length}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenQuickQuote={() => scrollToSection('contact')}
      />

      {/* 2. Hero Section */}
      <Hero
        onScrollToCatalog={() => scrollToSection('equipment')}
        onScrollToCalculator={() => scrollToSection('calculator')}
      />

      {/* 3. Catalog with Live Filters & Search */}
      <Catalog
        onSelectMachine={(machine) => setSelectedMachineForModal(machine)}
        onAddToQuote={handleAddToQuote}
        quotedMachineIds={quoteItems.map((item) => item.machineId)}
      />

      {/* 4. Live Rental Simulator / Calculator */}
      <RentalCalculator
        onApplyToQuote={handleApplySimulation}
        onScrollToContact={handleSendSimulationToContact}
      />

      {/* 5. Services and Support */}
      <ServicesSection onScrollToContact={() => scrollToSection('contact')} />

      {/* 6. About Us (Real company story, stats, safety standards) */}
      <AboutSection />

      {/* 7. Client Testimonials */}
      <TestimonialsSection />

      {/* 8. Interactive FAQ */}
      <FAQSection onScrollToContact={() => scrollToSection('contact')} />

      {/* 9. Contact & Official Radicado Form */}
      <ContactSection
        initialSummary={contactInitialSummary}
        onClearInitialSummary={() => setContactInitialSummary('')}
      />

      {/* 10. Footer */}
      <Footer />

      {/* 11. Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* 12. Technical Sheet Modal */}
      <MachineDetailModal
        machine={selectedMachineForModal}
        onClose={() => setSelectedMachineForModal(null)}
        onAddToQuote={handleAddToQuote}
      />

      {/* 13. Quote Cart Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateDays={handleUpdateDays}
        onToggleOperator={handleToggleOperator}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
        onProceedToForm={handleProceedFromQuoteToContact}
      />

      {/* 14. Technical Cookies Consent Banner */}
      <CookieBanner />
    </main>
  );
}
