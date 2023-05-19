import React from 'react';
import Layout from '@/components/layout/layout.js'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import CompanyShiftDetails from '/components/Dashboard/Attendance/CompanyWeeklyShift'

const Index = () => {


    return (
        <Layout>
            <CompanyShiftDetails></CompanyShiftDetails>

        </Layout >
    );
}

export default Index;
