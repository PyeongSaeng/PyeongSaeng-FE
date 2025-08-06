import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeniorStep1 from './SeniorStep1';
import SeniorStep2 from './SeniorStep2';
import SeniorStep3 from './SeniorStep3';
import TopbarForLogin from '../../../../../../shared/components/topbar/TopbarForLogin';
import { useSeniorSignup } from '../../../../hooks/useAuth';
import {
  SeniorSignupRequest,
  Gender,
  Job,
  ExperiencePeriod,
} from '../../../../types/auth';

const SeniorSignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const signupMutation = useSeniorSignup();

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
    zipcode: '',
    roadAddress: '',
  });

  // 직업 매핑 함수
  const mapJobToEnum = (job: string): Job => {
    const jobMap: Record<string, Job> = {
      주부: 'HOUSEWIFE',
      회사원: 'EMPLOYEE',
      공무원: 'PUBLIC_OFFICER',
      전문직: 'PROFESSIONAL',
      예술가: 'ARTIST',
      사업가: 'BUSINESS_OWNER',
      기타: 'ETC',
    };
    return jobMap[job] || 'ETC';
  };

  // 경력 기간 매핑 함수
  const mapPeriodToEnum = (period: string): ExperiencePeriod => {
    const periodMap: Record<string, ExperiencePeriod> = {
      '6개월 미만': 'LESS_THAN_6_MONTHS',
      '6개월 ~ 1년': 'SIX_MONTHS_TO_1_YEAR',
      '1년 ~ 3년': 'ONE_TO_THREE_YEARS',
      '3년 ~ 5년': 'THREE_TO_FIVE_YEARS',
      '5년 ~ 10년': 'FIVE_TO_TEN_YEARS',
      '10년 이상': 'OVER_TEN_YEARS',
    };
    return periodMap[period] || 'LESS_THAN_6_MONTHS';
  };

  const handleSubmit = () => {
    const signupData: SeniorSignupRequest = {
      username: step2State.id,
      password: step2State.password,
      name: step1State.name,
      age: parseInt(step3State.age),
      gender: step3State.gender as Gender,
      phoneNum: step3State.phone,
      zipcode: step3State.zipcode,
      roadAddress: step3State.roadAddress,
      detailAddress: step3State.detailAddress || undefined,
      job: mapJobToEnum(step3State.job),
      experiencePeriod: mapPeriodToEnum(step3State.period),

      // 보호자 연결 없음
      protectorId: null,

      // 일반 회원가입
      providerType: null,
      providerUserId: null,
    };

    console.log('전송할 회원가입 데이터:', signupData);

    signupMutation.mutate(signupData, {
      onSuccess: (data: unknown) => {
        console.log('회원가입 성공:', data);
        alert('회원가입이 완료되었습니다!');
        navigate('/personal/login');
      },
      onError: (error: unknown) => {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      },
    });
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
          onSubmit={handleSubmit}
          isLoading={signupMutation.isPending}
        />
      )}
    </TopbarForLogin>
  );
};

export default SeniorSignIn;
