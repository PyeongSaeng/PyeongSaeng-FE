import { useState } from 'react';
import { IoClose, IoMenu, IoChevronBackOutline } from 'react-icons/io5';
import MainMenu from './MainMenu';
import SeniorMyMenu from './SeniorMyMenu';
import CareMyMenu from './CareMyMenu';
import LinkedSeniorDetail from './LinkedSeniorDetail';
import LinkedSeniorList from './LinkedSeniorList';

type MenuType =
  | 'main'
  | 'seniorMy'
  | 'careMy'
  | 'linkedSeniors'
  | 'linkedSeniorDetail';

type MenuState = { menu: MenuType; seniorId?: number };

const PersonalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MenuState[]>([{ menu: 'main' }]);

  const goToMyMenu = (menu: MenuType, seniorId?: number) => {
    setMenuStack((prev) => [...prev, { menu, seniorId }]);
  };

  const goBack = () => {
    setMenuStack((prev) => prev.slice(0, -1));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMenuStack([{ menu: 'main' }]);
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
        <div className="absolute top-[-25px] left-[-9px] z-40 w-[330px] h-[704px] bg-white">
          <div className="pb-[10px] border-b-[1px] border-[#707070]">
            {currentMenu.menu !== 'main' ? (
              <IoChevronBackOutline size={27} onClick={goBack} />
            ) : (
              <IoClose size={27} onClick={closeMenu} />
            )}
          </div>
          {currentMenu.menu === 'main' && <MainMenu handleMenu={goToMyMenu} />}
          {currentMenu.menu === 'careMy' && <CareMyMenu goNext={goToMyMenu} />}
          {currentMenu.menu === 'seniorMy' && (
            <SeniorMyMenu goNext={goToMyMenu} />
          )}
          {currentMenu.menu === 'linkedSeniors' && (
            <LinkedSeniorList goNext={goToMyMenu} />
          )}
          {currentMenu.menu === 'linkedSeniorDetail' && (
            <LinkedSeniorDetail
              seniorId={menuStack[menuStack.length - 1].seniorId || 0}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PersonalMenu;
