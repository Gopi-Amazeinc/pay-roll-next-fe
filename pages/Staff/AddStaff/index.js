import React,{useState} from 'react';
import Layout from "../../../components/layout/layout";
import EmployeeProfile from "../../../components/Dashboard/Staff/AddStaff/employeeprofile"
import PositionDetails from '@/components/Dashboard/Staff/AddStaff/positiondetails';
import ContactDetails from '@/components/Dashboard/Staff/AddStaff/contactdetails';
import DependentDetails from '@/components/Dashboard/Staff/AddStaff/dependentdetails';
import EmploymentHistory from '@/components/Dashboard/Staff/AddStaff/employementhistory';
import NominationDetails from '@/components/Dashboard/Staff/AddStaff/nominationdetails';
import EducationalAttainment from '@/components/Dashboard/Staff/AddStaff/educationalattainment';
import BankDetails from '@/components/Dashboard/Staff/AddStaff/bankdetails';
import IDDetails from '@/components/Dashboard/Staff/AddStaff/iddetails';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { multiStepContext } from '@/pages/Staff/stepcontext';



// const Index = () => {

// // const {currentStep,finalData} = useContext(multiStepContext)

// function showStep(step){
//     switch(step) {
//         case 1: 
//         return <EmployeeProfile/>
//         case 2: 
//         return <PositionDetails/>
//         case 3: 
//         return <ContactDetails/>
//         case 4: 
//         return <DependentDetails/>
//         case 5: 
//         return <EmploymentHistory/>
//         case 6: 
//         return <NominationDetails/>
//         case 7: 
//         return <EducationalAttainment/>
//         case 8: 
//         return <BankDetails/>
//         case 9: 
//         return <IDDetails/>
//     }
// }

//     return (
//         <Layout>
//             <Stepper activeStep={1} orientation='horizontal'>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//                 <Step>
//                     <StepLabel></StepLabel>
//                 </Step>
//             </Stepper>
//             {showStep(1)}


//         </Layout>
//     );
// }

// export default Index;


const Index = () => {
    const [pgNo, setPgNo] = useState(1);
  return (
    <Layout>
    <div className="container">
      <h5>APIs yet to be provided</h5>
      <div>
      <p>Page {pgNo} / 9</p>
        {pgNo == 1 ? <EmployeeProfile /> : pgNo == 2 ? <PositionDetails /> : pgNo==3 ? <ContactDetails/>: 
        pgNo==4 ? <DependentDetails/> :  pgNo==5 ? <EmploymentHistory/> :  pgNo==6 ? <NominationDetails/> :  
        pgNo==7 ? <EducationalAttainment/>:  pgNo==8 ? <BankDetails/>:<IDDetails/>}
        <center>
          {pgNo > 1 && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                let pg = pgNo;
                setPgNo(pg - 1);
              }}
            >
              Back
            </button>
          )}
          {pgNo < 9 && (
            <button
              className="btn btn-primary mx-4"
              type="button"
              onClick={() => {
                let pg = pgNo;
                setPgNo(pg + 1);
              }}
            >
              Next
            </button>
          )}
        </center>
      </div>
    </div>
    </Layout>
  )
}

export default Index
