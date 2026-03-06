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
    accent: 'text-blue-300/70',
    accentDim: 'text-blue-400/40',
    border: 'border-blue-400/10',
    hoverBg: 'hover:bg-blue-400/5',
    badge: 'bg-blue-400/10 text-blue-300/70 ring-blue-400/15',
    indicator: 'bg-blue-400/50',
  },
  'HEMATOLOGIE': {
    icon: Droplets,
    accent: 'text-rose-300/70',
    accentDim: 'text-rose-400/40',
    border: 'border-rose-400/10',
    hoverBg: 'hover:bg-rose-400/5',
    badge: 'bg-rose-400/10 text-rose-300/70 ring-rose-400/15',
    indicator: 'bg-rose-400/50',
  },
  'BACTERIOLOGIE': {
    icon: Bug,
    accent: 'text-green-300/70',
    accentDim: 'text-green-400/40',
    border: 'border-green-400/10',
    hoverBg: 'hover:bg-green-400/5',
    badge: 'bg-green-400/10 text-green-300/70 ring-green-400/15',
    indicator: 'bg-green-400/50',
  },
  'VIRUSOLOGIE': {
    icon: Microscope,
    accent: 'text-purple-300/70',
    accentDim: 'text-purple-400/40',
    border: 'border-purple-400/10',
    hoverBg: 'hover:bg-purple-400/5',
    badge: 'bg-purple-400/10 text-purple-300/70 ring-purple-400/15',
    indicator: 'bg-purple-400/50',
  },
  'PARAZITOLOGIE': {
    icon: Worm,
    accent: 'text-orange-300/70',
    accentDim: 'text-orange-400/40',
    border: 'border-orange-400/10',
    hoverBg: 'hover:bg-orange-400/5',
    badge: 'bg-orange-400/10 text-orange-300/70 ring-orange-400/15',
    indicator: 'bg-orange-400/50',
  },
}

const defaultConfig = {
  icon: FileText,
  accent: 'text-slate-400/70',
  accentDim: 'text-slate-400/40',
  border: 'border-slate-400/10',
  hoverBg: 'hover:bg-slate-400/5',
  badge: 'bg-slate-400/10 text-slate-400/70 ring-slate-400/15',
  indicator: 'bg-slate-400/50',
}

export default function SubiectePage(): React.JSX.Element {
  const data = subiecteData as SpecialityData[]

  const totalCards = data.reduce(
    (sum, spec) => sum + spec.subjects.reduce((s, subj) => s + subj.flashcards.length, 0),
    0
  )
  const totalSubjects = data.reduce((sum, spec) => sum + spec.subjects.length, 0)

  return (
    <div className="min-h-screen bg-[#0C1118]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700/40 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-200 tracking-tight">
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
          <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-700/40 border border-slate-600/30 flex items-center justify-center">
                <Shuffle className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300">Mod Seamless</p>
                <p className="text-[10px] text-gray-500">Întrebări random, fără oprire — doar tap-tap-tap</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
          </div>
        </Link>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-3 mb-10">
          {data.map((speciality, specIdx) => {
            const config = specialityConfig[speciality.name] || defaultConfig
            const Icon = config.icon
            const specCards = speciality.subjects.reduce((s, subj) => s + subj.flashcards.length, 0)
            return (
              <div key={specIdx} className="bg-[#111820] border border-gray-800/40 rounded-lg p-3 text-center">
                <Icon className={`w-4 h-4 ${config.accent} mx-auto mb-1.5`} />
                <p className="text-lg font-bold text-gray-300 tabular-nums">{specCards}</p>
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
              <section key={specIdx} className="bg-[#111820] border border-gray-800/40 rounded-xl overflow-hidden">
                {/* Speciality Header */}
                <div className="px-5 py-4 border-b border-gray-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${config.indicator}`} />
                    <Icon className={`w-4 h-4 ${config.accent}`} />
                    <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
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
                <div className="divide-y divide-gray-800/30">
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
                        <span className="text-sm text-gray-400 truncate group-hover:text-gray-200 transition-colors">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-gray-700" />
                          <span className="text-xs text-gray-500 tabular-nums">
                            {subject.flashcards.length}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-500 transition-colors" />
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
