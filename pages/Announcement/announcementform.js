import React, { useState, useEffect } from 'react'
import Layout from "@/components/layout/layout.js";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from 'sweetalert2';
import Link from 'next/link';
// import useRouter from 'next/router';
import { useRouter } from 'next/router';
import { apiService } from "@/services/api.service";
import axios from 'axios';

function Announcementform({ editData }) {


    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();
    const [filePath, setFilePath] = useState();
    const [fileName, setFileName] = useState();
    const [actionType, setActionType] = useState("insert");
    const router = useRouter();


    useEffect(() => {
        const { id } = editData || {};
        if (id) {
            getAnnouncementByID(id);
        } else {
            clearForm();
        }
    }, []);



    const getAnnouncementByID = async (id) => {
        const res = await apiService.commonGetCall("Payroll/GetAnnouncementsByID?ID=" + id);
        clearForm(res.data[0]);
    };


    function clearForm(AnnounceData = null) {
        debugger;
        let details = {
            "ID": AnnounceData ? AnnounceData.id : "",
            "Name": AnnounceData ? AnnounceData.name : "",
            "Description": AnnounceData ? AnnounceData.description : "",
            "DateTime": AnnounceData ? AnnounceData.dateTime : "",
            "Venue": AnnounceData ? AnnounceData.time : "",
            "Time": AnnounceData ? AnnounceData.venue : "",
            "Attachment": AnnounceData ? AnnounceData.attachment : "",
            "BuildingID": AnnounceData ? AnnounceData.buildingID : ""
            
        };
        reset(details);
        setActionType(AnnounceData ? "update" : "insert");
    }


    const submit = async (data) => {
        debugger
        if (actionType == "insert") {
            let entity={
                "Attachment":filePath
            }
            const formData={...data, ...entity}
            await apiService.commonPostCall("Payroll/InsertAnnouncement", formData);
            Swal.fire("Data Inserted successfully");
            console.log("Insertde data", data)
            router.push("/Announcement");
        } else {
            const formData={...data, ...entity}
            await apiService.commonPostCall("Payroll/UpdateAnnouncement", formData);
            Swal.fire("Data Updated successfully");
            router.push("/Announcement");
        }
    };




    const onDrop = useCallback((acceptedFiles) => {
        debugger;
        console.log(acceptedFiles, "Uploaded file");
        uploadFile(acceptedFiles);
      }, []);
      
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
      const uploadFile = async (data) => {
        debugger
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        const formData = new FormData();
        formData.append("file_upload", data[0], data[0].name);
        setFileName(data[0].name)
        console.log(data[0].name)
        let invoiceURL = await axios.post(
          hostURL + "Payroll/ProjectAttachments",
          formData
        );
        // console.log(res, "File Path");
        // Swal.fire("Uploaded successfully");
        // setFilePath(res.data);
    
        // TODO: Gopi's code for validation
        let environmentVariable = "https://103.12.1.103";
    
        let imagePath = invoiceURL.data.split("\\", 1);
        let Preview = invoiceURL.data.replace(imagePath, environmentVariable);
        Swal.fire('Uploaded successfully.');
        // setFilePath(invoiceURL.data);
        setFilePath(Preview);
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
    }


    // const submit = (data) => {
    //     alert(JSON.stringify(data))
    // }

    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <p className='Heading'>Announcement Form</p>
                        <div className='card rounded-3 p-3 border-0'>
                            <form onSubmit={handleSubmit(submit)}>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Announcement <i className='text-danger'>*</i></label>
                                        <input className='form-control' placeholder='Announcement Name' {...register("Name", {
                                            required: true,
                                            maxLength: 100,
                                            pattern: /^[A-Za-z]+$/i
                                        })} /><div  style={customStyles.errorMsg}>
                                            {errors.Name?.type === 'required' &&
                                                " Please enter announcement name"
                                            }
                                            {errors.Name?.type === "maxLength" &&
                                                "name cannot exceed 20 characters"
                                            }
                                            {errors.Name?.type === "pattern" &&
                                                "Alphabetical characters only"
                                            }
                                        </div>
                                    </div>

                                    <div className='col-lg-3'>
                                        <label className='fw-bold'>Annoucement Description <i className='text-danger'>*</i></label>
                                        <textarea className='form-control' placeholder='Announcement Description'minLength={10} {...register('Description', { required: "Please add a description", pattern: { value: /^[A-Za-z0-9 ]+$/, message: "Please enter a valid Short Name" } })} />
                                        {errors.Description && <p  style={customStyles.errorMsg}>{errors.Description.message}</p>}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Annoucement Date <i className='text-danger'>*</i></label>
                                        <input type='date' className='form-control' placeholder='Announcement Date' {...register("DateTime", { required: true })} />
                                        {errors.DateTime && (
                                            <p  style={customStyles.errorMsg}>Please enter announcement date</p>
                                        )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Annoucement Time <i className='text-danger'>*</i></label>
                                        <input type='time' className='form-control' placeholder='Announcement Time' {...register("Time", { required: true })} />
                                        {errors.Time && (
                                            <p className='text-danger' style={customStyles.errorMsg}>Please enter announcement time</p>
                                        )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Venue <i className='text-danger'>*</i></label>
                                        <input type='text' className='form-control' placeholder='Announcement Venue' {...register("venue", { required: true })} />
                                        {errors.venue && (
                                            <p style={customStyles.errorMsg}>Please enter announcement venue</p>
                                        )}
                                        <br />
                                        <br />
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Attachment <i className='text-danger'>*</i></label>
                                        <div style={{ border: '2px dashed black' }}>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                {isDragActive ? (
                                                    <p>Drop the files here ...</p>
                                                ) : (
                                                    <p style={{ padding: "6%" }}>
                                                    {
                                                      filePath == null && (
                                                        <p>Drag 'n' drop some files here, or click to select
                                                          files</p>
                                                      )
                                                    }
                                                    {
                                                      filePath && (
                                                        <p>{fileName}</p>
                                                      )
                                                    }
                                                  </p>
                                                )}
                                            </div>
                                        </div>
                                        {errors.Attachment && (<p style={customStyles.errorMsg}>Please enter announcement Attachment</p> )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>City</label>
                                        <select className='form-select' >
                                            <option>Select City</option>
                                            <option>Banglore</option>
                                            <option>Mysore</option>
                                            <option>Monday</option>
                                            <option>Hasan</option>
                                            <option>Haveri</option>
                                            <option>Vijayapura</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Annoucement Number</label>
                                        <select className='form-select' {...register("BuildingID", { required: true })}>
                                            <option>Annoucement Number</option>
                                            <option>57</option>

                                        </select>
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col-lg-8'></div>
                                    <div className='col-lg-2'>
                                        <Link href="/Announcement">
                                            <button className='AddButton'>Cancel</button>
                                        </Link>
                                    </div>
                                    <div className='col-lg-2'>
                                        <button type='submit' className='AddButton'>Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Announcementform
