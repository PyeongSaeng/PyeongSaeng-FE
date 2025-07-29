import { useState } from 'react';
import SeniorStep1 from './SeniorStep1';
import SeniorStep2 from './SeniorStep2';
import SeniorStep3 from './SeniorStep3';
import TopbarForLogin from '../../../../../../shared/components/topbar/TopbarForLogin';

const SeniorSignIn = () => {
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
    type: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    detailAddress: '',
    job: '',
    period: '',
  });

  const handlesubmit = () => {
    alert('회원가입 완료');
  };

  return (
    <TopbarForLogin>
      {step === 1 && (
        <SeniorStep1
          state={step1State}
          setState={setStep1State}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <SeniorStep2
          state={step2State}
          setState={setStep2State}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <SeniorStep3
          state={step3State}
          setState={setStep3State}
          onSubmit={handlesubmit}
        />
      )}
    </TopbarForLogin>
  );
};

export default SeniorSignIn;
