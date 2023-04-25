import Locatordashboard from "@/components/Dashboard/Requests/Locatorrequest";
import Layout from "@/components/layout/layout"
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';


const Locatorrequest = () => {
    return (
        <Layout>

            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-3'>
                        <p>From Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-3'>
                        <p>To Date</p>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-lg-4'><br /><p></p>
                        <input type="text" className='form-control' placeholder="Search For date ,or Status" />
                    </div>
                </div>
            </div>
            <br></br>
            <Locatordashboard></Locatordashboard>
        </Layout>
    )
}
export default Locatorrequest;
