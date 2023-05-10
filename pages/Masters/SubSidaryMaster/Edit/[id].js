import SubsidaryMasterForm from '../new'
import { useRouter } from 'next/router'

export default function SubsidaryMaster() {

  const router = useRouter()
  const { id } = router.query
  return (
    <SubsidaryMasterForm editData={{ id }} />
  )
}

