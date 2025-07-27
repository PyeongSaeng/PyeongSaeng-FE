import Topbar from '../../shared/components/topbar/Topbar';
import dummy1 from '../../shared/assets/popular-dummy1.png';

const PersonalHomePage = () => {
  return (
    <div className="text-[16px]">
      <Topbar>
        <div className="flex justify-center">
          <div>
            <div className="w-[298px] h-[180px] mt-[16px] mb-[54px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
              <div className="flex flex-col items-center">
                <div>나에게 맞는 정보를</div>
                <div>확인하세요</div>
              </div>
              <button className="w-[207px] w-[45px] px-[78px] py-[12px] rounded-[8px] bg-[#08D485]">
                로그인
              </button>
            </div>
            <span>요즘 뜨는 일자리</span>
            <div className="h-[348px] overflow-y-scroll scrollbar-hide">
              <div className="w-[298px] h-[196px] mt-[10px] mb-[17px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
                <span>죽전 2동 행정복지센터 미화원</span>
                <img
                  className="rounded-[8px] border-[1px] border-[#A4A4A4]"
                  src={dummy1}
                  alt="더미1"
                />
              </div>
              <div className="w-[298px] h-[196px] mb-[17px] flex flex-col items-center justify-center gap-[27px] rounded-[13px] border-[1px] border-[#D3D3D3]">
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
      </Topbar>
    </div>
  );
};

export default PersonalHomePage;
