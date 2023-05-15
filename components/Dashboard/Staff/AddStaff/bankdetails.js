import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function BankDetails() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [BankDetails, setBankDetailsData] = useState([]);
    const [BankMaster, setBankMaster] = useState([]);
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
            width: '32%',
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
                "BankID": data.BankID,
                "AccountHolderName": data.AccountHolderName,
                "BankAccountNumber": data.BankAccountNumber,
                "BranchName": data.BranchName,
                "BranchAddress": data.BranchAddress,
                "StaffID": sessionStorage.getItem('userID')
            }
            await axios.post(hostURL + "HR/InsertBankDetails", Entity);
            Swal.fire("Saved Successfully!")
            getBankDetails();
            cleardata();
        } else {
            let Entity = {
                "ID": data.ID,
                "BankID": data.BankID,
                "AccountHolderName": data.AccountHolderName,
                "BankAccountNumber": data.BankAccountNumber,
                "BranchName": data.BranchName,
                "BranchAddress": data.BranchAddress,
                "StaffID": sessionStorage.getItem('userID')
            }

            await axios.post(hostURL + "HR/UpdateBankDetails", Entity);
            Swal.fire("Updated Successfully!")
            getBankDetails();
        }
    }


    function cleardata(existingData = null) {
        debugger
        let etty = {
            "ID": existingData ? existingData.id : "",
            "BankID": existingData ? existingData.bankID : "",
            "AccountHolderName": existingData ? existingData.accountHolderName : "",
            "BankAccountNumber": existingData ? existingData.bankAccountNumber : "",
            "BranchName": existingData ? existingData.branchName : "",
            "BranchAddress": existingData ? existingData.branchAddress : "",
            "StaffID": sessionStorage.getItem('userID')
        }
        reset(etty);
        setActionType(existingData ? "update" : 'insert');
    }


    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetBankDetailsByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteIDDetails?ID=" + data);
        getData();

    }



    // const deleteModal = async (id) => {
    //     debugger
    //     let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    //     let res = await axios.get(hostURL + "Employee/DeleteBankDetails?ID=" + id);
    //     let res1 = await axios.get(hostURL + "Employee/GetBankDetails");
    //     setBandMasterData(res1.data);
    // }


    // const openEditModal = async (id) => {
    //     debugger
    //     let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    //     let res = await axios.get(hostURL + "Employee/GetBankDetailsByID?ID=" + id);
    //     clearForm(res.data[0]);
    //     setIsOpen(true);
    // }



    useEffect(() => {
        getBankDetails()

    }, [1]);


    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    async function getBankDetails() {
        let res = await axios.get(hostURL + "HR/GetBankDetails");
        setBankDetailsData(res.data);


        let res1 = await axios.get(hostURL + "Master/GetBankMaster");
        setBankMaster(res1.data);
    }

    return (
        <div style={customStyles}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="d-flex justify-content-between">
                                    <p className='modal-heading'>Bank Details</p>
                                </div>
                                <div style={customPopupDivision.popupcontent}>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Name Of Bank<span >*</span></p>
                                        {
                                            <div>
                                                <select className='form-control inputwidth'{...register("BankID", { required: true })} style={customStyles.inputLabel}>
                                                    <option value="">Select Bank</option>
                                                    {
                                                        BankMaster.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.id}>{data.short}</option>
                                                            )
                                                        })
                                                    }
                                                    {errors.BankID && <span style={customStyles.errorMsg}> Please Enter Title</span>}
                                                </select>

                                            </div>
                                        }
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Account Holder Name<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Account Holder Name'
                                                {...register("AccountHolderName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.AccountHolderName && <span style={customStyles.errorMsg}> Please Enter Account Holder Name</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Bank Account Number<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Bank Account Number'
                                                {...register("BankAccountNumber", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.BankAccountNumber && <span style={customStyles.errorMsg}> Please Enter Bank Account Number</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Branch<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Branch'
                                                {...register("BranchName", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.BranchName && <span style={customStyles.errorMsg}> Please Enter Branch</span>}
                                        </div>
                                    </div>


                                    <div style={customPopupDivision.popupinputs}>
                                        <p>Branch Address<span >*</span></p>
                                        <div>
                                            <input type='text' placeholder='Branch Address'
                                                {...register("BranchAddress", { required: true })} className='form-control inputwidth' ></input>
                                            {errors.BranchAddress && <span style={customStyles.errorMsg}> Please Enter Branch Address</span>}
                                        </div>
                                    </div>

                                    <div style={customPopupDivision.popupinputs}>

                                    </div>

                                </div>

                            </div>
                        </div>
                        <br></br>
                        <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                            {
                                actionType == "insert" && (
                                    <button className='submit-button' >Save</button>
                                )
                            }
                            {
                                actionType == "update" && (
                                    <button className='submit-button' >Update</button>
                                )
                            }
                        </div>

                        <div className='row'>
                            <div className='col-12'>
                                <table className='table table-hover mb-5'>
                                    <thead className='bg-info text-white '>
                                        <tr>
                                            <th>Name of Bank</th>
                                            <th>Account Holder Name</th>
                                            <th>Bank Account Number</th>
                                            <th>Branch</th>
                                            <th>Branch Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            BankDetails.map((data, index) => {
                                                return (
                                                    <tr className="text-dark" key={index}>
                                                        <td>{data.nameOfBank}</td>
                                                        <td>{data.accountHolderName}</td>
                                                        <td>{data.bankAccountNumber}</td>
                                                        <td>{data.branchName}</td>
                                                        <td>{data.branchAddress}</td>
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
            </form>
        </div>
    )
}