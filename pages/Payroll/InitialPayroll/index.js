import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import Layout from '@/components/layout/layout'
import InitialPayroll from '@/components/Dashboard/Payroll/InitialPayrollDetails'
const Index = () => {

    return (
        <Layout>
            <InitialPayroll></InitialPayroll>
        </Layout>
    )
}

export default Index