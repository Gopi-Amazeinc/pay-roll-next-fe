import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import InitialPayroll from '@/components/Dashboard/Payroll/InitialPayroll'
const index = () => {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL

    const [intialPayroll, setInitialPayroll] = useState([]);

    const getInitialPayroll = async () => {
        const { data } = await axios.get(hostURL + "Payroll/GetPreliminarySalary") //gurukiran@amazeinc.in, this API is to fetch the data into the table
        setInitialPayroll(data);
    }
    useEffect(() => {
        getInitialPayroll();
    }, [])
    return (
        <InitialPayroll></InitialPayroll>
    )
}

export default index