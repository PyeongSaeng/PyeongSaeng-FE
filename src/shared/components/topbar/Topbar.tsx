import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import ToggleButton from './ToggleButton';
import QuestionButton from './QuestionButton';
import PersonalMenu from './menu/personal-menu/PersonalMenu';
import CompanyMenu from './menu/company-menu/CompanyMenu';

interface TopbarProps {
  children?: ReactNode;
}

const Topbar = ({ children }: TopbarProps) => {
  const location = useLocation();

  const version: '' | 'company' = location.pathname.startsWith('/company')
    ? 'company'
    : '';

  return (
    <>
      <div>
        <Logo />
        <div className="flex justify-center">
          <div className="w-[318px] flex justify-between items-center bt-[2px] border-b-[1.3px] border-[#707070] p-[4px]">
            <div className="relative flex justify-around items-start gap-[21px]">
              {/* {version === 'personal' ? <PersonalMenu /> : <CompanyMenu />}
              {version === 'personal' ? <QuestionButton /> : ''} */}
              {version === 'company' ? (
                <>
                  <CompanyMenu />
                </>
              ) : (
                <>
                  <PersonalMenu />
                  <QuestionButton />
                </>
              )}
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
