import LevelTypeForm from '../new'
import { useRouter } from 'next/router'
function LevelType() {

    const router = useRouter()
    const { id } = router.query

    return (
        <LevelTypeForm editData={{ id }} />
    )
}

export default LevelType