
import { useRouter } from 'next/router'

import SSSForm from '../new';
function SSSFormId(){
  const router = useRouter()
  const { id } = router.query
  return (
      <SSSForm editData={{ id }} />
  )
  }

export default SSSFormId