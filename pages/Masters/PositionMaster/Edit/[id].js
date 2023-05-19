import PositionMasterDetails from '../new'
import { useRouter } from 'next/router'

const PositionMaster = () => {

  const router = useRouter()
  const { id } = router.query

  return (
    <PositionMasterDetails editData={{ id }} />
  )
}

export default PositionMaster