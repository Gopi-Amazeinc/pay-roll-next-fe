import React from 'react';
import Layout from "@/components/layout/layout";
import Dropzone from "..//../SharedComponent/dropzone"
import Link from 'next/link';


const Index = () => {
    return (
        <Layout>
            <h3>Vaccination Details</h3>
            <div className="card">
                <div className="row">

                    <div className="col-lg-2">
                        <label htmlFor="">Vaccination Name*  </label>
                        <input type="text" className='form-control' /> <br />

                        <label htmlFor="">Booster Date*  </label>
                        <input type="date" className='form-control' />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">First Dose Date*   </label>
                        <input type="text" className='form-control' /> <br />

                        <label htmlFor="">First Dose Certificate*</label>
                        <Dropzone />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Second Dose Date* </label>
                        <input type="text" className='form-control' /> <br />

                        <label htmlFor="">Second Dose Certificate*  </label>
                        <Dropzone />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Booster Name*   </label>
                        <input type="text" className='form-control' /><br />
                        <label htmlFor="">Booster Certificate* </label>
                        <Dropzone />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link href="#"><button className='button' >Submit</button></Link>


                    </div>
                    <div className="col-lg-2">
                        <Link href="/Home/dashboard"><button className='button' >Cancel</button></Link>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default Index;
