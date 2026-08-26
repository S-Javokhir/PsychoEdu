import React from 'react';
import { MarketingHeader } from '../../components/marketing/MarketingHeader';
import { HeroSection } from '../../components/marketing/HeroSection';
import { TherapyCategoriesSection } from '../../components/marketing/TherapyCategoriesSection';
import { HowItWorksSection } from '../../components/marketing/HowItWorksSection';
import { LiveMonitoringShowcase } from '../../components/marketing/LiveMonitoringShowcase';
import { VideoLibraryShowcase } from '../../components/marketing/VideoLibraryShowcase';
import { EducationalJourneySection } from '../../components/marketing/EducationalJourneySection';
import { ProfessorExperienceSection } from '../../components/marketing/ProfessorExperienceSection';
import { PrivacyTrustSection } from '../../components/marketing/PrivacyTrustSection';
import { TestimonialsSection } from '../../components/marketing/TestimonialsSection';
import { FaqSection } from '../../components/marketing/FaqSection';
import { FinalCtaSection } from '../../components/marketing/FinalCtaSection';
import { MarketingFooter } from '../../components/marketing/MarketingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-page text-text-main flex flex-col selection:bg-teal-100 selection:text-deep-teal font-sans">
      {/* 1. InHarmony Header / Navigation */}
      <MarketingHeader />

      {/* Main InHarmony Narrative Marketing Flow */}
      <main className="flex-1">
        {/* 2. Dark Forest Hero Section & Social Proof Stats */}
        <HeroSection />

        {/* 3. Pastel Therapy & Clinical Practice Categories ("You deserve to be happy" style) */}
        <TherapyCategoriesSection />

        {/* 4. 2-Column Alternating Process & Capabilities */}
        <HowItWorksSection />

        {/* 5. Live Monitoring Product Showcase */}
        <LiveMonitoringShowcase />

        {/* 6. Curated Video Library Showcase */}
        <VideoLibraryShowcase />

        {/* 7. Connected Pedagogical Pipeline (Video -> Material -> Case -> Outcome) */}
        <EducationalJourneySection />

        {/* 8. Professor / Psychologist Unified Experience */}
        <ProfessorExperienceSection />

        {/* 9. Privacy & Ethical Trust Pillars */}
        <PrivacyTrustSection />

        {/* 10. Academic & Student Testimonials ("What people say" style) */}
        <TestimonialsSection />

        {/* 11. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 12. InHarmony Final Call-to-Action */}
        <FinalCtaSection />
      </main>

      {/* 13. Dark Forest University Footer */}
      <MarketingFooter />
    </div>
  );
};
