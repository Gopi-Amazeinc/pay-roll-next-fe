const Footer = () => {
  const footer = {
    footer: {
      position: "fixed",
      bottom: "0",
      textAlign: "center",
      background: "white",
      zIndex: "999",
    },
  };
  return (
    <div className="container-fluid" style={footer.footer}>
      <div className="row">
        <div className="col-lg-12">
         <b>Copyright &#169; 2023 AMAZE ONE. All Rights Reserved</b> 
        </div>
      </div>
    </div>
  );
};

export default Footer;
