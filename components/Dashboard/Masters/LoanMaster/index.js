import React from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import Enable from "../../../../public/Images/enable.png";
import Disable from "../../../../public/Images/disable.png";
import Cancel from "../../../../public/Images/cancel.png";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import { BiFilterAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const LoanMasterDash = () => {
  const [loanMaster, SetLoanMasterData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await apiService.commonGetCall("Master/GetLoanMaster");
    SetLoanMasterData(res.data);
  };

  const enableDisableLoanType = async (data) => {
    let etty = {
      ID: data.id,
      Enable_Disable: !data.enable_Disable,
    };
    await apiService.commonPostCall("Master/Enable_Disable_Loans", etty);
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
        await apiService.commonGetCall("Master/DeleteLoanMaster?ID=" + id);
        Swal.fire("Loan Deleted successfully.");
        getData();
      }
    });
  };

  const PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(loanMaster.length / PER_PAGE);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="container-fluid">
      <p className="Heading"> Loan Type Dashboard</p>
      <div className="card p-3 rounded-3 border-0">
        <div className="row">
          <div className="col-lg-1">
            <p> <BiFilterAlt /> Filter By</p>
          </div>
          <div className="col-lg-3">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={e => setKeyword(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <p className="col-lg-2 result-heading">Showing {loanMaster.length} Results</p>
        <div className="col-lg-8"></div>
        <div className="col-lg-2">
          <Link href="/Masters/LoanMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
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
                    {loanMaster
                      .filter(data => {
                        if ((data.type.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                          return data;
                        }
                      })
                      .slice(offset, offset + PER_PAGE)
                      .map((data, index) => {
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

      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination  justify-content-center"}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active primary"}
          />
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default LoanMasterDash;
