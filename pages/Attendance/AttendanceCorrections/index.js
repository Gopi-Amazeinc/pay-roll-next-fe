import React from 'react'
import AttendanceCorrection from '@/components/Dashboard/Attendance/AttendanceCorrections';
import Layout from '@/components/layout/layout.js'

const AttendanceCorrectionForm = () => {
    return (
        <Layout>
        <div>
            <AttendanceCorrection></AttendanceCorrection>
        </div>
        </Layout>
    )
}
export default AttendanceCorrectionForm;