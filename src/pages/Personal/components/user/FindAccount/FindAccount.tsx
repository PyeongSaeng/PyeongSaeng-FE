import { useState } from 'react';
import IdFind from './IdFind';
import PasswordFind from './PasswordFind';
import TopbarForLogin from '../../../../../shared/components/topbar/TopbarForLogin';

type TabType = 'id' | 'password';

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState<TabType>('id');

  return (
    <TopbarForLogin>
      <div className="flex flex-col items-center w-full pt-8 px-[3.3rem]">
        <div className="w-[29.4rem]">
          {/* 헤더 */}
          <div className="text-center mb-[3.1rem]">
            <h1 className="text-[2rem] font-semibold text-[#747474] mb-[1.1rem]">
              아이디/비밀번호 찾기
            </h1>
            <div className="w-full border-t border-[#d9d9d9]" />
          </div>

          {/* 탭 메뉴 */}
          <div className="flex mb-[4.1rem]">
            <button
              className={`flex-1 py-3 text-[1.6rem] text-[#747474] font-medium border-b-2 ${
                activeTab === 'id'
                  ? 'border-[#08D485]'
                  : 'text-[#BDBDBD] border-[#E1E1E1]'
              }`}
              onClick={() => setActiveTab('id')}
            >
              아이디 찾기
            </button>
            <button
              className={`flex-1 py-3 text-[1.6rem] text-[#747474] font-medium border-b-2 ${
                activeTab === 'password'
                  ? 'border-[#08D485]'
                  : 'text-[#BDBDBD] border-[#E1E1E1]'
              }`}
              onClick={() => setActiveTab('password')}
            >
              비밀번호 찾기
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          {activeTab === 'id' ? <IdFind /> : <PasswordFind />}
        </div>
      </div>
    </TopbarForLogin>
  );
};

export default FindAccount;
