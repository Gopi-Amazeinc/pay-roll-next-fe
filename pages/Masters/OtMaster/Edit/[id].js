import Otmaster from '../new';
import { useRouter } from 'next/router'
function OtmasterEdit() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Otmaster editData={{ id }} />
  );
}

export default OtmasterEdit;
