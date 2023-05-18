
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EmploymentDetails() {

    const [EmploymentDetals, setEmploymentData] = useState([]);
    const [EmploymentTypeMaster, setEmploymentTypeMaster] = useState([]);
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
                CompanyName: data.CompanyName,
                PositionTitle: data.PositionTitle,
                EmployementTypeID: data.EmployementTypeID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                StaffID: sessionStorage.getItem('userID')
            }

            await axios.post(hostURL + "Payroll/InsertEmploymentDetails", Entity);
            Swal.fire("Saved Successfully!")
            getData();
            cleardata()
        }
        else{
            let Entity = {
                ID: data.ID,
                CompanyName: data.CompanyName,
                PositionTitle: data.PositionTitle,
                EmployementTypeID: data.EmployementTypeID,
                StartDate: data.StartDate,
                EndDate: data.EndDate,
                StaffID: sessionStorage.getItem('userID')
        }

        await axios.post(hostURL + "Payroll/UpdateEmploymentDetails", Entity);
            Swal.fire("Updated Successfully!")
            getData();
            cleardata()

    }
}


    function cleardata(existingData = null) {
        debugger
        let etty = {
            ID: existingData ? existingData.id : "",
            CompanyName: existingData ? existingData.companyName : "",
            PositionTitle: existingData ? existingData.positionTitle : "",
            EmployementTypeID: existingData ? existingData.employementType : "",
            StartDate: existingData ? existingData.startDate : "",
            EndDate: existingData ? existingData.endDate : "",
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
        let res = await axios.get(hostURL + "HR/GetEmploymentDetails");
        setEmploymentData(res.data);


        let res1 = await axios.get(hostURL + "/Master/GetEmploymentTypeMaster");
        setEmploymentTypeMaster(res1.data);

    }
    async function editData(data) {
        debugger;
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "Payroll/GetEmploymentDetailsByID?ID=" + data);
        cleardata(res.data[0]);

    }

    async function deleteData(data) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/DeleteEmploymentDetails?ID=" + data);
        getData();

    }

    return (
      <div>
        <div className="container-fluid">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
            
                  <h6>Employment History Details</h6>
                  <hr />
                  <div style={customPopupDivision.popupcontent}>
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Company Name<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Comapany Name.."
                          onkeypress="return /[A-Za-z/\s/g]/i.test(event.key)"
                          {...register("CompanyName", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.CompanyName && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter comapany name
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Position Title <span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Position Title .."
                          {...register("PositionTitle", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.PositionTitle && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter position title
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Employment Type<span style={customStyles.span}>*</span>
                      </p>
                      {
                        <div>
                          <select
                            className="form-select"
                            {...register("EmployementTypeID", {
                              required: true,
                            })}
                            style={customStyles.inputLabel}
                          >
                            <option value="">Select Employment Type</option>
                            {EmploymentTypeMaster.map((data) => {
                              return (
                                <option key={data.id} value={data.id}>
                                  {data.short}
                                </option>
                              );
                            })}
                          </select>
                          {errors.EmployementTypeID && (
                            <span style={customStyles.errorMsg}>
                              {" "}
                              Please select employment type
                            </span>
                          )}
                        </div>
                      }
                    </div>

                    {/* <div style={customPopupDivision.popupinputs}>
                                        <p>Start Date<span style={customStyles.span}>*</span></p>
                                        <div>
                                            <input type='date' placeholder='Enter Start Date..'
                                                {...register("StartDate", { required: true })} className='form-control '></input>
                                            {errors.StartDate && <span style={customStyles.errorMsg}> Please select start date</span>}
                                        </div>
                                    </div> */}
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        Start Date
                        <span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="date"
                          placeholder="Enter Start Date.."
                          {...register("StartDate", { required: true })}
                          className="form-control"
                        ></input>
                         {errors.StartDate && <span style={customStyles.errorMsg}> Please select start date</span>}
                      </div>
                    </div>
                    <div style={customPopupDivision.popupinputs}>
                      <p>
                        End Date<span style={customStyles.span}>*</span>
                      </p>
                      <div>
                        <input
                          type="date"
                          placeholder="Enter End Date.."
                          {...register("EndDate", { required: true })}
                          className="form-control "
                        ></input>
                        {errors.EndDate && (
                          <span style={customStyles.errorMsg}>
                            {" "}
                            Please enter end date
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center w-100 mt-2 mb-2 pr-2">
                    {actionType == "insert" && (
                      <button className="staffSubmitBtn">Submit</button>
                    )}
                    {actionType == "update" && (
                      <button className="staffSubmitBtn">Update</button>
                    )}
                  </div>
                </div>
              </div>
              <br></br>
            </form>

            <div className="row">
              <div className="col-12">
                <table className="table table-hover mb-5">
                  <thead className="bg-info text-white ">
                    <tr>
                      <th>Company Name</th>
                      <th>Position Title</th>
                      <th>Employment Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EmploymentDetals.map((data, index) => {
                      return (
                        <tr className="text-dark" key={index}>
                          <td>{data.companyName}</td>
                          <td>{data.positionTitle}</td>
                          <td>{data.employementTypeID}</td>
                          <td>{data.startDate}</td>
                          <td>{data.endDate}</td>

                          <td className="d-flex">
                            <button
                              className="staffEditBtn"
                              onClick={editData.bind(this, data.id)}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              className="staffDeleteBtn"
                              onClick={deleteData.bind(this, data.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

 

}