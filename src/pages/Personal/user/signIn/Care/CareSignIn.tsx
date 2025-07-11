import { useState } from 'react';
import CareStep1 from './CareStep1';
import CareStep2 from './CareStep2';
import CareStep3 from './CareStep3';

const CareSignIn = () => {
  const [step, setStep] = useState(1);
  const [step1State, setStep1State] = useState({
    carrier: '',
    name: '',
    phone: '',
    smsCode: '',
  });
  const [step2State, setStep2State] = useState({
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
  });
  const [step3State, setStep3State] = useState({
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
  });

  return (
    <>
      {step === 1 && (
        <CareStep1
          state={step1State}
          setState={setStep1State}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <CareStep2
          state={step2State}
          setState={setStep2State}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <CareStep3
          state={step3State}
          setState={setStep3State}
          onNext={() => setStep(4)}
        />
      )}
    </>
  );
};

export default CareSignIn;
