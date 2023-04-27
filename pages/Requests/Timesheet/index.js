import React from 'react'
import TimeSheetDashboard from "@/components/Dashboard/Requests/Timesheet/index"
import Layout from '@/components/layout/layout'

const Index = () => {
    return (
        <div>
            <Layout>
                <TimeSheetDashboard></TimeSheetDashboard>
            </Layout>
        </div>
    )
}

export default Index