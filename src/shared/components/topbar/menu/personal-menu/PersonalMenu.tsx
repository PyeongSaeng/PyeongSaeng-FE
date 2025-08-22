import { useState } from 'react';
import { IoClose, IoMenu, IoChevronBackOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import MainMenu from './MainMenu';
import SeniorMyMenu from './SeniorMyMenu';
import CareMyMenu from './CareMyMenu';
import LinkedSeniorDetail from './LinkedSeniorDetail';
import LinkedSeniorList from './LinkedSeniorList';
import { LinkedSenior } from '../../../../../pages/Personal/types/userInfo';

type MenuType =
  | 'main'
  | 'seniorMy'
  | 'careMy'
  | 'linkedSeniors'
  | 'linkedSeniorDetail';

type MenuState = { menu: MenuType; seniorData?: LinkedSenior };

const PersonalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MenuState[]>([{ menu: 'main' }]);

  const location = useLocation();
  const currentPath = location.pathname;

  const goToMyMenu = (menu: MenuType, seniorData?: LinkedSenior) => {
    setMenuStack((prev) => [...prev, { menu, seniorData }]);
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
        <div
          className={clsx(
            currentPath !== '/' ? 'h-[684px]' : 'h-[700px]',
            'absolute top-[-10px] left-[-9px] z-40 w-[330px] bg-white'
          )}
        >
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
            <LinkedSeniorList goNext={goToMyMenu} goBack={goBack} />
          )}
          {currentMenu.menu === 'linkedSeniorDetail' && (
            <LinkedSeniorDetail
              seniorData={menuStack[menuStack.length - 1].seniorData || null}
              goBack={goBack}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PersonalMenu;

// "absolute top-[-25px] left-[-9px] z-40 w-[330px] h-[701px] bg-white"
