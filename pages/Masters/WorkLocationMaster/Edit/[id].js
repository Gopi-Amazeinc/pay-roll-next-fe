import WorkLocationMasterForm from '../new'
import { useRouter } from 'next/router'

function WorkLocationMaster() {
  const router = useRouter()
  const { id } = router.query
  return (
    <WorkLocationMasterForm editData={{ id }} />
  )
}

export default WorkLocationMaster