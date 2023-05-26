import React from 'react'
import Link from 'next/link'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2'
import ReactPaginate from "react-paginate";

function StateMasterDashboard() {
  const [state, setStateData] = useState([]);
  const [country, setCountryData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let res = await apiService.commonGetCall("Master/GetStateType");
    setStateData(res.data);
    let res1 = await apiService.commonGetCall("Master/GetCountryType");
    setCountryData(res1.data);
  }

  const deleteState = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiService.commonGetCall("Master/DeleteStateType?ID=" + id); //naveen.th@amazeinc.in, Delete API for State master, to delete data

      }
      getData()
    });

  }

  const [keyword, setKeyword] = useState("");
  const PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(state.length / PER_PAGE);

  return (
    <div className="container-fluid">
      <p className="Heading">Province Master</p>
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
        <p className="col-lg-2 result-heading">Showing {state.length} Results</p>
        <div className="col-lg-8"></div>
        <div className="col-lg-2">
          <Link href="/Masters/StateMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>
      <br />
      <div className="row">
        <div className='col-lg-12'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Country</th>
                <th>Province Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(state) &&
                state.length > 0 && (
                  <>
                    {state
                      .filter(data => {
                        if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                          return data;
                        }
                      })
                      .slice(offset, offset + PER_PAGE)
                      .map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.country}</td>
                            <td>{data.short}</td>
                            <td>{data.description}</td>
                            <td>
                              <Link href={`/Masters/StateMaster/Edit/${data.id}`}>
                                <button
                                  className='edit-btn'
                                >
                                  Edit
                                </button>
                              </Link>
                              &nbsp;&nbsp;
                              <button
                                className='edit-btn'
                                onClick={deleteState.bind(this, data.id)}
                              >
                                Delete
                              </button>
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

export default StateMasterDashboard