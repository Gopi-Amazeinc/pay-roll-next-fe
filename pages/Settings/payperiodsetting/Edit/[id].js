import React from 'react'
import PayPeriodSettingform from '../new';
import axios from 'axios';

function id({data}) {
  return (
    <div>
      <PayPeriodSettingform editData={data}></PayPeriodSettingform>
    </div>
  )
}

export default id

export async function getServerSideProps(context) {
  console.log(context);
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let response = await axios.get(hostURL + "Payroll/GetPayPeriodSettingByID?ID=" + context.params.id);
  const data = response.data[0];
  return { props: { data } }
}