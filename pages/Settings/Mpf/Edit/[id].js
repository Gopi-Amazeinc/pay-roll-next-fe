
import { useRouter } from 'next/router'
import MpfForm from '../new'

function MpfFormId() {

  const router = useRouter()
  const { id } = router.query
  return (
      <MpfForm editData={{ id }} />
  )
  
}

export default MpfFormId