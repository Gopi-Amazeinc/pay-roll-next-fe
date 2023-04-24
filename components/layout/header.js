import React, { useEffect, useState } from "react";
import Image from "next/image";
import Digilogo from "../public/DigiLogo.png";
import Notification from "../public/notification.png";
import HeaderStyles from "./header.module.css";
import { FaCaretDown } from 'react-icons/fa';


const Header = ({ makelogout }) => {
  const [userName, setUserName] = useState();


  useEffect(() => {
    const Loginname = sessionStorage.getItem("userName");
    setUserName(Loginname);
  }, []);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' }).toUpperCase();


  const dropdownclick = () => {

  }

  return (
    <div className="header">  
      <div className="row" style={{ background: "#3247d5" }} >
        <div className="col-lg-2 mt-2">
          <Image className="img-fluid " src={Digilogo} alt="Digi Office" width={145} height={53} />
        </div>
        <div className="col-lg-6 mt-3 text-white ">
          <h3 >{formattedTime}</h3>
        </div>
        <div className="col-lg-1 text-white text-end">
          <Image className="img-fluid mt-3" src={Notification} alt="notificatons" width={35} height={35} />
        </div>
        <div className="col-lg-1 mt-3 text-white">
          <h4 onClick={makelogout}>logout </h4>
        </div>
        <div className="col-lg-2  mt-3 text-white">
          <div className="dropdown">
            <h4>Hi {userName}   <FaCaretDown style={{ cursor: "pointer" }} />
              {/* <div class="dropdown-content">
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
                </div>  */}
            </h4>

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
