import React from 'react';
import MyTeamAttendanceCorrection  from '@/components/Dashboard/Attendance/MyTeamAttendanceCorrection';
import Layout from '@/components/layout/layout.js'
const Index = () => {
    return (
        <Layout>
        <div>
            <MyTeamAttendanceCorrection></MyTeamAttendanceCorrection>
        </div>
        </Layout>
    );
}

export default Index;
