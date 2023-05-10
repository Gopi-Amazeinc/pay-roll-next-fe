import { useRouter } from "next/router";
import AddStaffSalaryForm from "@/pages/Staff/StaffSalary/new";

const StaffSalaryEdit = () => {
   const router = useRouter();
   const { id } = router.query;

  return (
     <AddStaffSalaryForm editData={{ id }}/>
  )
};

export default StaffSalaryEdit
