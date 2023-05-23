import React, { useState } from 'react'
import Layout from "@/components/layout/layout.js";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from 'sweetalert2';
import Link from 'next/link';

function Announcementform() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [filePath, setFilePath] = useState();
    const onDrop = useCallback((acceptedFiles) => {
        debugger;
        console.log(acceptedFiles, "Uploaded file");
        uploadFile(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const uploadFile = async (data) => {
        const formData = new FormData();
        formData.append("file_upload", data[0], data[0].name);

        Swal.fire("Uploaded successfully");
        
    };

    const submit = (data) => {
        alert(JSON.stringify(data))
    }

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
                                        <label className='fw-bold'>Annoucement <i className='text-danger'>*</i></label>
                                        <input type='text' className='form-control' placeholder='Announcement Name' {...register("announcement", { required: true })} />
                                        {errors.announcement && (
                                            <p className='text-danger'>Please enter announcement name</p>
                                        )}
                                    </div>

                                    <div className='col-lg-3'>
                                        <label className='fw-bold'>Annoucement Description <i className='text-danger'>*</i></label>
                                        <textarea className='form-control' placeholder='Announcement Description' {...register("description", { required: true })} />
                                        {errors.description && (
                                            <p className='text-danger'>Please enter announcement description</p>
                                        )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Annoucement Date <i className='text-danger'>*</i></label>
                                        <input type='date' className='form-control' placeholder='Announcement Date' {...register("date", { required: true })} />
                                        {errors.date && (
                                            <p className='text-danger'>Please enter announcement date</p>
                                        )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Annoucement Time <i className='text-danger'>*</i></label>
                                        <input type='time' className='form-control' placeholder='Announcement Time' {...register("time", { required: true })} />
                                        {errors.time && (
                                            <p className='text-danger'>Please enter announcement time</p>
                                        )}
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Venue <i className='text-danger'>*</i></label>
                                        <input type='text' className='form-control' placeholder='Announcement Venue' {...register("venue", { required: true })} />
                                        {errors.venue && (
                                            <p className='text-danger'>Please enter announcement venue</p>
                                        )}
                                        <br />
                                        <br />
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>Attachment <i className='text-danger'>*</i></label>
                                        <div style={{ border: '2px dashed black', padding: '10%' }}>
                                            <div {...getRootProps()}>
                                                <input  {...register("attachment", { required: true })} {...getInputProps()} />
                                                {isDragActive ? (
                                                    <p>Drop the files here</p>
                                                ) : (
                                                    <p>
                                                        Drop the files here
                                                    </p>
                                                )}
                                            </div>
                                            {errors.attachment && (
                                                <p className='text-danger'>Please upload valid file</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='col-lg-2'>
                                        <label className='fw-bold'>City</label>
                                        <select className='form-select'>
                                            <option>Select City</option>
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
