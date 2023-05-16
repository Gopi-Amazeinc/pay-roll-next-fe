import React from 'react'
// import Layout from '../../../../components/layout/layout'
import Layout from '@/components/layout/layout'
import { useRouter } from "next/router";
import Companyform from "@/pages/Company/companyform";


function CompanyID() {
 const router = useRouter();
  const { id } = router.query;

return(
    <>
    <Companyform editData={{ id }} />;

    </>
);

    
}

export default CompanyID;