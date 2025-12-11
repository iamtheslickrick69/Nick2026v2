import LoopSyncNavbar from "@/components/LoopSyncNavbar"
import ProblemWakeUp from "@/components/ProblemWakeUp"
import HowItWorksSection from "@/components/HowItWorksSection"
import FeaturesSection from "@/components/FeaturesSection"
import CTASection from "@/components/CTASection"
import LoopSyncFooter from "@/components/LoopSyncFooter"
import AIChatbot from "@/components/dashboard/AIChatbot"

export default function Page() {
  return (
    <>
      <LoopSyncNavbar />
      <ProblemWakeUp />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <LoopSyncFooter />

      {/* AI Chatbot (Floating) */}
      <AIChatbot />
    </>
  )
}
