import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";

function ShiftMaster() {
  const [shiftDetails, setShiftDetails] = useState([]);

  const getShiftdetails = async () => {
    const res = await apiService.commonGetCall("Master/GetShiftMaster");
    setShiftDetails(res.data);
  }

  useEffect(() => {
    getShiftdetails()
  }, [1])

  const handleDelete = async (id) => {
    try {
      const res = await apiService.commonGetCall(`Master/DeleteShiftMaster?ID=${id}`);
      Swal.fire({
        icon: "success",
        title: "Hurray..",
        text: "Data was Deleted...!",
      });
      getShiftdetails();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Data was Not Deleted...!",
      });
    }
  };

  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(shiftDetails.length / PER_PAGE);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="container-fluid">
      <p className="Heading">Shift Master</p>
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
        <p className="col-lg-2 result-heading">Showing {shiftDetails.length} Results</p>
        <div className="col-lg-8"></div>
        <div className="col-lg-2">
          <Link href="/Masters/ShiftMaster/new">
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
              <tr>
                <th> Short</th>
                <th> Description</th>
                <th> Shift Timings</th>
                <th> Grace</th>
                <th>Shift Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shiftDetails) &&
                shiftDetails.length > 0 && (
                  <>
                    {shiftDetails
                      .filter(data => {
                        if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))||
                        (data.shiftTimeings.toString().includes(keyword.toString())) || (data.grace.toString().includes(keyword))) {
                          return data;
                        }
                      })
                      .slice(offset, offset + PER_PAGE)
                      .map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.short}</td>
                            <td>{data.description}</td>
                            <td>{data.shiftTimeings}</td>
                            <td>{data.grace}</td>
                            <td>{data.shiftType}</td>
                            <td>
                              <Link href={`/Masters/ShiftMaster/Edit/${data.id}`}>
                                <button className="edit-btn">Edit</button>
                              </Link>
                              &nbsp; &nbsp;
                              <button className="edit-btn" onClick={() => handleDelete(data.id)}>Delete</button>
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
}

export default ShiftMaster;