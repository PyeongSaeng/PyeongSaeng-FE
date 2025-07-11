import Logo from './Logo';
import ToggleButton from './ToggleButton';
import QuestionButton from './QuestionButton';
import MenuButton from './MenuButton';

const Topbar = () => {
  return (
    <>
      <Logo />
      <div className="flex justify-center">
        <div className="w-[318px] flex justify-between items-centers bt-[2px] border-b-[1.3px] border-[#707070] p-[4px]">
          <div className="flex justify-around items-start gap-[21px]">
            <MenuButton />
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
