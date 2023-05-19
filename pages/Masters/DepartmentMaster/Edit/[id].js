import DepartmentMasterForm from '../new'
import { useRouter } from 'next/router'
const DepartmentMaster = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <DepartmentMasterForm editData={{ id }} />
    )
}

export default DepartmentMaster