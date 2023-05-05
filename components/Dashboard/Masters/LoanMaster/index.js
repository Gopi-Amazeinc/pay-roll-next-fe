import React from "react";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import Enable from "../../../../public/Images/enable.png";
import Disable from "../../../../public/Images/disable.png";
import Cancel from "../../../../public/Images/cancel.png";
import axios from "axios";
import Swal from "sweetalert2";

const LoanMasterDash = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [loanMaster, SetLoanMasterData] = useState([]);

  const getDataByID = (data) => {
    sessionStorage.setItem("id", data.id);
  };
  const clearData = () => {
    sessionStorage.setItem("id", "");
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    let res = await axios.get(hostURL + "Master/GetLoanMaster");
    SetLoanMasterData(res.data);
  };

  const enableDisableLoanType = async (data) => {
    let etty = {
      ID: data.id,
      Enable_Disable: !data.enable_Disable,
    };
    await axios.post(hostURL + "Master/Enable_Disable_Loans", etty);
    if (etty.Enable_Disable == true) {
      Swal.fire("Loan Enable.");
    } else {
      Swal.fire("Loan Disable.");
    }
    getData();
  };

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure want to delete ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3247d5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get(hostURL + "Master/DeleteLoanMaster?ID=" + id);
        Swal.fire("Loan Deleted successfully.");
        getData();
      }
    });
  };
  return (

    <div className="container">
      <p></p>

      <p className="Heading" >Loan Type Dashboard</p>

      <div className="card shadow-lg p-4 rounded-4 mx-0">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              className="form-control form-control-md "
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <p className="Heading fs-6 mt-3">
            SHOWING <span>{loanMaster.length} </span>RESULTS
          </p>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-2">
          <Link href="/Masters/LoanMaster/new" >
            
            <button
              className="mt-3 AddButton"
              onClick={clearData.bind(this)}

            >
              
              <AiOutlinePlusCircle size={18} /> ADD
            </button>
          </Link>
        </div>

      </div>

      <div className="row ">
        <table className=" table mt-3 table-striped table mx-3 " >
          <thead className="th">
            <tr className="tr">

              <th >Loan Type</th>
              <th >Description</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {loanMaster.map((data, index) => {
              return (
                <tr className="text-dark" key={index}>
                  <td>{data.type}</td>
                  <td>{data.description}</td>
                  <td>
                    <span onClick={() => enableDisableLoanType(data)}>
                      {data.enable_Disable ? (
                        <Image
                          className="img-fluid "
                          src={Enable}
                          alt="Digi Office"
                          width={50}
                          height={60}
                        />
                      ) : (
                        <Image
                          className="img-fluid "
                          src={Disable}
                          alt="Digi Office"
                          width={50}
                          height={60}
                        />
                      )}
                    </span>
                    <Image
                      className="img-fluid"
                      onClick={() => handelDelete(data.id)}
                      src={Cancel}
                      alt="Digi Office"
                      width={30}
                      height={60}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default LoanMasterDash;
