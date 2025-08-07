import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [protectorId, setProtectorId] = useState<number | null>(null);

  // 카카오 정보 - 보호자용
  const [kakaoInfo, setKakaoInfo] = useState<any>(null);
  const isFromKakao = kakaoInfo?.fromKakao || false;

  const protectorSignupMutation = useProtectorSignup();
  const seniorSignupMutation = useSeniorSignup();

  // 카카오 정보 수신 처리 (보호자용)
  useEffect(() => {
    if (location.state?.fromKakao) {
      setKakaoInfo(location.state);
      console.log('보호자 카카오 정보 수신:', location.state);
    }
  }, [location.state]);

  // Step1: 보호자 본인 인증 (카카오 정보 초기값 설정)
  const [step1State, setStep1State] = useState({
    carrier: '',
    name: '',
    phone: '',
    smsCode: '',
  });

  // Step2: 보호자 계정 정보 (카카오 정보 초기값 설정)
  const [step2State, setStep2State] = useState({
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
    phone: '',
  });

  // Step3: 시니어 기본 정보 (일반 가입)
  const [step3State, setStep3State] = useState({
    name: '',
    id: '',
    idCheck: '',
    isIdAvailable: false,
    password: '',
    passwordConfirm: '',
  });

  // Step4: 시니어 상세 정보 (일반 가입)
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

  // Step5: 시니어 인증 (일반 가입)
  const [step5State, setStep5State] = useState({
    carrier: '',
    phone: '',
    smsCode: '',
  });

  // 카카오 정보가 있으면 보호자 정보 업데이트
  useEffect(() => {
    if (isFromKakao && kakaoInfo) {
      // Step1 - 보호자 이름 설정
      setStep1State((prev) => ({
        ...prev,
        name: kakaoInfo.nickname || '',
      }));

      // Step2 - 보호자 카카오 아이디 설정
      setStep2State((prev) => ({
        ...prev,
        id: kakaoInfo.kakaoId || '',
        idCheck: kakaoInfo.kakaoId || '',
        isIdAvailable: true,
        password: '',
        passwordConfirm: '',
      }));

      console.log('카카오 정보로 보호자 정보 설정:', {
        name: kakaoInfo.nickname,
        id: kakaoInfo.kakaoId,
      });
    }
  }, [isFromKakao, kakaoInfo]);

  // 카카오 사용자는 Step2의 전화번호 입력만 진행
  useEffect(() => {
    if (isFromKakao) {
      setStep(2);
    }
  }, [isFromKakao]);

  // Step2 완료 시 보호자 회원가입 진행
  const handleProtectorSignup = () => {
    const protectorData: ProtectorSignupRequest = {
      username: isFromKakao ? kakaoInfo.kakaoId : step2State.idCheck,
      password: isFromKakao ? null : step2State.password,
      name: isFromKakao ? kakaoInfo.nickname : step1State.name,
      phone: step2State.phone,
      providerType: isFromKakao ? 'KAKAO' : null,
      providerUserId: isFromKakao ? parseInt(kakaoInfo.kakaoId) || null : null,
    };

    console.log('보호자 가입 데이터:', protectorData);

    protectorSignupMutation.mutate(protectorData, {
      onSuccess: (data) => {
        const receivedProtectorId = data.result?.userId;

        if (receivedProtectorId) {
          setProtectorId(receivedProtectorId);
          console.log('protectorId 저장됨:', receivedProtectorId);
          setStep(3);
        } else {
          console.error('protectorId를 찾을 수 없음:', data);
          alert('보호자 정보 저장에 실패했습니다.');
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || '보호자 회원가입에 실패했습니다.';
        alert(errorMessage);
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

  // 성별 매핑 함수
  const mapGenderToEnum = (gender: string): Gender => {
    const genderMap: Record<string, Gender> = {
      남성: 'MALE',
      여성: 'FEMALE',
    };
    return genderMap[gender] || 'MALE';
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

  // 디버깅용 useEffect
  useEffect(() => {
    if (step === 5) {
      console.log('Step1:', step1State);
      console.log('Step2:', step2State);
      console.log('Step3:', step3State);
      console.log('Step4:', step4State);
      console.log('ProtectorId:', protectorId);
      console.log('카카오 정보:', kakaoInfo);
    }
  }, [
    step,
    step1State,
    step2State,
    step3State,
    step4State,
    protectorId,
    kakaoInfo,
  ]);

  // Step5 완료 시 시니어 회원가입 (일반 가입만)
  const handleSeniorSignup = () => {
    if (!protectorId) {
      alert('보호자 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    // 나이 검증 추가
    const parsedAge = parseInt(step4State.age);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      alert('올바른 나이를 입력해주세요.');
      return;
    }

    const seniorData: SeniorSignupRequest = {
      username: step3State.id,
      password: step3State.password,
      name: step3State.name,
      age: parsedAge,
      gender: mapGenderToEnum(step4State.gender),
      phoneNum: step4State.phone,
      zipcode: step4State.zipcode,
      roadAddress: step4State.roadAddress,
      detailAddress: step4State.detailAddress || '',
      job: mapJobToEnum(step4State.job),
      experiencePeriod: mapPeriodToEnum(step4State.period),

      // 보호자 연결 정보
      protectorId: protectorId,

      // 시니어는 일반 가입
      providerType: null,
      providerUserId: null,
    };

    console.log('시니어 가입 데이터:', seniorData);

    seniorSignupMutation.mutate(seniorData, {
      onSuccess: () => {
        if (isFromKakao) {
          alert('카카오 보호자 및 어르신 회원가입이 모두 완료되었습니다! 🎉');
        } else {
          alert('보호자 및 어르신 회원가입이 모두 완료되었습니다.');
        }
        navigate('/personal/login');
      },
      onError: (error: any) => {
        console.error('시니어 회원가입 실패:', error);
        const errorMessage =
          error.response?.data?.message || '시니어 회원가입에 실패했습니다.';
        alert(errorMessage);
      },
    });
  };

  return (
    <TopbarForLogin>
      {step === 1 && !isFromKakao && (
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
          isFromKakao={isFromKakao}
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
