import { useState } from 'react';
import { IoClose, IoMenu, IoChevronBackOutline } from 'react-icons/io5';
import MainMenu from './MainMenu';
import SeniorMyMenu from './SeniorMyMenu';
import CareMyMenu from './CareMyMenu';
import CareSeniors from '../../../../../pages/Personal/my/cares/care-seniors/CareSeniors';

type MenuType = 'main' | 'seniorMy' | 'careMy' | 'careSeniors';

const PersonalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MenuType[]>(['main']);

  const goToMyMenu = (menu: MenuType) => {
    setMenuStack((prev) => [...prev, menu]);
  };

  const goBack = () => {
    setMenuStack((prev) => prev.slice(0, -1));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMenuStack(['main']);
  };

  const currentMenu = menuStack[menuStack.length - 1];

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
            {currentMenu !== 'main' ? (
              <IoChevronBackOutline size={27} onClick={goBack} />
            ) : (
              <IoClose size={27} onClick={closeMenu} />
            )}
          </div>
          {currentMenu === 'main' && <MainMenu handleMenu={goToMyMenu} />}
          {currentMenu === 'careMy' && <CareMyMenu goNext={goToMyMenu} />}
          {currentMenu === 'seniorMy' && <SeniorMyMenu goNext={goToMyMenu} />}
          {/* {currentMenu === 'seniorDetail' && <SeniorDetail />} */}
        </div>
      )}
    </>
  );
};

export default PersonalMenu;
