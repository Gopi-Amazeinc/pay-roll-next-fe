import GroupMasterForm from '../new';
import { useRouter } from 'next/router'
function GroupMaster() {
    const router = useRouter()
    const { id } = router.query
    return (
        <GroupMasterForm editData={{ id }} />
    );
}

export default GroupMaster