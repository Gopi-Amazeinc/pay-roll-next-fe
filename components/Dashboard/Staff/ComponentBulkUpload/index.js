import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="container">
      <br />
      <h5 className="Heading">Upload Payroll Component</h5>
      <div className="card shadow-lg p-4 rounded-3 mt-4">
        <div className="row">
          <div className="col-lg-1">
            <p>Filter By:</p>
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              placeholder="Search"
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-lg-2">
          <Link href="">
            <button className="uploadButton">
              EXPORT TO EXCEL
            </button>
          </Link>
        </div>
        <div className="col-lg-2">
          <Link href="">
            <button className="uploadButton">
              UPLOAD
            </button>
          </Link>
        </div>
        <div className="col-lg-2">
          <Link href="">
            <button  className="uploadButton">
              ADD NEW
            </button>
          </Link>
        </div>

        </div>
      </div>

      <div>
        <table className="table table-striped mt-3">
          <thead>
            <tr className="bg-info text-white ">
              <th>Employee ID</th>
              <th>Name</th>
              <th>Component Code</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10403</td>
              <td>Sudharshan B</td>
              <td>Meal_ALLWNCE</td>
              <td>2000</td>
              <td>
                <button className="enableDisableBtn  mx-2">Enable</button>
                <button className="editDeleteBtnTable mx-2">Edit</button>
                <button className="editDeleteBtnTable mx-2">Delete</button>
              </td>
            </tr>
                
             
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
