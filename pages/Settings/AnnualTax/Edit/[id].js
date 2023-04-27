import React from 'react'
import AnnualTaxForm from '../new';
import axios from 'axios';


function ID({ data }) {
    console.log(data)
    return (
        <div>
            <AnnualTaxForm editData={data}></AnnualTaxForm>
        </div>
    )
}

export default ID

export async function getServerSideProps(context) {
    console.log(context);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    let response = await axios.get(hostURL + "HR/GetTaxconfigarationByID?ID=" + context.params.id);
    const data = response.data[0];
    return { props: { data } }
}