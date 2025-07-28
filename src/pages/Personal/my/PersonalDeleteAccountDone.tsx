import { useNavigate } from 'react-router-dom';
import Topbar from '../../../shared/components/topbar/Topbar';

const PersonalDeleteAccountDone = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar>
        <div className="text-center font-[pretendard JP] font-[600] text-[20px] text-[#747474] py-[10px]">
          회원 탈퇴
        </div>
        <div className="flex flex-col justify-center items-center gap-[50px] font-[pretendard JP] font-[600] text-[16px] text-[#747474]">
          <div className="flex justify-center items-center w-[270px] h-[122px] rounded-[8px] border-[1.3px] border-[#08D485]">
            탈퇴되었습니다
          </div>
          <button
            type="button"
            className="w-[293px] h-[45px] bg-[#08D485] rounded-[8px] text-black font-[500]"
            onClick={() => {
              navigate('/personal');
            }}
          >
            홈으로
          </button>
        </div>
      </Topbar>
    </div>
  );
};

export default PersonalDeleteAccountDone;
