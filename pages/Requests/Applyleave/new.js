import Layout from "@/components/layout/layout"
import Link from "next/link";
import ApplyLeaveDashboard from '@/components/Dashboard/Requests/Applyleave/index';

// import Astyle from 'styles//Requests//applyleave.module.css';
import { BsArrowLeftSquare } from 'react-icons/bs'
import DropZone from "@/pages/SharedComponent/dropzone";
export default function ApplyLeave() {
    return (
        <Layout>
            <Link href="/Requests/leavelistdashboard" > <BsArrowLeftSquare /> Leave</Link >
            <div className='card p-3 border-0 shadow-lg  mt-4'>
                <div className='row'>
                    <div className="col-lg-12">
                        <h3 >Leave Requests</h3>
                        <hr />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Leave Type<i className='text-danger'>*</i> </label>
                        <select className="form-control" >
                            <option value="" disabled>select Leave Type</option>
                            <option value="" > Leave Type</option>
                            <option value="" > Leave Type1</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Leave Reason<i className='text-danger'>*</i> </label>
                        <textarea cols="20" rows="1" className="form-control" placeholder="Leave Reason"></textarea>
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Start Date<i className='text-danger'>*</i></label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">End Date<i className='text-danger'>*</i></label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-lg-2">
                        <label htmlFor="">Covering Staff <i className='text-danger'>*</i></label>
                        <input type="text" className="form-control" placeholder="Covering Staff" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <label htmlFor="">Attachment</label>
                        <div className="col-lg-2">
                            <DropZone />

                        </div>
                    </div>
                    <div className="col-lg-10">
                        <button className="submit-button">SAVE</button>
                       <Link href="/Requests/leavelistdashboard"><button className="close-button">CANCEL</button></Link>
                    </div>
                </div>
            </div><br />
            <ApplyLeaveDashboard></ApplyLeaveDashboard>
            
        </Layout>
    )
}