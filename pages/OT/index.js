import React from 'react';
// import OvertimeDetails from '@/components/Dashboard/OT'
import Layout from '@/components/layout/layout'
import Overtimeunitsupload from '@/components/Dashboard/Attendance/OvertimeUnitsUpload'

const Myovertimedetails = () => {
    return (
        <div>
            <Layout>
            <Overtimeunitsupload></Overtimeunitsupload>
            {/* <OvertimeDetails></OvertimeDetails> */}
            </Layout>
        </div>
    );
}

export default Myovertimedetails;
