import React, { useState } from 'react';
import Index from './AddStaff/index'

export const multiStepContext = React.createContext();
const stepcontext = () => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);
  return (
    <div>
      <multiStepContext.Provider value={{currentStep,setStep, userData, setUserData, finalData, setFinalData}}>
        <Index/>
      </multiStepContext.Provider>
    </div>
  )
}

export default stepcontext
