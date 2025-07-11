import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex flex-col items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu size={30} />
        <span className="text-[12px]">전체 메뉴</span>
      </button>

      {isOpen && (
        <div className="absolute top-[-25px] left-[-5px] z-40 w-[330px] h-[701px] bg-white">
          <div className="pb-[10px] border-b-[1px] border-[#707070]">
            <IoClose size={27} onClick={() => setIsOpen(false)} />
          </div>
          <div className="px-[8px]">
            <div className="text-[24px] underline decoration-2 pt-[33px] pb-[25px]">
              {'로그인 하세요 >'}
            </div>
            <div className="flex flex-col items-start gap-5 text-lg">
              <a href="/jobs">일자리 추천</a>
              <a href="/my/jobs/saved">일자리 저장함</a>
              <a href="/my/jobs/applied">일자리 신청함</a>
              <a href="/questions">질문답변</a>
              <a href="/my/info">내 정보</a>
              <a href="/logout">로그아웃</a>
              <a href="/withdraw">회원탈퇴</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuButton;
