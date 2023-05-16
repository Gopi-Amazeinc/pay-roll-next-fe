import Link from "next/link";
import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const SubSectionMaster = () => {
  const [subsection, SetSubsectionData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await apiService.commonGetCall("Master/GetSubSectionMaster");
    SetSubsectionData(res.data);
  }

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
        await apiService.commonGetCall("Master/DeleteSubSectionMaster?ID=" + id)
        Swal.fire("SubSection Deleted successfully.");
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
  const pageCount = Math.ceil(subsection.length / PER_PAGE);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="container">
      <p className="Heading">SubSection Master</p>
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
              onChange={e => setKeyword(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <p className="col-2 result-heading">Showing {subsection.length} Results</p>
        <div className="col-8"></div>
        <div className="col-2">
          <Link href="/Masters/SubSectionMaster/new">
            <button className=" AddButton">
              <AiOutlinePlus />    Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Short</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subsection) &&
              subsection.length > 0 && (
                <>
                  {subsection
                    .filter(data => {
                      if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                        return data;
                      }
                    })
                    .slice(offset, offset + PER_PAGE)
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.short}</td>
                          <td>{data.description}</td>
                          <td>
                            <Link href={`/Masters/SubSectionMaster/Edit/${data.id}`}>
                              <button
                                className="edit-btn"
                              >
                                Edit
                              </button>
                            </Link>
                            &nbsp;&nbsp;
                            <button
                              onClick={() => handelDelete(data.id)}
                              className="edit-btn"
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

      <div className="mb-4 mt-4 text-center">
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
    </div>
  );
};

export default SubSectionMaster;
