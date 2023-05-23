import Layout from "@/components/layout/layout"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import styles from '@/../../styles/Locatorrequest.module.css'
import { apiService } from "@/services/api.service";

const Locatorrequest = () => {
    const { register, handleSubmit, reset, formState } = useForm();
    const router = useRouter();
    const { errors } = formState;

    const [StaffID, setUserID] = useState()

    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);

    }, []);

    async function onSubmit(data) {
        let entity ={
            "Attachment" : ""
        }
        debugger;
        try {
            const formData = { ...data, StaffID,...entity };
            // console.log("form data", formData);
            await apiService.commonPostCall("Payroll/InsertLocatorTable", formData);
            Swal.fire('Data Inserted successfully')
            console.log("Inserted data", formData);
            router.push("/Requests/Locatorrequest")
        } catch (error) {
            Swal.fire("Insert is not working");
        }

    }
    return (
        <Layout>
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="Heading">Add Obasis</h3><br />
                    <form onSubmit={handleSubmit(onSubmit)} className='card p-3 border-0 rounded-3'>
                        <div className="row ">
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Date<span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" {...register('Date', { required: "This field is required" })} />
                                {errors.Date && <p className="error-message" style={{ color: "red" }}>{errors.Date.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Task<span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" placeholder="Task" {...register('Task', { required: "This field is required" })} />
                                {errors.Task && <p className="error-message" style={{ color: "red" }}>{errors.Task.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Start Time<span style={{ color: "red" }}>*</span></label>
                                <input type="time" className="form-control" {...register('StartTime', { required: "This field is required" })} />
                                {errors.StartTime && <p className="error-message" style={{ color: "red" }}>{errors.StartTime.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>End Time<span style={{ color: "red" }}>*</span></label>
                                <input type="time" className="form-control" {...register('EndTime', { required: "This field is required" })} />
                                {errors.EndTime && <p className="error-message" style={{ color: "red" }}>{errors.EndTime.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Comments<span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" placeholder="Comments" {...register('Comments', { required: "This field is required" })} />
                                {errors.Comments && <p className="error-message" style={{ color: "red" }}>{errors.Comments.message}</p>}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-3">
                                <label htmlFor="" className={styles.p}> Attachment</label>
                                <input type="file" className="form-control" {...register('Attachment')} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href="/Requests/Locatorrequest"><button className='submit-button'>CANCEL</button></Link> &nbsp;
                            </div>
                            <div className="col-lg-2" style={{ float: "right" }}>
                                <button className='submit-button'>SAVE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default Locatorrequest;
