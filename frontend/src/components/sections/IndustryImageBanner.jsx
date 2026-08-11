import { cn } from '@/lib/utils'
import { getIndustryImage } from '@/data/industryImages.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function IndustryImageBanner({ slug, name, icon: Icon }) {
  const { language } = useLanguage()
  const imageData = getIndustryImage(slug)
  const categoryText = language === 'ta' && imageData.categoryTa ? imageData.categoryTa : imageData.category
  const subtitleText = language === 'ta' && imageData.altTa ? imageData.altTa : imageData.alt

  return (
    <div
      className={cn(
        'relative flex h-72 sm:h-96 lg:h-[420px] w-full items-end justify-between overflow-hidden rounded-card border-2 border-white/80 bg-slate-800 p-6 sm:p-10 shadow-lifted group'
      )}
      role="img"
      aria-label={name}
    >
      {/* Real High-Resolution Bright Professional Photography Image */}
      <img
        src={imageData.url}
        alt={subtitleText}
        className="absolute inset-0 h-full w-full object-cover object-center brightness-105 contrast-105 saturate-110 transition-transform duration-700 ease-out group-hover:scale-105"
        loading="eager"
      />

      {/* Gentle Gradient Shadow at bottom only for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
        aria-hidden="true"
      />

      {/* Left Info Badge on Frosted Glass Card */}
      <div className="relative z-10 max-w-lg rounded-2xl bg-slate-950/65 p-5 backdrop-blur-md border border-white/30 shadow-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
          {categoryText}
        </span>
        <h2 className="mt-2.5 text-2xl font-black font-display !text-white sm:text-3xl lg:text-4xl drop-shadow-md" style={{ color: '#ffffff' }}>
          {name}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm font-medium text-blue-100 line-clamp-2">
          {subtitleText}
        </p>
      </div>

      {/* Right Industry Icon Badge */}
      <div className="relative z-10 flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-2xl border-2 border-white/40 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
        {Icon && <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} aria-hidden="true" />}
      </div>
    </div>
  )
}
