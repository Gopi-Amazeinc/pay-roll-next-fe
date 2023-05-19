import React, { useEffect, useState } from "react";
import Image from "next/image";
import Digilogo from "@/public/Images/DigiLogo.png";
import Notification from "@/public/Images/notification.png";
import HeaderStyles from "./header.module.css";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const Header = ({ makelogout }) => {
  const [userName, setUserName] = useState();
  const [initial, setInitial] = useState("");
  const [time, setTime] = useState(new Date());
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");
  const [ampm, setAmpm] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    const Loginname = sessionStorage.getItem("userName");
    setUserName(Loginname);
    if (Loginname) {
      setInitial(Loginname.charAt(0));
    }
  }, []);



  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  useEffect(() => {
    const temp = time.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
      hour12: true,
    });
    const temp1 = temp.split(":");
    setHh(temp1[0]);
    const temp2 = temp1[1].split(" ");
    setMm(temp2[0]);
    setAmpm(temp2[1]);
  }, [time]);

  const formattedTime = time
    .toLocaleTimeString([], {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    })
    .toUpperCase();

  return (
    <div className={"container-fluid " + HeaderStyles.header}>
      <div className="row">
        <div className="col-lg-2 mt-1">
          <Image
            className="img-fluid "
            src={Digilogo}
            alt="Digi Office"
            width={145}
            height={45}
          />
        </div>
        <div className="col-lg-6 text-white ">
          <p className={HeaderStyles.time1}>
            <span className={HeaderStyles.time}>{hh}:</span>{" "}
            <span className={HeaderStyles.time}>{mm}:</span>
            <span className={HeaderStyles.time}>{ampm}</span>
          </p>
        </div>

        <div className="col-lg-4 mt-2 text-white">
          <div className="notification absolute fixed" style={{ top: "100px", left: "100px" }}>
            <Image className={HeaderStyles.notification} src={Notification} alt="notifications" width={36} height={30} onClick={() => setOpen(!open)} />
            {open && (
              <div className={HeaderStyles.card}>

                <button className="btn btn-danger" style={{ float: "right" }}>Clear all</button>
                <p style={{ color: "balck" }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur facere atque vel laudantium deserunt officia, reiciendis quod consequatur ab inventore. </p>
              </div>
            )}
            <span className={HeaderStyles.initial}>{initial}</span>

          </div>
          <div className={HeaderStyles.dropdown} >
            <p className={HeaderStyles.logout}>
              Hi {userName}! <FaCaretDown style={{ cursor: "pointer" }} onClick={() => setOpen1(!open1)} />
            </p>
            {open1 && (
              <div className={HeaderStyles.dropdowncontent}>
                <Link className={HeaderStyles.profile} href="/Staff/AddStaff">
                  <h6><CgProfile size={"22px"} /> &nbsp; &nbsp; My Profile  </h6>
                </Link>
                <h6 style={{ whiteSpace: "nowrap" }}>
                  <Link href='/SharedComponent/MyAccountSetting' className={HeaderStyles.accountsetting} >  <AiOutlineSetting size={"22px"} /> &nbsp; &nbsp; Account Setting </Link>
                </h6>
                <h6 onClick={makelogout} style={{ color: "red" }}>
                  <FiLogOut size={"22px"} /> &nbsp; &nbsp; Logout
                </h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    // <div className="row" style={{ background: "#3247d5" }}>
    //   <div className="col-lg-2 m-2">
    //     <Image className="img-fluid " src={Digilogo} alt="Digi Office" width={145} height={53} />
    //   </div>

    //   <div className="col-lg-6 mt-3 text-white ">
    //     <h3 >{formattedTime}</h3>

    //   </div>

    //   <div className="col-lg-1 text-white text-end">
    //     <Image className="img-fluid mt-3" src={Notification} alt="notificatons" width={35} height={35} />
    //   </div>

    //   <div className="col-lg-1 mt-3 text-white">
    //     <h4 onClick={makelogout}>logout </h4>
    //   </div>
    //   <div className="col-lg-1  mt-3 text-white">
    //     <h4><span>Hi {userName} <FaCaretDown /></span> </h4>
    //   </div>

    // </div >
  );
};

export default Header;
