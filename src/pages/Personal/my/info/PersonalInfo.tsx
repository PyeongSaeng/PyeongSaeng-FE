import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Topbar from '../../../../shared/components/topbar/Topbar';
import BasicInfo from './BasicInfo';
import ExtraInfo from './ExtraInfo';

const PersonalInfo = () => {
  const [isClicked, setIsClicked] = useState<'basic' | 'extra'>('basic');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // post
  };

  return (
    <div>
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
          개인정보
        </div>
        <div className="flex justify-center items-center gap-[10px] font-[Pretendard JP] font-[500] text-black text-[16px]">
          <button
            type="button"
            className={clsx(
              isClicked === 'basic' ? 'bg-[#ECF6F2]' : '',
              'w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]'
            )}
            onClick={() => setIsClicked('basic')}
          >
            기본 정보
          </button>
          <button
            type="button"
            className={clsx(
              isClicked === 'basic' ? '' : 'bg-[#ECF6F2]',
              'w-[144px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]'
            )}
            onClick={() => setIsClicked('extra')}
          >
            추가 정보
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          {isClicked === 'basic' ? <BasicInfo /> : <ExtraInfo />}
        </form>
        <button
          type={isClicked === 'basic' ? 'button' : 'submit'}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[309px] h-[45px] rounded-[8px] bg-[#08D485] text-white text-[16px]"
          onClick={() => {
            if (isClicked === 'basic') {
              navigate('/personal/info/edit');
            }
          }}
        >
          수정
        </button>
      </Topbar>
    </div>
  );
};

export default PersonalInfo;
