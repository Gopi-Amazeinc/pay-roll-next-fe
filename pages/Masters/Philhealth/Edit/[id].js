import React from 'react'
import PhilhealthForm from '../new';
import axios from 'axios';

function ID({ data }) {
  return (
    <div>
      <PhilhealthForm editData={data}></PhilhealthForm>
    </div>
  )
}

export default ID
export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "HR/GetPhihealthconfogarationByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}