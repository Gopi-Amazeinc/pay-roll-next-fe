import React from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import Enable from "../../../../public/Images/enable.png";
import Disable from "../../../../public/Images/disable.png";
import Cancel from "../../../../public/Images/cancel.png";
import axios from "axios";
import Swal from "sweetalert2";
import { BiFilterAlt } from "react-icons/bi";

const LoanMasterDash = () => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [loanMaster, SetLoanMasterData] = useState([]);

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
      <p className="Heading"> Loan Type Dashboard</p>
      <div className="card p-3 rounded-3 shadow border-0">
        <div className="row">
          <div className="col-1">
            <p> <BiFilterAlt /> Filter By</p>
          </div>
          <div className="col-5">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
            ></input>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <p className="col-2 result-heading">Showing {loanMaster.length} Results</p>
        <div className="col-8"></div>
        <div className="col-2">
          <Link href="/Masters/LoanMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <table className="table table-striped">
          <thead >
            <tr >
              <th >Loan Type</th>
              <th >Description</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(loanMaster) &&
              loanMaster.length > 0 && (
                <>
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
                </>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanMasterDash;
