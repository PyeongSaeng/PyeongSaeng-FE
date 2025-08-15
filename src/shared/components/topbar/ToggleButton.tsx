import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

const ToggleButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [toggleVersion, setToggleVersion] = useState<'' | 'company'>(
    location.pathname.startsWith('/company') ? 'company' : ''
  );

  useEffect(() => {
    const currentIsCompany = location.pathname.startsWith('/company');
    const wasCompany = toggleVersion === 'company';

    // 전환이 일어났을 때만 localStorage 정리
    if (currentIsCompany !== wasCompany) {
      console.log(
        '사용자 타입 전환 감지:',
        wasCompany ? '기업 -> 개인' : '개인 ->기업'
      );

      // 인증 관련 데이터만 선택적으로 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
    }

    if (currentIsCompany) {
      setToggleVersion('company');
    } else {
      setToggleVersion('');
    }
  }, [location.pathname, toggleVersion]);

  const goToPersonalVersion = () => {
    if (toggleVersion !== '') {
      // 기업 -> 개인 전환 시에만 토큰 정리
      localStorage.removeItem('accessToken');

      setToggleVersion('');
      navigate('/');
    }
  };
  const goToCompanyVersion = () => {
    if (toggleVersion !== 'company') {
      // 개인 -> 전환 시에만 토큰 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');

      setToggleVersion('company');
      navigate('/company');
    }
  };

  return (
    <div className="flex flex-row items-center">
      <div className="flex items-center justify-center relative w-[80.61px] h-[28px] rounded-[16px] outline outline-[1px] outline-[#D3D3D3] bg-[#F5F5F5]">
        <div
          className={clsx(
            'absolute top-0 left-0 z-0 transition-transform duration-300 w-[44.12px] h-full rounded-[16px]',
            toggleVersion === ''
              ? 'translate-x-0 bg-[#08D485]'
              : 'translate-x-[36.49px] bg-[#0D29B7]'
          )}
        ></div>
        <div className="absolute top-0 left-0 z-10 w-full h-full flex gap-[8.48px] items-center justify-around text-[11.88px] px-[7px]">
          <button
            onClick={goToPersonalVersion}
            className={clsx(
              'transition-colors duration-200',
              toggleVersion === '' ? 'font-semibold' : 'font-normal text-black'
            )}
          >
            개인
          </button>
          <button
            onClick={goToCompanyVersion}
            className={clsx(
              'transition-colors duration-200',
              toggleVersion === 'company'
                ? 'font-semibold text-white'
                : 'font-normal text-black'
            )}
          >
            기업
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
