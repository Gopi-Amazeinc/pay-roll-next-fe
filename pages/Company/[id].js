import React from 'react';
import { useRouter } from 'next/router'
import Companyform from "@/pages/Company/companyform";


function companyid(){
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Companyform editData={{ id }} />;

        </>

    );
}

export default companyid;