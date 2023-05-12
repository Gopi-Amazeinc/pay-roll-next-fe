import SubSectionMasterForm from '../new';
import { useRouter } from 'next/router'

const SubSectionMaster = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <SubSectionMasterForm editData={{ id }} />
  );
};

export default SubSectionMaster;
