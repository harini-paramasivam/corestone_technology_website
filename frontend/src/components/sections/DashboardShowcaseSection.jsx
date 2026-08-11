import { BarChart3, TrendingUp, Users, Package } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

const KPIS = [
  { icon: TrendingUp, label: "Today's sales", value: '₹1,84,200', delta: '+12.4%' },
  { icon: Package, label: 'Stock value', value: '₹42.6L', delta: '+3.1%' },
  { icon: Users, label: 'Active customers', value: '1,204', delta: '+8.9%' },
  { icon: BarChart3, label: 'Orders today', value: '386', delta: '+5.7%' },
]

export default function DashboardShowcaseSection() {
  const { t } = useLanguage()

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Eyebrow>{t('home.dashboardEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.dashboardHeading')}
          </Heading>
          <p className="mt-4 text-ink-500 leading-relaxed max-w-md">
            {t('home.dashboardSubhead')}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-600">
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-500" />
              {t('home.dashboardBullet1')}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-500" />
              {t('home.dashboardBullet2')}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-500" />
              {t('home.dashboardBullet3')}
            </li>
          </ul>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="rounded-card bg-ink-950 p-6 shadow-lifted">
            <div className="grid grid-cols-2 gap-4">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="rounded-xl bg-white/5 p-4 border border-white/10 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <kpi.icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">{kpi.delta}</span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-ink-300">{kpi.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-white/5 p-4">
              <div className="flex items-end gap-2 h-24">
                {[35, 55, 40, 70, 60, 85, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-primary-600 to-brand-accent-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-400">Sales, last 7 days</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
