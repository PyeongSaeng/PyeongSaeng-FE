import { useState } from 'react';
import clsx from 'clsx';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import Modal from './Modal';

type ButtonState = {
  signUpButton: boolean;
  linkingButton: boolean;
};

const LinkingSenior = () => {
  const [buttonState, setButtonState] = useState<ButtonState>({
    signUpButton: false,
    linkingButton: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = (state: boolean) => {
    setIsModalOpen(state);
  };

  const handleButtonState = (button: string) => {
    if (button === 'signUpButton') {
      setButtonState({
        signUpButton: true,
        linkingButton: false,
      });
    } else {
      setButtonState({
        signUpButton: false,
        linkingButton: true,
      });
      handleModal(true);
    }
  };

  return (
    <div className="relative">
      <Topbar>
        <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px] border-[#D9D9D9] border-b-[0.8px]">
          추가하기
        </div>
        <div className="flex flex-col items-center py-[40px]">
          <div className="flex flex-col justify-center items-center gap-[28px]">
            <div className="flex flex-col justify-center items-center gap-[4px]">
              <button
                type="button"
                className={clsx(
                  'w-[270px] h-[122px] rounded-[8px] border-[1.3px] border-[#08D485] text-[16px] font-[500]',
                  buttonState.signUpButton ? 'bg-[#DAF4EA]' : ''
                )}
                onClick={() => handleButtonState('signUpButton')}
              >
                보호자 케어 회원가입
              </button>
              <span className="text-[14px] text-[#01AA42] self-end">
                어르신 회원가입만 진행합니다
              </span>
            </div>
            <button
              type="button"
              className={clsx(
                'w-[270px] h-[122px] rounded-[8px] border-[1.3px] border-[#08D485] text-[16px] font-[500]',
                buttonState.linkingButton ? 'bg-[#DAF4EA]' : ''
              )}
              onClick={() => handleButtonState('linkingButton')}
            >
              가입한 어르신 연결
            </button>
            {isModalOpen && (
              <>
                {/* 배경을 어두운 오버레이로 처리 */}
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
                {/* 모달 창 */}
                <Modal setModal={handleModal}>{'테스트'}</Modal>
              </>
            )}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default LinkingSenior;
