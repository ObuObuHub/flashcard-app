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

export default async function SubjectStudyPage({ params }: PageProps) {
  const { specialityIdx, subjectIdx } = await params
  const specIdx = parseInt(specialityIdx, 10)
  const subjIdx = parseInt(subjectIdx, 10)

  const data = subiecteData as SpecialityData[]

  if (isNaN(specIdx) || isNaN(subjIdx) || !data[specIdx] || !data[specIdx].subjects[subjIdx]) {
    notFound()
  }

  const speciality = data[specIdx]
  const subject = speciality.subjects[subjIdx]

  return (
    <SubjectStudyClient
      specialityName={speciality.name}
      subjectName={subject.name}
      flashcards={subject.flashcards}
      backUrl="/subiecte"
    />
  )
}
