import { IoAddOutline, IoChevronForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CareSeniors = ({ goNext }: { goNext: (menu: any) => void }) => {
  const navigate = useNavigate();

  return (
    <div className="px-[8px] font-[Pretendard]">
      <div className="flex justify-center text-[24px] text-black pt-[24px] pb-[10px] border-b-[1.3px] border-[#CCCCCC]">
        내 정보
      </div>
      <div className="flex flex-col items-start gap-[23px] text-[16px] font-[400] border-b-[1.3px] border-[#CCCCCC] py-[30px]">
        <button onClick={() => goNext('careSeniors')}>
          <div className="flex justify-center items-center gap-[10px] text-[16px]">
            김영희 님<IoChevronForward />
          </div>
        </button>
        <button onClick={() => goNext('careSeniors')}>
          <div className="flex justify-center items-center gap-[10px] text-[16px]">
            이말덕 님<IoChevronForward />
          </div>
        </button>
        <button onClick={() => goNext('careSeniors')}>
          <div className="flex justify-center items-center gap-[10px] text-[16px]">
            <IoAddOutline size={22} />
            <button className="pt-[4px]" onClick={() => navigate('')}>
              추가하기
            </button>
          </div>
        </button>
      </div>
      <div className="py-[16px] text-[16px]">
        최대 3명까지 추가할 수 있습니다
      </div>
    </div>
  );
};

export default CareSeniors;
