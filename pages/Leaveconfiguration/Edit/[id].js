import { useRouter } from "next/router";
import React from 'react'

import LeaveConfigurationForm from "@/pages/Leaveconfiguration/form";

const LeaveConfigurationEdit = () => {
   const router = useRouter();
   const { id } = router.query;

  return (
     <LeaveConfigurationForm editData={{ id }}/>
  )
};

export default LeaveConfigurationEdit






