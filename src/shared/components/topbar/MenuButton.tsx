import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="flex flex-col items-center" onClick={() => {}}>
        <CiMenuBurger size={30} />
        <span className="text-[12px]">전체 메뉴</span>
      </button>

      {isOpen && (
        <div className="z-40 flex flex-col items-start px-6 pt-20 gap-5 text-lg">
          <a href="/jobs">일자리 추천</a>
          <a href="/my/jobs/saved">일자리 저장함</a>
          <a href="/my/jobs/applied">일자리 신청함</a>
          <a href="/questions">질문답변</a>
          <a href="/my/info">내 정보</a>
          <a href="/logout">로그아웃</a>
          <a href="/withdraw">회원탈퇴</a>
        </div>
      )}
    </>
  );
};

export default MenuButton;
