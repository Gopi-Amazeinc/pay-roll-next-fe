import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

export default function SampleHook() {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'first',
    sheet: 'Users',
  });

  
//   const { onDownload1 } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: 'abc',
//     sheet: 'Users',
//   });

//   const { onDownload } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: 'first',
//     sheet: 'Users',
//   });
  
  const handleClick = (event) => {
    debugger
    // const newTable = document.getElementById("newTable");
    const newTable = event.target.id;
    // const tableIds  =['oldTable', 'newTable'];
    // for (const tableId of tableIds) {
    //   onDownload(tableId);
    // }
    tableRef.current = newTable;
    onDownload();
  };

  return (
    <>
      <div>
        <button onClick={(e)=>handleClick(e)}> Export excel </button>

        <table id="oldTable">
          <tbody>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Edison</td>
              <td>Padilla</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Alberto</td>
              <td>Lopez</td>
              <td>94</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* code added */}
        <button onClick={handleClick}> Export excel </button>

        <table id="newTable">
          <tbody>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>abc</td>
              <td>abc</td>
              <td>20</td>
            </tr>
            <tr>
              <td>xyz</td>
              <td>zyx</td>
              <td>94</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
