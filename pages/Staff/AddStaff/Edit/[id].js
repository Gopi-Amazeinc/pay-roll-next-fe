import { useRouter } from "next/router";
import StepperForms from "../index"


const StaffEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    
  
    return( 
        <>
    <StepperForms editData={{ id }} />
    </>
    );
  };
  export default StaffEdit;