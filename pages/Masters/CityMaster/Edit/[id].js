
import { useRouter } from "next/router";
import CityMasterForm from "../new";

function CityMaster() {

    const router = useRouter()
    const { id } = router.query
    
    return (
        <CityMasterForm editData={{id}} />
    );
}

export default CityMaster;
