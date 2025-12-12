import LoopSyncNavbar from "@/components/LoopSyncNavbar"
import BeforeAfterHero from "@/components/BeforeAfterHero"
import IPhoneDemoSection from "@/components/IPhoneDemoSection"
import WhySMSSection from "@/components/WhySMSSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import UseCasesSection from "@/components/UseCasesSection"
import FeaturesSection from "@/components/FeaturesSection"
import SecuritySection from "@/components/SecuritySection"
import LoopSyncFAQSection from "@/components/LoopSyncFAQSection"
import CTASection from "@/components/CTASection"
import LoopSyncFooter from "@/components/LoopSyncFooter"
import AIChatbot from "@/components/dashboard/AIChatbot"

export default function Page() {
  return (
    <>
      <LoopSyncNavbar />
      <BeforeAfterHero />
      <WhySMSSection />
      <IPhoneDemoSection />
      <HowItWorksSection />
      <UseCasesSection />
      <FeaturesSection />
      <SecuritySection />
      <LoopSyncFAQSection />
      <CTASection />
      <LoopSyncFooter />

      {/* AI Chatbot (Floating) */}
      <AIChatbot />
    </>
  )
}
