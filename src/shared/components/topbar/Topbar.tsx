import { CiMenuBurger } from 'react-icons/ci';
import Logo from './Logo';
import ToggleButton from './ToggleButton';
import QuestionButton from './QuestionButton';

const Topbar = () => {
  return (
    <>
      <Logo />
      <div className="flex justify-center">
        <div className="w-[318px] flex justify-between items-centers bt-[2px] border-b-[1.3px] border-[#707070] p-[3px]">
          <div className="flex justify-around items-start gap-[21px]">
            <div className="flex flex-col items-center">
              <CiMenuBurger size={30} />
              <span className="text-[12px]">메뉴</span>
            </div>
            <QuestionButton />
          </div>
          <div>
            <ToggleButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
