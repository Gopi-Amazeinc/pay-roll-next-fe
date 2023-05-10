import LeaveTypeForm from '../new'
import { useRouter } from 'next/router'

function LeaveType() {

    const router = useRouter()
    const { id } = router.query

    return (
        <LeaveTypeForm editData={{ id }} />
    )
}

export default LeaveType;