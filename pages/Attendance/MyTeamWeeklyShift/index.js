import React from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import MyTeamWeeklyShift from '/components/Dashboard/Attendance/MyTeamWeeklyShift'

const Index = () => {


    return (
        <Layout>
            <MyTeamWeeklyShift></MyTeamWeeklyShift>

        </Layout >
    );
}

export default Index;
