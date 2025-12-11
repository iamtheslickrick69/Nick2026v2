import LoopSyncNavbar from "@/components/LoopSyncNavbar"
import ProblemWakeUp from "@/components/ProblemWakeUp"
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
      <ProblemWakeUp />
      <IPhoneDemoSection />
      <WhySMSSection />
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
