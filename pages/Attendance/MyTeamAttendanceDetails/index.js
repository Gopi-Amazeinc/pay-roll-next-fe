import React from 'react';
import AttendanceDetails from '@/components/Dashboard/Attendance/MyTeamAttendanceDetails';
import Layout from '@/components/layout/layout.js'

const Index = () => {
    return (
        <Layout>
        <div>
            <AttendanceDetails></AttendanceDetails>
            
        </div>
        </Layout>
    );
}

export default Index;
