import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import MainMenu from './MainMenu';

const CompanyMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex flex-col items-center"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu size={30} />
        <span className="text-[12px]">전체 메뉴</span>
      </button>

      {isOpen && (
        <div className="absolute top-[-25px] left-[-9px] z-40 w-[330px] h-[701px] bg-white">
          <div className="pb-[10px] border-b-[1px] border-[#707070]">
            <IoClose size={27} onClick={() => setIsOpen(false)} />
          </div>
          <MainMenu />
        </div>
      )}
    </>
  );
};

export default CompanyMenu;
