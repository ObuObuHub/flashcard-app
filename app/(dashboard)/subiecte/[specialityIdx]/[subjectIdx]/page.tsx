import { notFound } from 'next/navigation'
import subiecteData from '@/data/subiecte-primariat.json'
import { SubjectStudyClient } from '@/components/subject-study-client'

interface SubjectData {
  name: string
  flashcards: { front: string; back: string }[]
}

interface SpecialityData {
  name: string
  subjects: SubjectData[]
}

interface PageProps {
  params: Promise<{
    specialityIdx: string
    subjectIdx: string
  }>
}

export default async function SubjectStudyPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { specialityIdx, subjectIdx } = await params
  const specIdx = parseInt(specialityIdx, 10)
  const subjIdx = parseInt(subjectIdx, 10)

  const data = subiecteData as SpecialityData[]

  if (isNaN(specIdx) || isNaN(subjIdx) || !data[specIdx] || !data[specIdx].subjects[subjIdx]) {
    notFound()
  }

  const speciality = data[specIdx]
  const subject = speciality.subjects[subjIdx]

  // Calculate next subject URL (within same speciality, or first of next speciality)
  let nextSubjectUrl: string | null = null
  let nextSubjectName: string | null = null

  if (subjIdx + 1 < speciality.subjects.length) {
    // Next subject in same speciality
    nextSubjectUrl = `/subiecte/${specIdx}/${subjIdx + 1}`
    nextSubjectName = speciality.subjects[subjIdx + 1].name
  } else if (specIdx + 1 < data.length) {
    // First subject of next speciality
    nextSubjectUrl = `/subiecte/${specIdx + 1}/0`
    nextSubjectName = `${data[specIdx + 1].name} — ${data[specIdx + 1].subjects[0].name}`
  }

  return (
    <SubjectStudyClient
      specialityName={speciality.name}
      subjectName={subject.name}
      flashcards={subject.flashcards}
      backUrl="/subiecte"
      nextSubjectUrl={nextSubjectUrl}
      nextSubjectName={nextSubjectName}
    />
  )
}
