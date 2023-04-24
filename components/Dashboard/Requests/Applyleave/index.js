
const ApplyleaveDashboard = () => {

    return (
        
        <div className='card p-3 border-0 shadow-lg  mt-1'>
            <h3>Leave Balance  </h3>
            <table className='my-table  table-striped mt-3 text-center'>
                <thead style={{ padding: "10px" }}>
                    <th>Leave Type</th>
                    <th>Annual Quota</th>
                    <th>Availed Till Date	</th>
                    <th>Current Balance </th>
                </thead>
                <tbody>
                    <tr style={{ padding: "10px" }} >
                        <td>Current SL</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td>SL Accrual Balance	</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
    );
}
export default ApplyleaveDashboard;