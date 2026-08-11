import { useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import SolutionImageBanner from '@/components/sections/SolutionImageBanner.jsx'
import DetailBody from '@/components/sections/DetailBody.jsx'
import RequestDemoCTASection from '@/components/sections/RequestDemoCTASection.jsx'
import Section from '@/components/layout/Section.jsx'
import Container from '@/components/layout/Container.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { SOLUTIONS, localizedName, localizedDescription } from '@/data/site.js'
import { SOLUTIONS_CONTENT } from '@/data/solutionsContent.js'

/**
 * One dynamic route (/solutions/:slug) renders all 9 solution pages from
 * data, rather than 9 near-identical page files. Content is bilingual
 * ({ en, ta } per slug in SOLUTIONS_CONTENT) — switching language
 * re-renders this page from the same route with no navigation.
 */
export default function SolutionDetail() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const solution = SOLUTIONS.find((s) => s.slug === slug)
  const contentEntry = SOLUTIONS_CONTENT[slug]

  if (!solution || !contentEntry) {
    return <NotFound />
  }

  const content = contentEntry[language] || contentEntry.en
  const related = SOLUTIONS.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={t('solutionsPage.eyebrow')}
        title={localizedName(solution, language)}
        description={localizedDescription(solution, language)}
        icon={solution.icon}
        breadcrumbs={[{ label: t('solutionsPage.eyebrow'), href: '/solutions' }, { label: localizedName(solution, language) }]}
      />

      <Container className="-mt-8 sm:-mt-10 relative z-10">
        <SolutionImageBanner slug={solution.slug} name={localizedName(solution, language)} icon={solution.icon} />
      </Container>

      <DetailBody
        overview={content.overview}
        features={content.features}
        benefits={content.benefits}
        modules={content.modules}
      />

      <Section tone="muted">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          {t('solutionsPage.exploreOthers')}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to={`/solutions/${r.slug}`}
              className="group flex items-center justify-between rounded-xl border border-ink-100 bg-surface px-5 py-4 transition-colors hover:border-brand-primary-200 hover:bg-brand-primary-50"
            >
              <span className="text-sm font-medium text-ink-800">{localizedName(r, language)}</span>
              <ArrowRight className="h-4 w-4 text-ink-300 group-hover:text-brand-primary-600" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>

      <RequestDemoCTASection />
    </>
  )
}
