import { useState } from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

const ToggleButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialVersion: 'personal' | 'company' = location.pathname.startsWith(
    '/company'
  )
    ? 'company'
    : 'personal';

  const [toggleVersion, setToggleVersion] = useState<'personal' | 'company'>(
    initialVersion
  );

  const goToPersonalVersion = () => {
    setToggleVersion('personal');
    setTimeout(() => navigate('/personal'), 400);
  };
  const goToCompanyVersion = () => {
    setToggleVersion('company');
    setTimeout(() => navigate('/company'), 400);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="flex items-center justify-center relative w-[80.61px] h-[28px] rounded-[16px] outline outline-[1px] outline-[#D3D3D3] bg-[#F5F5F5]">
        <div
          className={clsx(
            'absolute top-0 left-0 z-0 transition-transform duration-300 w-[44.12px] h-full rounded-[16px]',
            toggleVersion === 'personal'
              ? 'translate-x-0 bg-[#08D485]'
              : 'translate-x-[36.49px] bg-[#0D29B7]'
          )}
        ></div>
        <div className="absolute top-0 left-0 z-10 w-full h-full flex gap-[8.48px] items-center justify-around text-[11.88px] px-[7px]">
          <button
            onClick={goToPersonalVersion}
            className={clsx(
              'transition-colors duration-200',
              toggleVersion === 'personal'
                ? 'font-semibold'
                : 'font-normal text-black'
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
