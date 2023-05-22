
import { useRouter } from 'next/router'
import SemiMonthlyTaxForm from '../new'
function SemiMonthlyTaxFormId(){
  const router = useRouter()
  const { id } = router.query
  return (
      <SemiMonthlyTaxForm editData={{ id }} />
  )
  }

export default SemiMonthlyTaxFormId
   