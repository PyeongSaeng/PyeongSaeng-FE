import { useNavigate } from 'react-router-dom';
import Topbar from '../../shared/components/topbar/Topbar';
import SaveSubmitButtons from '../../shared/components/SaveSubmitButtons';

const JobApplyPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('저장!');
  };

  const handleSubmit = () => {
    console.log('제출!');
    navigate('/jobs/recommend/complete');
  };

  return (
    <div className="pt-[30px]">
      <Topbar />
      <div className="flex justify-center ">
        {' '}
        <div className="w-full h-full flex flex-col items-center justify-start bg-white px-4 py-10">
          {/* 타이틀 */}
          <h2 className="text-[20px] font-semibold text-[#747474] mb-2">
            신청서 작성
          </h2>

          {/* 서브텍스트 */}
          <p className="w-full max-w-[320px] text-left text-[14px] text-[#747474] mb-6 leading-relaxed">
            신청서에 추가할 항목이 없습니다
            <br />
            제출하시겠습니까?
          </p>

          {/* 선택한 일자리 */}
          <div className="w-full max-w-[320px] mb-6">
            <button className="w-full h-12 border border-[#08D485] text-[#414141] rounded-md text-[16px] font-medium">
              죽전2동 행정복지센터
            </button>
          </div>

          {/* 기본 정보 박스 */}
          <div className="w-full max-w-[320px] border border-[#08D485] rounded-[8px] p-4 mb-10">
            <h3 className="text-[16px] font-semibold text-[#414141] mb-4">
              기본 정보
            </h3>
            <p className="text-[14px] text-[#414141] mb-1">성함: 김순자</p>
            <p className="text-[14px] text-[#414141] mb-1">성별: 여성</p>
            <p className="text-[14px] text-[#414141] mb-1">나이: 63세</p>
            <p className="text-[14px] text-[#414141] mb-1">
              전화번호: 010-1234-5678
            </p>
            <p className="text-[14px] text-[#414141] mb-1">
              주민등록번호: 610908-******
            </p>
            <p className="text-[14px] text-[#414141]">
              거주지: 대지로 49 203동
            </p>
          </div>

          {/* 버튼 그룹 */}
          <SaveSubmitButtons onSave={handleSave} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default JobApplyPage;
