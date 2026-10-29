import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { WorkflowJourney } from './components/WorkflowJourney';
import { AiMeetsPcb } from './components/AiMeetsPcb';
import { Curriculum } from './components/Curriculum';
import { Audience } from './components/Audience';
import { CertificateShowcase } from './components/CertificateShowcase';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { StickyBanner } from './components/StickyBanner';
import { RevealOnScroll } from './components/RevealOnScroll';

export function AppContent() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#080a0f] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-primary/20 selection:text-brand-primaryText transition-colors duration-200">
      {/* Navigation Bar with Theme Switcher & Razorpay CTA */}
      <Navbar onOpenCheckout={handleOpenCheckout} />

      {/* Main Page Flow */}
      <main className="flex-1">
        <Hero onOpenCheckout={handleOpenCheckout} />
        
        <RevealOnScroll>
          <PainPoints onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <WorkflowJourney onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <AiMeetsPcb onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <Curriculum onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <Audience onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <CertificateShowcase onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <PricingSection onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <FaqSection onOpenCheckout={handleOpenCheckout} />
        </RevealOnScroll>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Bar on Scroll */}
      <StickyBanner onOpenCheckout={handleOpenCheckout} />

      {/* Razorpay Registration & Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
