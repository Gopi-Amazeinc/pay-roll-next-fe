import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout.js';
import Styles from "../../../styles/employmentJobHistory.module.css";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const PositionMasterDetails = () => {

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;


    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;


    async function onSubmit(data) {

        await axios.post(hostURL + 'Master/InsertRoleType', data); //gurukiran@amazeinc.in, api call to insert the data
        Swal.fire("Data Successfully added")
        router.push("/Masters/PositionMaster");

    }


    return (
        <Layout>
            <div>
                <div className="container">
                    <div className={Styles.rowcss}>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-lg-3">
                                    <h3 className="Heading">Postion Master Deatils</h3>
                                </div>
                                <div className="col-lg-8">
                                </div>
                                <div className="col-lg-1">
                                </div>
                            </div>


                            <div className={Styles.cardcss}>

                                <div className="row leavereq ">
                                    <div className="col-md-2">
                                        <label >Position Name<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-md-4">
                                        <label > Description<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row leavereq">
                                        <div className="col-md-2">
                                            <input type="text" className="form-control form-control-md"{...register('Short', {

                                                required: "Please add a Position Name", pattern: {

                                                    value: '^[A-Za-z0-9 ]+$',

                                                    message: "Please enter a valid Position Name"

                                                }

                                            })} placeholder="Position Name" />

                                            {errors.Short && <p className="error-message" style={{ color: "red" }}>{errors.Short.message}</p>}

                                        </div>
                                        <div className="col-md-4">
                                            <input name="Description"   {...register("Description", { required: true })} rows="3" type="text" placeholder='Description' className={`form-control `} />
                                            {
                                                errors.Description && <p className='text-danger'>Description is Required</p>
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-lg-8">
                                        </div>
                                        <div className="col-lg-2">

                                            <Link href="/Masters/PositionMaster"> <button className="AddButton">CANCEL</button></Link>
                                        </div>
                                        <div className="col-lg-2">


                                            <button type="submit" className="AddButton">

                                                Save

                                            </button>


                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default PositionMasterDetails