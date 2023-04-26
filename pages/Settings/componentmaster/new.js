import React from 'react'
import Styles from '../../../styles/ComponentMasterForm.module.css'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout.js';


function ComponentMasterForm() {

    // const validationSchema = Yup.object().shape({
    //     title: Yup.string()
    //         .required('Title is required'),

    //     ComponentMaster: Yup.string()
    //         .required('ComponentMaster is required')
    //         .min(6, 'ComponentMaster must be at least 6 characters'),



    // });
    // const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }
    return (
        <Layout>
        <div>
            <h5 className=' mt-4' id={Styles.h5}>Component Details</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id={Styles.card} className="card shadow-lg mt-1 p-2 rounded-4">
                    <div className="row ">
                        <div className="col-md-2">
                            <label>Name<span style={{ color: "red" }}>*</span></label>
                        </div>
                        <div className="col-md-4"><label>
                            Description
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        </div>
                    </div>
                    <div className="row  ">
                        <div className="col-md-2">

                            <input name="ComponentMaster" type="text" {...register('ComponentMaster', { required: true })} className={`form-control ${errors.ComponentMaster ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.ComponentMaster?.message}</div>


                        </div>
                        <div className="col-md-4">
                            <textarea rows="3" type="text" {...register('Description', { required: true })} placeholder="Description" name="Description" id={Styles.Placeholder}className={`form-control ${errors.Description ? 'is-invalid' : ''}`}></textarea>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-8">
                        </div>
                        <div className="col-lg-2">
                            <button id={Styles.saveButton} className=" btn btn-primary btn-sm form-control shadow-lg ">Save</button>
                        </div>
                        <div className="col-lg-2">
                            <Link href="/Settings/componentmaster"><button id={Styles.cancelButton} className=" btn btn-primary btn-sm form-control shadow-lg">Cancel</button></Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </Layout>
    )
}

export default ComponentMasterForm