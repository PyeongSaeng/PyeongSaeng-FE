import { CiMenuBurger } from 'react-icons/ci';

const MenuButton = () => {
  return (
    <div className="flex flex-col items-center">
      <CiMenuBurger size={30} />
      <span className="text-[12px]">전체 메뉴</span>
    </div>
  );
};

export default MenuButton;
