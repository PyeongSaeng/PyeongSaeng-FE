import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { IoClose, IoMenu, IoChevronBackOutline } from 'react-icons/io5';
import CompanyMyMenu from './CompanyMyMenu';
import AfterLoginMainMenu from './AfterLoginMainMenu';
import BeforeLoginMainMenu from './BeforeLoginMainMenu';

type MenuType = 'my' | 'main';

const CompanyMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<MenuType>('main');

  const location = useLocation();
  const currentPath = location.pathname;

  const accessToken = localStorage.getItem('accessToken');

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
        <div
          className={clsx(
            currentPath !== '/company' ? 'h-[684px]' : 'h-[731px]',
            'absolute top-[-10px] left-[-9px] z-40 w-[330px] bg-white'
          )}
        >
          <div className="pb-[10px] border-b-[1px] border-[#707070]">
            {menu === 'main' ? (
              <IoClose size={27} onClick={closeMenu} />
            ) : (
              <IoChevronBackOutline size={27} onClick={goBack} />
            )}
          </div>
          {accessToken ? (
            menu === 'main' ? (
              <AfterLoginMainMenu goNext={goToMyMenu} />
            ) : (
              <CompanyMyMenu />
            )
          ) : (
            <BeforeLoginMainMenu />
          )}
        </div>
      )}
    </>
  );
};

export default CompanyMenu;
