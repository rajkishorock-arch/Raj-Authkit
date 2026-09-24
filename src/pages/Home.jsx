import { Header } from '../components/layout/Header.jsx'
import { Footer } from '../components/layout/Footer.jsx'
import { Hero } from '../components/sections/Hero.jsx'
import { TrustBar } from '../components/sections/TrustBar.jsx'
import { ProblemSection } from '../components/sections/ProblemSection.jsx'
import { Capabilities } from '../components/sections/Capabilities.jsx'
import { ArchitectureSection } from '../components/sections/ArchitectureSection.jsx'
import { ModularSystem } from '../components/sections/ModularSystem.jsx'
import { ComponentShowcase } from '../components/sections/ComponentShowcase.jsx'
import { AuthPlayground } from '../components/sections/AuthPlayground.jsx'
import { DeveloperExperience } from '../components/sections/DeveloperExperience.jsx'
import { DocumentationPreview } from '../components/sections/DocumentationPreview.jsx'
import { OpenSourceSection } from '../components/sections/OpenSourceSection.jsx'
import { WhatsNew } from '../components/sections/WhatsNew.jsx'
import { FinalCTA } from '../components/sections/FinalCTA.jsx'

export function Home() {
  return (
    <div className="rak-site">
      {/* 1. Sticky Accessible Header */}
      <Header />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Trust / Proof Bar */}
        <TrustBar />

        {/* 4. Problem & Dilemma Section */}
        <ProblemSection />

        {/* 5. Core Capabilities */}
        <Capabilities />

        {/* 6. Interactive Architecture Diagram */}
        <ArchitectureSection />

        {/* 7. Modular System Tree */}
        <ModularSystem />

        {/* 8. Component Showcase Tabs */}
        <ComponentShowcase />

        {/* 9. Live Interactive Playground with ProtectedRoute */}
        <AuthPlayground />

        {/* 10. Developer Experience & Code Snippets */}
        <DeveloperExperience />

        {/* 11. Documentation Preview */}
        <DocumentationPreview />

        {/* 12. Open Source Community */}
        <OpenSourceSection />

        {/* 13. What's New & Milestones */}
        <WhatsNew />

        {/* 14. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* 15. Footer */}
      <Footer />
    </div>
  )
}

export default Home
