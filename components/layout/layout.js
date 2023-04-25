import React, { useEffect, useState } from "react";
import Header from "./header";
import styles from "./layout.module.css";
import Sidebar from "./sidebar";
import Login from "./login";
import Head from "next/head";
import Footer from "./footer";
import { useRouter } from "next/router";

const Index = ({ children }) => {
  const router = useRouter();
  const [isLogin, setILogin] = useState("no");
  const [pageName, setPageName] = useState("Dashboard");
  useEffect(() => {
    console.log("layout rendered");
    let login = sessionStorage.getItem("isLogin");
    if (login && login == "yes") {
      setILogin("yes");
    } else {
      setILogin("no");
    }
    // setusernameName(sessionStorage.getItem("userName"));
    // let pn = sessionStorage.getItem("pageName");
    // if (pn) {
    //     setPageName(pn);
    // }
  }, []);

  const login = () => {
    setILogin("yes");
    sessionStorage.setItem("isLogin", "yes");
    router.push("/Home/dashboard");
  };

  const logout = () => {
    setILogin("no");
    sessionStorage.clear();
    sessionStorage.setItem("isLogin", "no");
    router.push("/");
  };
  // written By:- Gopi ->
  // TODO: to get name of the page we are routed and set the name for child props
  // const changePageName = () =>{
  //     sessionStorage.setItem("pageName", data);
  //     setPageName(data);
  // }

  if (isLogin == "yes") {
    return (
      <div>
        <Head>
          <title>Pay Roll</title>
        </Head>
        <div className="container-fluid">
          <div className="row" style={{ overflowX: "hidden" }}>
            <div className="col-lg-12" style={{ height: "10vh" }}>
              <Header makelogout={logout}></Header>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-2"
              style={{ height: "90vh", overflowY: "auto" }}
            >
              <Sidebar></Sidebar>
            </div>
            <div
              className="col-lg-10"
              style={{
                height: "90vh",
                overflowY: "auto",
                overflowX: "auto",
                background: '#e5f3f5"',
              }}
            >
              <main>
                {children}
                <br></br>
              </main>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  } else
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <Login makelogin={login}></Login>
          </div>
        </div>
      </div>
    );
};

export default Index;
