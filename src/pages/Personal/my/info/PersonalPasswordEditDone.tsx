import { useNavigate } from 'react-router-dom';
import Topbar from '../../../../shared/components/topbar/Topbar';

const PersonalPasswordEditDone = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar>
        <div className="text-[16px] text-[#747474]">
          <div className="relative text-center font-[pretendard JP] font-[600] text-[20px] py-[10px]">
            개인정보
          </div>
          <div className="flex flex-col justify-center items-center gap-[50px] pt-[12px]">
            <div className="flex flex-col justify-center items-center w-[270px] h-[122px] rounded-[8px] border-[1.3px] border-[#08D485]">
              <span>비밀번호가 성공적으로</span>
              <span>수정되었습니다</span>
            </div>
            <button
              type="button"
              className="w-[293px] h-[45px] rounded-[8px] text-black bg-[#08D485]"
              onClick={() => navigate('/')}
            >
              홈으로
            </button>
          </div>
        </div>
      </Topbar>
    </div>
  );
};

export default PersonalPasswordEditDone;
