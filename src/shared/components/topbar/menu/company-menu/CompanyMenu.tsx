import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import MainMenu from './MainMenu';
import CompanyMyMenu from './CompanyMyMenu';

type MenuType = 'my' | 'main';

const CompanyMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<'my' | 'main'>('main');

  const goToMyMenu = () => {
    setMenu('my');
  };

  const goBack = () => {
    setMenu('main');
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMenu('main');
  };

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
            <IoClose size={27} onClick={closeMenu} />
          </div>
          {menu === 'main' && <MainMenu goNext={goToMyMenu} />}
          {menu === 'my' && <CompanyMyMenu />}
        </div>
      )}
    </>
  );
};

export default CompanyMenu;
