import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
// import Dropzone from '../../SharedComponent/dropzone'

export default function NominationDetails() {
    const [RelationShipMaster, setRelationShipMaster] = useState([]);
    const [NominationDetals, setNominationData] = useState([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [actionType, setActionType] = useState("insert");
    const customStyles = {
        content: {
            width: '85%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            height: "70%"
        },
        errorMsg: {
            fontSize: '12px',
            fontWeight: '500',
            color: 'red'
        },
        span: {
            color: 'red'
        }
    };

    const customPopupDivision = {
        popupcontent: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        popupinputs: {
            width: '48%',
            marginTop: '16px'
        },
        formcontrol: {
            width: '350px !important'
        },

        cardinputs: {
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            width: '215px',
            justifyContent: 'center'
        }

    }

    async function onSubmit(data) {
        debugger
        console.log(data)
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        if (actionType == "insert") {
            let Entity = {
                BeneficiaryName: data.BeneficiaryName,
                BeneficiaryRelationshipID: data.BeneficiaryRelationshipID,
                Percentage: data.Percentage,
                NomineeType: data.NomineeType,
                BeneficiaryDOB: data.BeneficiaryDOB,
                NominationAttachment: "No Image",
                StaffID: sessionStorage.getItem('userID')
            }

            await axios.post(hostURL + "HR/InsertNomination", Entity);
            Swal.fire("Added successfully")
        }
        else{
            let Entity = {
                ID: data.ID,
                BeneficiaryName: data.BeneficiaryName,
                BeneficiaryRelationshipID: data.BeneficiaryRelationshipID,
                Percentage: data.Percentage,
                NomineeType: data.NomineeType,
                BeneficiaryDOB: data.BeneficiaryDOB,
                NominationAttachment: "No Image",
                StaffID: sessionStorage.getItem('userID')
            }
            await axios.post(hostURL + "HR/UpdateNomination", Entity);
            Swal.fire("Updated Successfully!")
            getData();
            cleardata()
        }

    }

    function cleardata(existingData = null) {
        debugger
        let etty = {
                ID: existingData ? existingData.id : "",
                BeneficiaryName: existingData ? existingData.beneficiaryName : "",
                BeneficiaryRelationshipID: existingData ? existingData.beneficiaryRelationshipID : "",
                Percentage: existingData ? existingData.percentage : "",
                NomineeType: existingData ? existingData.nomineeType : "",
                BeneficiaryDOB: existingData ? existingData.beneficiaryDOB : "",
                NominationAttachment: "No Image",
                StaffID: sessionStorage.getItem('userID')
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }


    useEffect(() => {
        getData();
    }, [1]);

    async function getData() {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "/HR/GetNomination");
        setNominationData(res.data);

        let res1 = await axios.get(hostURL + "/Master/GetRelationShipMaster");
        setRelationShipMaster(res1.data);
    }
    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetNominationByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteNomination?ID=" + data);
        getData();

    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='card'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Nomination Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>
                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Beneficiary Name(First Name, Middle, Initial and Last Name)<span style={customStyles.span} >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Enter Beneficiary Name..'
                                                {...register("BeneficiaryName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.BeneficiaryName && <span style={customStyles.errorMsg}> Please enter beneficiary name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Beneficiary Relationship<span style={customStyles.span}>*</span></p>
                                        {
                                            <div>
                                                <select className='form-select' {...register("BeneficiaryRelationshipID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Relationship</option>
                                                    {
                                                        RelationShipMaster.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.BeneficiaryRelationshipID && <span style={customStyles.errorMsg}> Please select beneficiary relatioship</span>}
                                            </div>
                                        }
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Percentage<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='text' placeholder='Enter Percentage..'
                                                {...register("Percentage", { required: true })} className='form-control inputwidth'></input>
                                            {errors.Percentage && <span style={customStyles.errorMsg}> Please enter percentage</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Nominee Type<span style={customStyles.span}>*</span></p>
                                        {
                                            <div>
                                                <select className='form-select' {...register("NomineeType", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Nominee Type</option>
                                                    <option value="Insurance">Insurance</option>
                                                </select>
                                                {errors.NomineeType && <span style={customStyles.errorMsg}> Please select nominee type</span>}
                                            </div>
                                        }
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Beneficiary Date of Birth<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='date' placeholder='Enter Beneficiary DOB..'
                                                {...register("BeneficiaryDOB", { required: true })} className='form-control inputwidth'></input>
                                            {errors.BeneficiaryDOB && <span style={customStyles.errorMsg}> Please enter beneficiary DOB</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Attachment<span >*</span></p>
                                        <div>
                                            {/* <Dropzone /> */}

                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                                    {/* <button className='close-button' onClick={closeModal}>Cancel</button> */}
                                    {
                                        actionType == "insert" && (
                                            <button className='submit-button' >Submit</button>
                                        )
                                    }
                                    {
                                        actionType == "update" && (
                                            <button className='submit-button' >Update</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </form>


                    <div className='row'>
                        <div className='col-12'>
                            <table className='table table-hover mb-5'>
                                <thead className='bg-info text-white '>
                                    <tr>
                                        <th>Beneficiary Name</th>
                                        <th>Beneficiary Relationship</th>
                                        <th>Percentage</th>
                                        <th>Nominee Type</th>
                                        <th>Beneficiary Date of Birth</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        NominationDetals.map((data, index) => {
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <td>{data.beneficiaryName}</td>
                                                    <td>{data.beneficiaryRelationshipName}</td>
                                                    <td>{data.percentage}</td>
                                                    <td>{data.nomineeType}</td>
                                                    <td>{data.beneficiaryDOB}</td>
                                                    <td>{data.status}</td>
                                                    <td className='d-flex'>
                                                        <button className='editButton' onClick={editData.bind(this, data.id)}>Edit</button>
                                                        <button className='deleteButton' onClick={deleteData.bind(this, data.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>



                </div>

            </div>
        </div>
    )

}