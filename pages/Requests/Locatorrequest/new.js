import Layout from "@/components/layout/layout"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import styles from '@/../../styles/Locatorrequest.module.css'
import { apiService } from "@/services/api.service";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const Locatorrequest = () => {
    const { register, handleSubmit, reset, formState } = useForm();
    const router = useRouter();
    const { errors } = formState;

    const [StaffID, setUserID] = useState()
    const [filePath, setFilePath] = useState();

    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);

    }, []);

    async function onSubmit(data) {
        let entity = {
            "Attachment": ""
        }
        debugger;
        try {
            const formData = { ...data, StaffID, ...entity };
            // console.log("form data", formData);
            await apiService.commonPostCall("Payroll/InsertLocatorTable", formData);
            Swal.fire('Data Inserted successfully')
            console.log("Inserted data", formData);
            router.push("/Requests/Locatorrequest")
        } catch (error) {
            Swal.fire("Insert is not working");
        }

    }
    const onDrop = useCallback((acceptedFiles) => {
        debugger;
        console.log(acceptedFiles, "Uploaded file");
        uploadFile(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const uploadFile = async (data) => {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        const formData = new FormData();
        formData.append("file_upload", data[0], data[0].name);
        let res = await apiService.commonPostCall("Payroll/ProjectAttachments",
            formData
        );
        console.log(res, "File Path");
        Swal.fire("Uploaded successfully");
        setFilePath(res.data);
    };
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
        },
        errorMsg: {
            fontSize: "12px",
            fontWeight: "500",
            color: "red",
        },
        inputLabel: {
            fontSize: "16px",
        },
    };
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
                                {errors.Date && <p className="error-message"style={customStyles.errorMsg}>{errors.Date.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Task<span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" placeholder="Task" {...register('Task', { required: "This field is required" , pattern: /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/})} />
                                <div className="error-message"style={customStyles.errorMsg}>
                                {errors.Task && <p  >{errors.Task.message}</p>}
                                {errors.Task?.type==='pattern' && "characters only"}
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Start Time<span style={{ color: "red" }}>*</span></label>
                                <input type="time" className="form-control" {...register('StartTime', { required: "This field is required" })} />
                                {errors.StartTime && <p className="error-message" style={customStyles.errorMsg}>{errors.StartTime.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>End Time<span style={{ color: "red" }}>*</span></label>
                                <input type="time" className="form-control" {...register('EndTime', { required: "This field is required" })} />
                                {errors.EndTime && <p className="error-message" style={customStyles.errorMsg}>{errors.EndTime.message}</p>}
                            </div>
                            <div className="col-lg-2">
                                <label htmlFor="" className={styles.p}>Comments<span style={{ color: "red" }}>*</span></label>
                                <input type="text" className="form-control" placeholder="Comments"  minLength={10}  {...register('Comments', { required: "This field is required" })} />
                                {errors.Comments && <p className="error-message" style={customStyles.errorMsg}>{errors.Comments.message}</p>}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-3">
                                <label htmlFor="" className={styles.p}> Attachment</label>
                                <div style={{ border: '2px dashed blue', height: "100px" }}>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} 
                                        {...register('Dropzone', { required: "This field is required" })}/>
                                        {isDragActive ? (
                                            <p>Drop the files here ...</p>
                                        ) : (
                                            <p style={{ marginTop: "30px", textAlign: "center" }}>
                                                Drop the files here ...
                                            </p>
                                        )}
                                    </div>
                                </div> {errors.Dropzone && <p className="error-message" style={customStyles.errorMsg}>{errors.Dropzone.message}</p>}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href="/Requests/Locatorrequest"><button className='submit-button'>Cancel</button></Link> &nbsp;
                            </div>
                            <div className="col-lg-2" style={{ float: "right" }}>
                                <button className='submit-button'>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default Locatorrequest;
