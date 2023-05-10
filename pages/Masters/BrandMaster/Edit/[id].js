import React from "react";
import { useRouter } from 'next/router'
import BrandMasterForm from '../new'


function BrandMaster() {

    const router = useRouter()
    const { id } = router.query

    return (
        <BrandMasterForm editData={{ id }} />
    );
}

export default BrandMaster;
