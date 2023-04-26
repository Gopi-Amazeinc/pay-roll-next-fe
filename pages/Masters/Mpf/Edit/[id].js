import React from 'react'
import MpfForm from '../new';
import axios from 'axios';


function ID({ data }) {
  return (
    <div>
      <MpfForm editData={data}></MpfForm>
    </div>
  )
}

export default ID
export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "HR/GetMPFconfogarationByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}