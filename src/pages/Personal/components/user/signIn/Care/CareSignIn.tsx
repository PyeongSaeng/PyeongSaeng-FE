import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CareStep1 from './CareStep1';
import CareStep2 from './CareStep2';
import CareStep3 from './CareStep3';
import CareStep4 from './CareStep4';
import CareStep5 from './CareStep5';
import TopbarForLogin from '../../../../../../shared/components/topbar/TopbarForLogin';
import { useProtectorSignup, useSeniorSignup } from '../../../../hooks/useAuth';
import {
  ProtectorSignupRequest,
  SeniorSignupRequest,
  Gender,
  Job,
  ExperiencePeriod,
} from '../../../../types/auth';

const CareSignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [protectorId, setProtectorId] = useState<number | null>(null);

  const protectorSignupMutation = useProtectorSignup();
  const seniorSignupMutation = useSeniorSignup();

  // Step1: 보호자 본인 인증
  const [step1State, setStep1State] = useState({
    carrier: '',
    name: '',
    phone: '',
    smsCode: '',
  });

  // Step2: 보호자 계정 정보
  const [step2State, setStep2State] = useState({
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
    phone: '',
  });

  // Step3: 시니어 기본 정보
  const [step3State, setStep3State] = useState({
    name: '',
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
  });

  // Step4: 시니어 상세 정보
  const [step4State, setStep4State] = useState({
    type: '',
    age: '',
    gender: '',
    phone: '',
    zipcode: '',
    roadAddress: '',
    detailAddress: '',
    job: '',
    period: '',
  });

  // Step5: 시니어 인증
  const [step5State, setStep5State] = useState({
    carrier: '',
    phone: '',
    smsCode: '',
  });

  // Step2 완료 시 보호자 회원가입 진행 (84-102번째 줄 수정)
  const handleProtectorSignup = () => {
    const protectorData: ProtectorSignupRequest = {
      username: step2State.idCheck,
      password: step2State.password,
      name: step1State.name,
      phone: step2State.phone,
      providerType: null,
      providerUserId: null,
    };

    protectorSignupMutation.mutate(protectorData, {
      onSuccess: (data) => {
        console.log('보호자 회원가입 성공:', data);

        // 서버에서 protectorId 받아서 저장
        const receivedProtectorId = data.result?.userId;

        if (receivedProtectorId) {
          setProtectorId(receivedProtectorId);
          console.log('protectorId 저장됨:', receivedProtectorId);
          setStep(3);
        } else {
          console.error('protectorId를 찾을 수 없음:', data);
        }
      },
      onError: (error) => {
        console.error('보호자 회원가입 실패:', error);
      },
    });
  };

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

  // Step5 완료 시 시니어 회원가입
  const handleSeniorSignup = () => {
    if (!protectorId) {
      alert('보호자 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    const seniorData: SeniorSignupRequest = {
      username: step3State.id,
      password: step3State.password,
      name: step3State.name,
      age: parseInt(step4State.age),
      gender: step4State.gender as Gender,
      phoneNum: step5State.phone,
      zipcode: step4State.zipcode,
      roadAddress: step4State.roadAddress,
      detailAddress: step4State.detailAddress || undefined,
      job: mapJobToEnum(step4State.job),
      experiencePeriod: mapPeriodToEnum(step4State.period),

      // 보호자 연결 정보
      protectorId: protectorId,

      // 소셜 로그인 관련
      providerType: null,
      providerUserId: null,
    };

    seniorSignupMutation.mutate(seniorData, {
      onSuccess: (data) => {
        console.log('시니어 회원가입 성공:', data);
        alert('보호자 및 어르신 회원가입이 모두 완료되었습니다.');
        navigate('/personal/login');
      },
      onError: (error) => {
        console.error('시니어 회원가입 실패:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <TopbarForLogin>
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
          onNext={handleProtectorSignup}
        />
      )}
      {step === 3 && (
        <CareStep3
          state={step3State}
          setState={setStep3State}
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <CareStep4
          state={step4State}
          setState={setStep4State}
          onNext={() => setStep(5)}
        />
      )}
      {step === 5 && (
        <CareStep5
          state={step5State}
          setState={setStep5State}
          onSubmit={handleSeniorSignup}
        />
      )}
    </TopbarForLogin>
  );
};

export default CareSignIn;
