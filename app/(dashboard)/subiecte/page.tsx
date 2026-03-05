import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronRight,
  FlaskConical,
  Droplets,
  Bug,
  Microscope,
  Worm,
  GraduationCap,
  FileText,
} from 'lucide-react'
import subiecteData from '@/data/subiecte-primariat.json'

interface SubjectData {
  name: string
  flashcards: { front: string; back: string }[]
}

interface SpecialityData {
  name: string
  subjects: SubjectData[]
}

const specialityConfig: Record<string, {
  icon: typeof FlaskConical
  accent: string
  accentBg: string
  accentBorder: string
  accentText: string
  headerBg: string
}> = {
  'BIOCHIMIE': {
    icon: FlaskConical,
    accent: 'text-teal-700 dark:text-teal-400',
    accentBg: 'bg-teal-50 dark:bg-teal-950/40',
    accentBorder: 'border-teal-200 dark:border-teal-800/60',
    accentText: 'text-teal-600 dark:text-teal-400',
    headerBg: 'bg-teal-600 dark:bg-teal-700',
  },
  'HEMATOLOGIE': {
    icon: Droplets,
    accent: 'text-rose-700 dark:text-rose-400',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40',
    accentBorder: 'border-rose-200 dark:border-rose-800/60',
    accentText: 'text-rose-600 dark:text-rose-400',
    headerBg: 'bg-rose-600 dark:bg-rose-700',
  },
  'BACTERIOLOGIE': {
    icon: Bug,
    accent: 'text-emerald-700 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    accentBorder: 'border-emerald-200 dark:border-emerald-800/60',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    headerBg: 'bg-emerald-600 dark:bg-emerald-700',
  },
  'VIRUSOLOGIE': {
    icon: Microscope,
    accent: 'text-violet-700 dark:text-violet-400',
    accentBg: 'bg-violet-50 dark:bg-violet-950/40',
    accentBorder: 'border-violet-200 dark:border-violet-800/60',
    accentText: 'text-violet-600 dark:text-violet-400',
    headerBg: 'bg-violet-600 dark:bg-violet-700',
  },
  'PARAZITOLOGIE': {
    icon: Worm,
    accent: 'text-amber-700 dark:text-amber-400',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40',
    accentBorder: 'border-amber-200 dark:border-amber-800/60',
    accentText: 'text-amber-600 dark:text-amber-400',
    headerBg: 'bg-amber-600 dark:bg-amber-700',
  },
}

const defaultConfig = {
  icon: FileText,
  accent: 'text-slate-700 dark:text-slate-400',
  accentBg: 'bg-slate-50 dark:bg-slate-950/40',
  accentBorder: 'border-slate-200 dark:border-slate-800/60',
  accentText: 'text-slate-600 dark:text-slate-400',
  headerBg: 'bg-slate-600 dark:bg-slate-700',
}

export default function SubiectePage(): React.JSX.Element {
  const data = subiecteData as SpecialityData[]

  const totalCards = data.reduce(
    (sum, spec) => sum + spec.subjects.reduce((s, subj) => s + subj.flashcards.length, 0),
    0
  )
  const totalSubjects = data.reduce((sum, spec) => sum + spec.subjects.length, 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 dark:bg-slate-200 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Subiecte Primariat
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {data.length} specialități · {totalSubjects} subiecte · {totalCards} întrebări
              </p>
            </div>
          </div>
        </div>

        {/* Specialities */}
        <div className="space-y-10">
          {data.map((speciality, specIdx) => {
            const config = specialityConfig[speciality.name] || defaultConfig
            const Icon = config.icon
            const specTotalCards = speciality.subjects.reduce(
              (sum, subj) => sum + subj.flashcards.length, 0
            )

            return (
              <section key={specIdx}>
                {/* Speciality Header */}
                <div className={`${config.headerBg} rounded-t-xl px-5 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-white/90" />
                    <h2 className="text-base font-semibold text-white tracking-wide uppercase">
                      {speciality.name}
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-white/70 tabular-nums">
                    {speciality.subjects.length} subiecte · {specTotalCards} întrebări
                  </span>
                </div>

                {/* Subject List */}
                <div className={`border border-t-0 ${config.accentBorder} rounded-b-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/60`}>
                  {speciality.subjects.map((subject, subjIdx) => (
                    <Link
                      key={subjIdx}
                      href={`/subiecte/${specIdx}/${subjIdx}`}
                      className={`flex items-center justify-between px-5 py-3.5 ${config.accentBg} hover:bg-white dark:hover:bg-slate-900/60 transition-colors group`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`text-xs font-mono font-semibold ${config.accentText} w-6 text-right flex-shrink-0 tabular-nums`}>
                          {subjIdx + 1}
                        </span>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                          {subject.flashcards.length}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
