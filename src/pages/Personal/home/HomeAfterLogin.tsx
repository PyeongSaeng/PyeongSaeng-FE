import { useNavigate } from 'react-router-dom';
import dummy1 from '../../../shared/assets/popular-dummy1.png';
import HomeTopButton from '../../../shared/components/buttons/HomeTopButton';

const HomeAfterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center font-[pretendard] text-[16px]">
      <div className="flex flex-col justify-center items-center">
        <div className="py-[16px]">
          <div className="flex gap-[4px]">
            <HomeTopButton bgColor="green" textColor="black">
              <span className="leading-tight">
                <span>일자리 추천(어르신용)</span>
              </span>
            </HomeTopButton>
            <HomeTopButton bgColor="green" textColor="black">
              <span className="leading-tight">
                <span>일자리 저장(어르신용)</span>
              </span>
            </HomeTopButton>
            <HomeTopButton bgColor="green" textColor="black">
              일자리 신청
            </HomeTopButton>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[298px] h-[130px] rounded-[13px] border-[1.3px] border-[#D3D3D3] mb-[20px]">
          <div className="flex flex-col justify-center items-center leading-tight py-[8px]">
            <span>추가 정보를 입력하면</span>
            <span>AI가 맞춤형 신청서를 작성해줍니다</span>
          </div>
          <button
            className="w-[270px] h-[45px] rounded-[8px] border-[1.3px] border-[#08D485]"
            onClick={() => navigate('/personal/senior-my/info/extra')}
          >
            내 정보 입력하러 가기
          </button>
        </div>
        <div>
          <span className="font-[pretendard JP] font-[600] text-[20px] text-[#747474]">
            요즘 뜨는 일자리
          </span>
          <div className="h-[348px] overflow-y-scroll scrollbar-hide">
            <div className="w-[298px] h-[196px] mt-[2px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]">
              <span>죽전 2동 행정복지센터 미화원</span>
              <img
                className="rounded-[8px] border-[1px] border-[#A4A4A4]"
                src={dummy1}
                alt="더미1"
              />
            </div>
            <div className="w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[12px] rounded-[13px] border-[1px] border-[#D3D3D3]">
              <span>죽전 2동 행정복지센터 미화원</span>
              <img
                className="rounded-[8px] border-[1px] border-[#A4A4A4]"
                src={dummy1}
                alt="더미1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAfterLogin;
