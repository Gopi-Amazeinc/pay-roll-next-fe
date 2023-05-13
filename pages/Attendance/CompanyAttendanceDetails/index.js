import React from 'react';
import CompanyAttendanceDetails  from '@/components/Dashboard/Attendance/CompanyAttendanceDetails';
import Layout from '@/components/layout/layout.js'
const Index = () => {
    return (
        <Layout>
        <div>
            <CompanyAttendanceDetails></CompanyAttendanceDetails>
        </div>
        </Layout>
    );
}

export default Index;
