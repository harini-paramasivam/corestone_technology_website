import { useParams } from 'react-router-dom'
import PageHero from '@/components/sections/PageHero.jsx'
import IndustryImageBanner from '@/components/sections/IndustryImageBanner.jsx'
import DetailBody from '@/components/sections/DetailBody.jsx'
import SampleDashboardPreview from '@/components/sections/SampleDashboardPreview.jsx'
import RequestDemoCTASection from '@/components/sections/RequestDemoCTASection.jsx'
import Container from '@/components/layout/Container.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { INDUSTRIES, localizedName } from '@/data/site.js'
import { INDUSTRIES_CONTENT } from '@/data/industriesContent.js'

/**
 * One dynamic route (/industries/:slug) renders all 28 industry pages
 * from data. Content is bilingual ({ en, ta } per slug in
 * INDUSTRIES_CONTENT) — switching language re-renders in place.
 */
export default function IndustryDetail() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  const contentEntry = INDUSTRIES_CONTENT[slug]

  if (!industry || !contentEntry) {
    return <NotFound />
  }

  const content = contentEntry[language] || contentEntry.en

  return (
    <>
      <PageHero
        eyebrow={t('industriesPage.eyebrow')}
        title={localizedName(industry, language)}
        description={content.overview}
        icon={industry.icon}
        breadcrumbs={[{ label: t('industriesPage.eyebrow'), href: '/industries' }, { label: localizedName(industry, language) }]}
      />

      <Container className="-mt-8 sm:-mt-10 relative z-10">
        <IndustryImageBanner slug={industry.slug} name={localizedName(industry, language)} icon={industry.icon} />
      </Container>

      <DetailBody
        overview={content.overview}
        features={content.features}
        benefits={content.benefits}
        modules={content.modules}
      />

      <SampleDashboardPreview industryName={localizedName(industry, language)} />

      <RequestDemoCTASection />
    </>
  )
}
