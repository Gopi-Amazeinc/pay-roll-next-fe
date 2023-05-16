import React from 'react'
// import Layout from '../../../../components/layout/layout'
import Layout from '@/components/layout/layout'
import { useRouter } from "next/router";
import Holidayform from "@/pages/Holiday/holidayform";


function HolidayID() {
 const router = useRouter();
  const { id } = router.query;

return(
    <>
    <Holidayform editData={{ id }} />;

    </>
);

    
}

export default HolidayID;



