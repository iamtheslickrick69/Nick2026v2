import LoopSyncNavbar from "@/components/LoopSyncNavbar"
import ProblemWakeUp from "@/components/ProblemWakeUp"
import CTASection from "@/components/CTASection"
import IPhoneDemoSection from "@/components/IPhoneDemoSection"
import WhySMSSection from "@/components/WhySMSSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import ClosedLoopTracker from "@/components/ClosedLoopTracker"
import UseCasesSection from "@/components/UseCasesSection"
import FeaturesSection from "@/components/FeaturesSection"
import SecuritySection from "@/components/SecuritySection"
import FounderSection from "@/components/FounderSection"
import LoopSyncFAQSection from "@/components/LoopSyncFAQSection"
import LoopSyncFooter from "@/components/LoopSyncFooter"
import AIChatbot from "@/components/dashboard/AIChatbot"

export default function Page() {
  return (
    <>
      <LoopSyncNavbar />
      <ProblemWakeUp />
      <CTASection />
      <IPhoneDemoSection />
      <WhySMSSection />
      <HowItWorksSection />
      <ClosedLoopTracker />
      <UseCasesSection />
      <FeaturesSection />
      <SecuritySection />
      <FounderSection />
      <LoopSyncFAQSection />
      <LoopSyncFooter />

      {/* AI Chatbot (Floating) */}
      <AIChatbot />
    </>
  )
}
