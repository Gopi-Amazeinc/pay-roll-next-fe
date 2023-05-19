import CountryMasterForm from '../new';
import { useRouter } from 'next/router'

function CountryMaster() {

    const router = useRouter()
    const { id } = router.query
    return (
        <CountryMasterForm editData={{ id }} />
    );
}

export default CountryMaster;
