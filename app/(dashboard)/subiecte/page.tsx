import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import {
  ChevronRight,
  FlaskConical,
  Droplets,
  Bug,
  Microscope,
  Worm,
  Stethoscope,
  FileText,
  Activity,
  Shuffle,
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
  accentDim: string
  border: string
  hoverBg: string
  badge: string
  indicator: string
}> = {
  'BIOCHIMIE': {
    icon: FlaskConical,
    accent: 'text-cyan-400',
    accentDim: 'text-cyan-600',
    border: 'border-cyan-500/20',
    hoverBg: 'hover:bg-cyan-500/5',
    badge: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20',
    indicator: 'bg-cyan-500',
  },
  'HEMATOLOGIE': {
    icon: Droplets,
    accent: 'text-red-400',
    accentDim: 'text-red-600',
    border: 'border-red-500/20',
    hoverBg: 'hover:bg-red-500/5',
    badge: 'bg-red-500/10 text-red-400 ring-red-500/20',
    indicator: 'bg-red-500',
  },
  'BACTERIOLOGIE': {
    icon: Bug,
    accent: 'text-emerald-400',
    accentDim: 'text-emerald-600',
    border: 'border-emerald-500/20',
    hoverBg: 'hover:bg-emerald-500/5',
    badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    indicator: 'bg-emerald-500',
  },
  'VIRUSOLOGIE': {
    icon: Microscope,
    accent: 'text-violet-400',
    accentDim: 'text-violet-600',
    border: 'border-violet-500/20',
    hoverBg: 'hover:bg-violet-500/5',
    badge: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
    indicator: 'bg-violet-500',
  },
  'PARAZITOLOGIE': {
    icon: Worm,
    accent: 'text-amber-400',
    accentDim: 'text-amber-600',
    border: 'border-amber-500/20',
    hoverBg: 'hover:bg-amber-500/5',
    badge: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    indicator: 'bg-amber-500',
  },
}

const defaultConfig = {
  icon: FileText,
  accent: 'text-slate-400',
  accentDim: 'text-slate-600',
  border: 'border-slate-500/20',
  hoverBg: 'hover:bg-slate-500/5',
  badge: 'bg-slate-500/10 text-slate-400 ring-slate-500/20',
  indicator: 'bg-slate-500',
}

export default function SubiectePage(): React.JSX.Element {
  const data = subiecteData as SpecialityData[]

  const totalCards = data.reduce(
    (sum, spec) => sum + spec.subjects.reduce((s, subj) => s + subj.flashcards.length, 0),
    0
  )
  const totalSubjects = data.reduce((sum, spec) => sum + spec.subjects.length, 0)

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
                Subiecte Primariat
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500 tabular-nums">{data.length} specialități</span>
                <span className="text-gray-700">·</span>
                <span className="text-xs text-gray-500 tabular-nums">{totalSubjects} subiecte</span>
                <span className="text-gray-700">·</span>
                <span className="text-xs text-gray-500 tabular-nums">{totalCards} întrebări</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Mode Button */}
        <Link href="/subiecte/random" className="block mb-6">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center justify-between hover:from-amber-500/15 hover:to-orange-500/15 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                <Shuffle className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Mod Seamless</p>
                <p className="text-[10px] text-gray-500">Întrebări random, fără oprire — doar tap-tap-tap</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
          </div>
        </Link>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-3 mb-10">
          {data.map((speciality, specIdx) => {
            const config = specialityConfig[speciality.name] || defaultConfig
            const Icon = config.icon
            const specCards = speciality.subjects.reduce((s, subj) => s + subj.flashcards.length, 0)
            return (
              <div key={specIdx} className="bg-[#0F172A] border border-gray-800/60 rounded-lg p-3 text-center">
                <Icon className={`w-4 h-4 ${config.accent} mx-auto mb-1.5`} />
                <p className="text-lg font-bold text-gray-200 tabular-nums">{specCards}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5 truncate">{speciality.name}</p>
              </div>
            )
          })}
        </div>

        {/* Specialities */}
        <div className="space-y-8">
          {data.map((speciality, specIdx) => {
            const config = specialityConfig[speciality.name] || defaultConfig
            const Icon = config.icon
            const specTotalCards = speciality.subjects.reduce(
              (sum, subj) => sum + subj.flashcards.length, 0
            )

            return (
              <section key={specIdx} className="bg-[#0F172A] border border-gray-800/60 rounded-xl overflow-hidden">
                {/* Speciality Header */}
                <div className="px-5 py-4 border-b border-gray-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${config.indicator}`} />
                    <Icon className={`w-4 h-4 ${config.accent}`} />
                    <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      {speciality.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${config.badge}`}>
                      {speciality.subjects.length} subiecte
                    </span>
                    <span className="text-xs text-gray-500 tabular-nums">
                      {specTotalCards} întrebări
                    </span>
                  </div>
                </div>

                {/* Subject List */}
                <div className="divide-y divide-gray-800/40">
                  {speciality.subjects.map((subject, subjIdx) => (
                    <Link
                      key={subjIdx}
                      href={`/subiecte/${specIdx}/${subjIdx}`}
                      className={`flex items-center justify-between px-5 py-3 ${config.hoverBg} transition-colors group`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`text-xs font-mono ${config.accentDim} w-5 text-right flex-shrink-0 tabular-nums`}>
                          {subjIdx + 1}
                        </span>
                        <span className="text-sm text-gray-300 truncate group-hover:text-gray-100 transition-colors">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-gray-600" />
                          <span className="text-xs text-gray-500 tabular-nums">
                            {subject.flashcards.length}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-400 transition-colors" />
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
