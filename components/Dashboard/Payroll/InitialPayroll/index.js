import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";

const InitialPayroll = () => {

  const [intialPayroll, setInitialPayroll] = useState([]);

  const getInitialPayroll = async () => {
    const { data } = await apiService.commonGetCall(
      "Payroll/GetPreliminarySalary"
    );
    setInitialPayroll(data);
  };
  useEffect(() => {
    getInitialPayroll();
  }, []);

  const PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(intialPayroll.length / PER_PAGE);
  return (
    <>
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-lg-9"></div>
          <div className="col-lg-3">
            <Link
              style={{ textDecoration: "none" }}
              href="/Payroll/InitialPayroll/new"
            >
              <button className="newPayrollBtn">New Payroll</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <p className="Heading">Executed Initial Payroll Runs</p>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr className="bg-info text-white">
                  <th>Year</th>
                  <th>Month</th>
                  <th>Period</th>
                  <th>Payroll Run Type </th>
                  <th>Description </th>
                  <th>Execution Date</th>
                </tr>
              </thead>
              <tbody>
                {intialPayroll.slice(offset, offset + PER_PAGE).map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.endyear}</td>
                      <td>{data.month}</td>
                      <td>{data.payrolltype}</td>
                      <td>{data.ded_type}</td>
                      <td>{data.componentName}</td>
                      <td>{data.endDateFormated}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <div className="text-center">
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
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialPayroll;
