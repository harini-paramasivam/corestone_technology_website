import WhyCoreStoneSection from '@/components/sections/WhyCoreStoneSection.jsx'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection.jsx'
import FeaturesSection from '@/components/sections/FeaturesSection.jsx'
import RequestDemoCTASection from '@/components/sections/RequestDemoCTASection.jsx'

export default function WhyCoreStone() {
  return (
    <>
      <div className="pt-32 pb-12 bg-gradient-to-b from-brand-primary-50 to-surface border-b border-ink-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Why Choose CoreStone?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Software built around how your business actually runs.
          </p>
        </div>
      </div>
      <WhyCoreStoneSection />
      <HowWeWorkSection />
      <FeaturesSection />
      <RequestDemoCTASection />
    </>
  )
}
