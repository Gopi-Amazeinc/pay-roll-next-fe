import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Styles  from './salary.module.css'
import Layout from "@/components/layout/layout";


const SalaryIncreasePdf = () => {
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
  }, []);
  return (
    <Layout>
    <div>
      <div className="container">
        <div className="row mt-3">
          <div
            className={"col-lg-3 " + Styles.title}
            >
             Salary Increase PDF
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default SalaryIncreasePdf;
