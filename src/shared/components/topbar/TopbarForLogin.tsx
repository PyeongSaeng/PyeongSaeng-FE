import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import ToggleButton from './ToggleButton';
import QuestionButton from './QuestionButton';
import PersonalMenu from './menu/personal-menu/PersonalMenu';
import CompanyMenu from './menu/company-menu/CompanyMenu';

interface TopbarForLoginProps {
  children?: ReactNode;
  showToggle?: boolean; // 토글바 표시 여부
}

const TopbarForLogin = ({
  children,
  showToggle = true,
}: TopbarForLoginProps) => {
  const location = useLocation();

  const version: 'personal' | 'company' = location.pathname.startsWith(
    '/company'
  )
    ? 'company'
    : 'personal';

  return (
    <>
      <div>
        <Logo />
        <div className="flex justify-center">
          <div className="w-[318px] flex justify-between items-center bt-[2px] p-[4px]">
            <div className="relative">
              {version === 'personal' ? (
                <div className="flex justify-around items-start gap-[21px] opacity-0 pointer-events-none">
                  <PersonalMenu />
                  <QuestionButton />
                </div>
              ) : (
                <div className="flex justify-around items-start gap-[21px] opacity-0 pointer-events-none">
                  <CompanyMenu />
                </div>
              )}
            </div>
            {/* 토글바 조건부 렌더링 */}
            {showToggle && (
              <div>
                <ToggleButton />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 밑에 컨텐츠 넣기 */}
      <div className="px-[21px]">{children}</div>
    </>
  );
};

export default TopbarForLogin;
