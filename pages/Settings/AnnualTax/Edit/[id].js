
import { useRouter } from 'next/router'
import AnnualTaxForm from '../new'

function AnnualTaxID() {
    const router = useRouter()
    const { id } = router.query
    return (
        <AnnualTaxForm editData={{ id }} />
    )
    }


export default AnnualTaxID
