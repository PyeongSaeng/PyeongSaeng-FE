import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [step, setStep] = useState(1);
  const signupMutation = useSeniorSignup();

  // 카카오에서 온 정보 추출
  const kakaoInfo = location.state;
  const isFromKakao = kakaoInfo?.fromKakao || false;

  const [step1State, setStep1State] = useState({
    carrier: '',
    name: isFromKakao ? kakaoInfo?.nickname || '' : '',
    phone: '',
    smsCode: '',
  });

  const [step2State, setStep2State] = useState({
    id: isFromKakao ? kakaoInfo?.kakaoId || '' : '',
    idCheck: isFromKakao ? kakaoInfo?.kakaoId || '' : '',
    isIdAvailable: isFromKakao,
    password: isFromKakao ? '' : '',
    passwordConfirm: isFromKakao ? '' : '',
  });

  const [step3State, setStep3State] = useState({
    type: '',
    age: '',
    gender: '',
    phone: '',
    detailAddress: '',
    job: '',
    period: '',
    zipcode: '',
    roadAddress: '',
  });

  // Gender 매핑 함수
  const mapGenderToEnum = (gender: string): Gender => {
    const genderMap: Record<string, Gender> = {
      MALE: 'MALE',
      FEMALE: 'FEMALE',
    };
    return genderMap[gender] || 'MALE';
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

  // 카카오 사용자인 경우 Step 3부터 시작
  useEffect(() => {
    if (isFromKakao) {
      console.log('🎯 카카오 사용자 - Step 3부터 시작');
      setStep(3);
    }
  }, [isFromKakao]);

  const handleSubmit = () => {
    console.log('🚀 시니어 회원가입 제출 시작');
    console.log('📋 카카오 사용자 여부:', isFromKakao);

    const seniorData: SeniorSignupRequest = {
      username: isFromKakao ? kakaoInfo.kakaoId : step2State.id,
      password: isFromKakao ? '' : step2State.password,
      name: step1State.name,
      age: parseInt(step3State.age),
      gender: mapGenderToEnum(step3State.gender),
      phoneNum: step3State.phone,
      zipcode: step3State.zipcode,
      roadAddress: step3State.roadAddress,
      detailAddress: step3State.detailAddress,
      job: mapJobToEnum(step3State.job),
      experiencePeriod: mapPeriodToEnum(step3State.period),
      protectorId: null,

      providerType: isFromKakao ? 'KAKAO' : null,
      // kakaoId를 number로 변환 또는 null 처리
      providerUserId: isFromKakao ? parseInt(kakaoInfo.kakaoId) || null : null,
    };

    console.log('📤 전송할 데이터:', seniorData);

    signupMutation.mutate(seniorData, {
      onSuccess: () => {
        console.log('✅ 시니어 회원가입 성공');
        alert(
          isFromKakao
            ? '카카오 회원가입이 완료되었습니다! 🎉'
            : '회원가입이 완료되었습니다!'
        );
        navigate('/', { replace: true });
      },
      onError: (error: any) => {
        console.error('시니어 회원가입 실패:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div>
      <TopbarForLogin />
      {isFromKakao && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded mx-4">
          <p className="text-blue-800 text-sm">
            🎉 카카오 계정으로 가입 중입니다! 추가 정보만 입력해주세요.
          </p>
        </div>
      )}

      {step === 1 && !isFromKakao && (
        <SeniorStep1
          state={step1State}
          setState={setStep1State}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && !isFromKakao && (
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
          isFromKakao={isFromKakao}
        />
      )}
    </div>
  );
};

export default SeniorSignIn;
