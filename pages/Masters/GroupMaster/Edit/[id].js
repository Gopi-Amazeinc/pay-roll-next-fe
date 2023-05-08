import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../../../components/layout/layout';
import Styles from '../../../../styles/groupMasterForm.module.css'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
function GroupMasterForm() {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const router = useRouter()
    const { id } = router.query 
    async function onSubmit(data) {
        
            await axios.post(hostURL + "Master/UpdateGroupMaster", data);  //naveen.th@amazeinc.in, Update API for group master, to update existing data
            Swal.fire('Updated Successfully');
            location.href = "/Masters/GroupMaster";
    }

    const getData = async () =>{
        if (id) {
            let response = await axios.get(hostURL + "Master/GetGroupMasterByID?ID=" + id);
            clearForm(response.data[0]);
        }
        else {
            clearForm();
        }
    }
    useEffect(() => {
        getData()
    }, []);

    function clearForm(existingData = null) {
        let etty = {
            "ID": existingData ? existingData.id : "",
            "Short": existingData ? existingData.short : "",
            "Description": existingData ? existingData.description : "",
        }
        reset(etty);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%'
        },
        errorMsg: {
            fontSize: '12px',
            fontWeight: '500',
            color: 'red'
        },
        inputLabel: {
            fontSize: '16px'
        }
    };

    return (
        <Layout>
            <p className='Heading'>Group Master</p>
            <div className="container">
                <div className="card p-4 border-0 rounded-3 mt-3 mx-0">
                    <div className="row ">
                        <div className="col-lg-4" >
                            <label id={Styles.label}>Name<span id={Styles.asterisk}>* </span></label>
                        </div>
                        <div className="col-lg-4" >
                            <label id={Styles.label}>Description<span id={Styles.asterisk}>* </span></label>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Short Name"
                                />
                                <div>
                                    {errors.Short && (
                                        <span style={customStyles.errorMsg}>
                                            Please enter name
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <textarea
                                    name="Description"
                                    className="form-control"
                                    {...register("Description", { required: true })}
                                    placeholder="Description"
                                />
                                <div>
                                    {errors.Description && (
                                        <span style={customStyles.errorMsg}>
                                            Please enter description
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row ">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2">
                                <Link href='/Masters/GroupMaster'><button
                                    type="button"
                                    className="AddButton"
                                >
                                    Close
                                </button></Link>
                            </div>
                        
                            <div className='col-lg-2'>
                                
                                    <button type="submit" className="AddButton" >
                                        Update
                                    </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default GroupMasterForm