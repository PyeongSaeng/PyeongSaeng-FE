import React, { useState } from 'react';
import CareStep1 from './CareStep1';
import CareStep2 from './CareStep2';

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
      {/* step === 3이면 다음 단계 컴포넌트 추가 가능 */}
    </>
  );
};

export default CareSignIn;
