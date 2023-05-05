import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import eye from "@/public/eye.svg";
import Loginpage from "/public/Images/DigiLogin.png";
import digiLogo from "@/public/Images/DigiLogoBlue.png";

const Login = ({ makelogin }) => {
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const positionList = [
    { id: 2, short: "Manager" },
    { id: 6, short: "Employee" },
    { id: 9, short: "HR" },
    { id: 17, short: "Payroll Manager" },
    // { id: 10, short: "SBU" },
    // { id: 11, short: "IT Team" },
    // { id: 12, short: "HR Head" },
  ];
  const companyList = [{ id: 1001, short: "Company 1" }];

  const [passwordShown, setPasswordShown] = useState("");
  // const [selectedPosition, setSelectedPosition] = useState("");
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // TODO:  will check this  further if required????
  const changePosition = async (event) => {
    debugger;
    console.log(event.target.name);
    console.log(event.target.value);
    const selectedPosition = event.target.value;
    // setSelectedPosition(event.target.value);
    console.log(selectedPosition);
    sessionStorage.setItem("roleType", selectedPosition);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Written By:- Gopi -> Onsubmit login we are storing sessions
  const onSubmit = async (data) => {
    const res = await axios.get(
      hostURL +
      `Master/GetMyDetailsForLogin?EmailID=${data.Username}&Password=${data.Password}&roletype=${data.RoleID}`
    );
    if (res.data.length > 0 && res.status === 200) {
      sessionStorage.setItem("userID", res.data[0].id);
      sessionStorage.setItem("userName", res.data[0].name);
      sessionStorage.setItem("roleID", res.data[0].login);
      makelogin();
    }
    // else if (res){
    //   makelogin();
    // }
    else {
      Swal.fire("Invalid credentials");
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
    },
    errorMsg: {
      fontSize: "12px",
      fontWeight: "500",
      color: "red",
    },
    inputLabel: {
      fontSize: "16px",
    },
  };

  return (
    <div
      className="row"
      style={{
        backgroundColor: "#95a0e2",
        height: "100vh",
        paddingTop: "5%",
      }}
    >
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <div className="row">
          <div className={"col-lg-6 " + styles.logincard}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Image src={digiLogo} alt="digiLogo" width={250} />
              <div>
                <select
                  className="form-select "
                  {...register("CompanyID", { required: true })}
                >
                  <option value="">Select Company</option>
                  {companyList.map((Company) => {
                    return (
                      <option key={Company.id} value={Company.id}>
                        {Company.short}
                      </option>
                    );
                  })}
                </select>
                {errors.CompanyID && (
                  <span style={customStyles.errorMsg}>
                    Please select Company
                  </span>
                )}
              </div>
              <div>
                <select
                  className="form-select mt-4"
                  onChange={changePosition.bind(this)}
                  {...register("RoleID", { required: true })}
                >
                  <option value="">Select Position</option>
                  {positionList.map((position) => {
                    return (
                      <option key={position.id} value={position.id}>
                        {position.short}
                      </option>
                    );
                  })}
                </select>
                {errors.RoleID && (
                  <span style={customStyles.errorMsg}>
                    Please select Position
                  </span>
                )}
              </div>

              <div className="form-floating mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Username"
                  {...register("Username", { required: true })}
                />
                <label>UserName</label>
                {errors.Username && (
                  <span style={customStyles.errorMsg}>
                    Please Enter Username
                  </span>
                )}
              </div>

              <div className={"form-floating mt-2"}>
                <input
                  type={passwordShown ? "text" : "password"}
                  size="4"
                  className="form-control"
                  placeholder="Enter your Password"
                  {...register("Password", { required: true })}
                />
                <label>Password </label>
                <Image
                  className={styles.inputwrapper}
                  src={eye}
                  onClick={togglePassword}
                  alt="eye"
                  width={25}
                  height="auto"
                />
                {errors.Password && (
                  <span style={customStyles.errorMsg}>
                    Please Enter Password
                  </span>
                )}
              </div>

              <div className="row mt-2">
                <div className="col-lg-6">
                  <a className={styles.anchorlink} href="#">
                    Forgot password ?
                  </a>
                </div>

                <div className="col-lg-6">
                  {/* <Link href='/Home/Dashboard'> */}
                  <button className={styles.loginbtn}>Login with 365</button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
          </div>
          <div
            className={"col-lg-6 " + styles.divNegate}
            style={{ position: "relative" }}
          >
            <Image
              src={Loginpage}
              alt="DigiLogin"
              priority
              style={{ width: "100%", height: "auto" }}
            />
            <div className={styles.content}>
              <h1>Secured and Easy to Use</h1>
              <p>Smart all-in-one software for HR operations</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default Login;
