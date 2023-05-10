import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Layout from '../../../../components/layout/layout'
import axios from 'axios';
import DivDivisionMaster from '../new';
import { useRouter } from 'next/router'


function DivDivisionMasterEdit() {
    const router = useRouter()
    const { id } = router.query

    return (
        <DivDivisionMaster editData={{ id }} />
    )
}

export default DivDivisionMasterEdit;

