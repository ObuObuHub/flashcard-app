import subiecteData from '@/data/subiecte-primariat.json'
import { SeamlessStudyClient } from '@/components/seamless-study-client'

interface SubjectData {
  name: string
  flashcards: { front: string; back: string }[]
}

interface SpecialityData {
  name: string
  subjects: SubjectData[]
}

export default function SeamlessPage(): React.JSX.Element {
  const data = subiecteData as SpecialityData[]

  return <SeamlessStudyClient data={data} />
}
