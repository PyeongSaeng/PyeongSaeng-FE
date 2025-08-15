import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import Topbar from '../../../../../shared/components/topbar/Topbar';
import Modal from './Modal';
import { formatPhone } from '../../../../../shared/utils/userInfoUtils';
import { connectSenior, searchSeniorByPhone } from '../../../apis/my/seniorMy';
import noInfo from '../../../../../shared/assets/noInfo.svg';

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
    setButtonState({
      signUpButton: false,
      linkingButton: false,
    });
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
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
                <Modal setModal={handleModal}>
                  <SearchAndLinkSenior
                    setDone={setIsModalOpen}
                    setButton={setButtonState}
                  />
                </Modal>
              </>
            )}
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default LinkingSenior;

interface SearchAndLinkSeniorProps {
  setDone: (state: boolean) => void;
  setButton: (state: ButtonState) => void;
}

const SearchAndLinkSenior = ({
  setDone,
  setButton,
}: SearchAndLinkSeniorProps) => {
  const [phone, setPhone] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<number | null>();
  const [seniorData, setSeniorData] = useState<{
    alreadyConnected: boolean;
    id: number;
    name: string;
    phone: string;
  } | null>();

  useEffect(() => {
    console.log(seniorData);
    // console.log(error);
  }, [seniorData]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await searchSeniorByPhone({ phone: phone });
      setSeniorData(data.result);
    } catch (err: any) {
      console.error('에러', err.response.status);
      setError(err.response.status);
      toast.error('전화번호로 시니어를 찾는 데 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!seniorData) return;
    setIsLoading(true);

    if (seniorData.alreadyConnected) {
      setDone(false);
      setButton({ signUpButton: false, linkingButton: false });
      return;
    }

    try {
      await connectSenior({ seniorId: seniorData.id });
      setDone(false);
      toast.success('시니어 연결에 성공하였습니다.');
    } catch (err) {
      console.error(err);
      toast.error('시니어 연결에 실패하였습니다.');
    } finally {
      setIsLoading(false);
      setButton({
        signUpButton: false,
        linkingButton: false,
      });
    }
  };

  return error === 404 ? (
    <NoInfomation />
  ) : seniorData?.alreadyConnected ? (
    <AlreadyLinked />
  ) : (
    <div className="flex flex-col justify-center items-center gap-[10px]">
      <span className="text-center text-[#747474] text-[16px] font-[Pretendard JP] font-[600]">
        {seniorData
          ? '어르신과 연결하시겠습니까?'
          : '가입한 어르신의 전화번호를 입력하세요'}
      </span>
      <form
        onSubmit={seniorData ? handleConnect : handleSearch}
        className="flex justify-center items-center gap-[10px]"
      >
        <input
          className="w-[184px] h-[45px] rounded-[8px] px-[16px] py-[4px] border-[1px] border-[#E1E1E1] text-[16px] text-center text-[#C2C2C2] font-[Pretendard] font-[500] focus:text-black focus:outline-black"
          value={
            seniorData
              ? seniorData.name
              : isEditing
                ? phone || ''
                : formatPhone(phone || '')
          }
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        ></input>
        <button
          type="submit"
          className="w-[58px] h-[45px] text-white text-[16px] rounded-[8px] bg-[#08D485]"
        >
          {isLoading && seniorData
            ? '연결중..'
            : !isLoading && seniorData
              ? '연결'
              : isLoading && !seniorData
                ? '검색중..'
                : '검색'}
        </button>
      </form>
    </div>
  );
};

const NoInfomation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[16px]">
      <img src={noInfo} alt="정보없음 svg" />
      <span className="text-[16px] text-[#747474] font-[Pretendard JP] font-[600]">
        가입하지 않은 번호입니다
      </span>
    </div>
  );
};

const AlreadyLinked = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[16px]">
      <img src={noInfo} alt="정보없음 svg" />
      <span className="text-[16px] text-[#747474] font-[Pretendard JP] font-[600]">
        이미 연결된 시니어입니다
      </span>
    </div>
  );
};
