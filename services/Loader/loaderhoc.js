import React, { useState } from "react";
import LoaderSpinner from "./index";

function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(false);

    async function loadData() {
      setIsLoading(true);
      try {
        const res = await axios.get(hostURL + "Master/GetCountryType");
        props.setCountryData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <>
        {isLoading ? <LoaderSpinner /> : null}
        <WrappedComponent {...props} loadData={loadData} isLoading={isLoading} setIsLoading={setIsLoading} />
      </>
    );
  };
}
 export default  withLoading;