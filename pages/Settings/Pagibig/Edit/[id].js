
import { useRouter } from 'next/router'
import PagibigForm from '../new'
function PagibigID() {
    const router = useRouter()
    const { id } = router.query
    return (
        <PagibigForm editData={{ id }} />
    )
}

export default PagibigID
