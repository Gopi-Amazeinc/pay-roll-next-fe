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
          Copyright © 2022 AMAZE ONE. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
