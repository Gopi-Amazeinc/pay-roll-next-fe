import StateMasterForm from '../new';
import { useRouter } from 'next/router'
function StateMaster() {

  const router = useRouter()
  const { id } = router.query

  return (
    <StateMasterForm editData={{ id }} />
  );
}

export default StateMaster;
