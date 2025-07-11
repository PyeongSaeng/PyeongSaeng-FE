import { useState } from 'react';
import clsx from 'clsx';

const ToggleButton = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);

  return (
    <div
      className="flex flex-row align-center"
      onClick={() => setIsToggleOn(!isToggleOn)}
    >
      <div
        className={clsx(
          'flex items-center justify-center transition-all duration-300 relative w-[80.61px] h-[28px] rounded-[16px] outline-[1px] outline-[#D3D3D3] px-0 py-0 bg-[#F5F5F5]'
        )}
      >
        <div className="absolute top-0 left-0 z-10 w-full h-full flex gap-[8.48px] items-center justify-around text-[11.88px] px-[7px]">
          <span className={clsx(isToggleOn ? 'font-semibold' : 'font-normal')}>
            개인
          </span>
          <span
            className={clsx(
              !isToggleOn ? 'font-semibold text-white' : 'font-normal'
            )}
          >
            기업
          </span>
        </div>
        <div
          className={clsx(
            'absolute top-0 left-0 z-0 trasition-transform duration-350 w-[44.12px] h-full rounded-[16px]',
            isToggleOn
              ? 'translate-x-0 bg-[#08D485]'
              : 'translate-x-[36.49px] bg-[#0D29B7]'
          )}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButton;
