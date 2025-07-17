import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import MainMenu from './personal-menu/MainMenu';
import SeniorMyMenu from './personal-menu/SeniorMyMenu';
import GuardianMyMenu from './personal-menu/GuardianMyMenu';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<'main' | 'my'>('main');

  // const goToMainMenu = () => setCurrentMenu('main');
  const goToMyMenu = () => setCurrentMenu('my');

  const closeMenu = () => {
    setIsOpen(false);
    setCurrentMenu('main');
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
          {currentMenu === 'main' ? (
            <MainMenu handleMenu={goToMyMenu} />
          ) : (
            // <SeniorMyMenu />
            <GuardianMyMenu />
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
