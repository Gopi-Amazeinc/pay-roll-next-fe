import { useForm } from "react-hook-form";
import Layout from '../../../components/layout/layout';
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
function LevelTypeForm() {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {

        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        await axios.post(hostURL + "Master/InsertLevelType", data) // inserting new job level type data [Shashank]
        location.href = "/Masters/JobLevel";
        Swal.fire({
            icon: 'success',
            title: 'Added Successfully',
        })

    }

    return (
        <Layout>
            <div className="container">
                <h3 className='Heading'>Job Level Type Details</h3>
                <div className='card p-4 border-0 rounded-3 mt-4 mx-0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-lg-4">
                                <p>Level Type <i className="text-danger">*</i></p>
                                <input
                                    name="Short"
                                    className="form-control"
                                    type="text"
                                    {...register("Short", { required: true })}
                                    placeholder="Level Type"
                                />
                                <div>
                                    {errors.Short && (
                                        <span className="mt-2 text-danger">
                                            Please enter name
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <p>Description <i className="text-danger">*</i></p>
                                <textarea
                                    name="Description"
                                    className="form-control"
                                    {...register("Description", { required: true })}
                                    placeholder="Description"
                                />
                                <div>
                                    {errors.Description && (
                                        <span className="text-danger mt-2" >
                                            Please enter description
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row ">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-2 ">
                                <Link href="/Masters/JobLevel">
                                    <button
                                        type="button"
                                        className=" AddButton" >
                                        Close
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-2">

                                <button type="submit" className="AddButton" >
                                    Save
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LevelTypeForm