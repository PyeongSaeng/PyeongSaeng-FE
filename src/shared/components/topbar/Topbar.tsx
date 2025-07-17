import { ReactNode } from 'react';
import Logo from './Logo';
import ToggleButton from './ToggleButton';
import QuestionButton from './QuestionButton';
import Menu from './menu/Menu';

interface TopbarProps {
  children?: ReactNode;
}

const Topbar = ({ children }: TopbarProps) => {
  return (
    <>
      <div>
        <Logo />
        <div className="flex justify-center">
          <div className="w-[318px] flex justify-between items-center bt-[2px] border-b-[1.3px] border-[#707070] p-[4px]">
            <div className="relative flex justify-around items-start gap-[21px]">
              <Menu />
              <QuestionButton />
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
        </div>
      </div>
      {/* 밑에 컨텐츠 넣기 */}
      <div className="px-[21px]">{children}</div>
    </>
  );
};

export default Topbar;
