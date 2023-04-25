import { useEffect, useState } from 'react'
import React from 'react'
import Layout from '@/components/layout/layout'
import InitialPayroll from '@/components/Dashboard/Payroll/InitialPayrollDetails'
import axios from 'axios'
const Index = () => {
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
        <Layout>
            <InitialPayroll></InitialPayroll>
        </Layout>
    )
}

export default Index